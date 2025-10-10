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
  return res.json();
}

export default { fetchTable, insertInto };
