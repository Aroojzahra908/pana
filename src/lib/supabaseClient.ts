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

  // Try sending the Blob directly first (let the browser set Content-Type)
  try {
    const resDirect = await fetch(url, { method: "POST", headers, body: file });
    if (resDirect.ok) return await resDirect.json().catch(() => resDirect.text());
    // if not ok and status is 403, surface a clearer error about storage policies
    if (resDirect.status === 403) {
      const text = await resDirect.text().catch(() => "");
      throw new Error(`Upload denied (403). Check Supabase storage bucket policies and RLS: ${text}`);
    }
    // Otherwise read the text and throw below to keep the same flow
    const textErr = await resDirect.text().catch(() => "");
    throw new Error(`Failed to upload to storage: ${resDirect.status} ${textErr}`);
  } catch (err: any) {
    // If the browser threw a body stream error, try to clone the blob and retry using ArrayBuffer
    if (err && typeof err.message === "string" && err.message.includes("body stream already read")) {
      try {
        const blobCopy = (file as Blob).slice(0, (file as Blob).size, (file as Blob).type);
        const arrayBuffer = await blobCopy.arrayBuffer();
        const res = await fetch(url, { method: "POST", headers, body: new Uint8Array(arrayBuffer) });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          if (res.status === 403) throw new Error(`Upload denied (403). Check Supabase storage bucket policies and RLS: ${text}`);
          throw new Error(`Failed to upload to storage: ${res.status} ${text}`);
        }
        return await res.json().catch(() => res.text());
      } catch (inner) {
        // rethrow the inner error for caller
        throw inner;
      }
    }
    // Not a body-stream error: rethrow
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

export default { fetchTable, insertInto, uploadToStorage, getPublicUrl };
