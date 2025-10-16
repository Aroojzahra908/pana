const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

function getHeaders() {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "Content-Type": "application/json",
  };
}

export async function fetchTable(table: string) {
  if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
  const url = `${SUPABASE_URL}/rest/v1/${table}?select=*`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch ${table}: ${res.status} ${text}`);
  }
  return res.json();
}

export async function insertInto(table: string, payload: any) {
  if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
  const url = `${SUPABASE_URL}/rest/v1/${table}`;
  const res = await fetch(url, { method: "POST", headers: getHeaders(), body: JSON.stringify(payload) });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to insert into ${table}: ${res.status} ${text}`);
  }
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export async function uploadToStorage(
  bucket: string,
  objectPath: string,
  file: Blob,
  options: { contentType?: string; upsert?: boolean } = {}
) {
  if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
  if (!SUPABASE_ANON_KEY) throw new Error("Missing SUPABASE_ANON_KEY");
  if (!bucket) throw new Error("Missing storage bucket name");
  if (!objectPath) throw new Error("Missing storage object path");

  const { contentType = (file as File).type || "application/octet-stream", upsert = false } = options;
  const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${objectPath}`;
  const headers: Record<string, string> = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    "x-upsert": upsert ? "true" : "false",
  };
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  // Encode path segments to avoid URL issues
  const encodedBucket = encodeURIComponent(bucket);
  const encodedObjectPath = objectPath.split("/").map(encodeURIComponent).join("/");
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${encodedBucket}/${encodedObjectPath}`;

  // Prepare headers - allow browser to set Content-Type for Blobs if not explicitly provided
  const uploadHeaders: Record<string, string> = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`, "x-upsert": upsert ? "true" : "false" };
  if (contentType) uploadHeaders["Content-Type"] = contentType;

  // Use a clone of the blob to avoid any stream reuse issues
  const blobToSend = (file as Blob).slice(0, (file as Blob).size, (file as Blob).type);

  // Try POST first. If server responds 400, try PUT as a fallback. Provide detailed error messages.
  try {
    let res = await fetch(uploadUrl, { method: "POST", headers: uploadHeaders, body: blobToSend });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      // Try PUT fallback for servers expecting PUT
      try {
        console.warn(`uploadToStorage: POST failed ${res.status} - retrying with PUT. Message: ${text}`);
        res = await fetch(uploadUrl, { method: "PUT", headers: uploadHeaders, body: blobToSend });
        if (!res.ok) {
          const putText = await res.text().catch(() => "");
          if (res.status === 403) throw new Error(`Upload denied (403). Check Supabase storage bucket policies and RLS: ${putText}`);
          throw new Error(`Failed to upload to storage: ${res.status} ${putText}`);
        }
        return await res.json().catch(() => res.text());
      } catch (putErr) {
        // surface original POST error if PUT also failed
        if (res.status === 403) throw new Error(`Upload denied (403). Check Supabase storage bucket policies and RLS: ${text}`);
        throw new Error(`Failed to upload to storage: ${res.status} ${text}`);
      }
    }
    return await res.json().catch(() => res.text());
  } catch (err: any) {
    // If we hit a body-stream issue, retry using ArrayBuffer
    if (err && typeof err.message === "string" && err.message.includes("body stream already read")) {
      try {
        const arrayBuffer = await blobToSend.arrayBuffer();
        const res = await fetch(uploadUrl, { method: "POST", headers: uploadHeaders, body: new Uint8Array(arrayBuffer) });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          if (res.status === 403) throw new Error(`Upload denied (403). Check Supabase storage bucket policies and RLS: ${text}`);
          throw new Error(`Failed to upload to storage: ${res.status} ${text}`);
        }
        return await res.json().catch(() => res.text());
      } catch (inner) {
        throw inner;
      }
    }

    throw err;
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to upload to storage: ${res.status} ${text}`);
  }

  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export function getPublicUrl(bucket: string, objectPath: string) {
  if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${objectPath}`;
}

export async function deleteFrom(table: string, id: string | number) {
  if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
  const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(String(id))}`;
  const res = await fetch(url, { method: "DELETE", headers: getHeaders() });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to delete from ${table}: ${res.status} ${text}`);
  }
  return true;
}

export async function updateRow(table: string, id: string | number, payload: any) {
  if (!SUPABASE_URL) throw new Error("Missing SUPABASE_URL");
  const url = `${SUPABASE_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(String(id))}`;
  // include Prefer to return the updated representation which helps callers
  const headers = { ...getHeaders(), Prefer: "return=representation" };
  // PATCH requires application/json
  const res = await fetch(url, { method: "PATCH", headers, body: JSON.stringify(payload) });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Failed to update ${table}: ${res.status} ${text}`);
  }
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

export default { fetchTable, insertInto, uploadToStorage, getPublicUrl, deleteFrom, updateRow };
