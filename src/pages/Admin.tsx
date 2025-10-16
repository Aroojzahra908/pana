import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient"; // simple REST helpers: supabase.fetchTable / supabase.insertInto
import { toast } from "@/hooks/use-toast";

const Admin: React.FC = () => {

  const [contacts, setContacts] = useState<any[] | null>(null); // contact_messages table
  const [contactsError, setContactsError] = useState<string | null>(null);

  const [applications, setApplications] = useState<any[] | null>(null); // job_applications table
  const [applicationsError, setApplicationsError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const missingConfig = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAll() {
    setLoading(true);

    if (!import.meta.env.VITE_SUPABASE_URL) {
      const msg = "Missing SUPABASE_URL";
      setContacts(null);
      setApplications(null);
      setContactsError(msg);
      setApplicationsError(msg);
      setLoading(false);
      return;
    }

    try {
      // contact_messages
      try {
        const contactsData = await supabase.fetchTable("contact_messages");
        const sorted = Array.isArray(contactsData)
          ? contactsData.sort((a: any, b: any) => (a.created_at < b.created_at ? 1 : -1))
          : contactsData;
        setContacts(sorted || []);
        setContactsError(null);
      } catch (err: any) {
        console.warn("contact_messages fetch error:", err);
        setContacts(null);
        setContactsError(err?.message || String(err));
      }

      // job_applications
      try {
        const appsData = await supabase.fetchTable("job_applications");
        const sorted = Array.isArray(appsData)
          ? appsData.sort((a: any, b: any) => (a.created_at < b.created_at ? 1 : -1))
          : appsData;
        setApplications(sorted || []);
        setApplicationsError(null);
      } catch (err: any) {
        console.warn("job_applications fetch error:", err);
        setApplications(null);
        setApplicationsError(err?.message || String(err));
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to fetch data from Supabase." });
    } finally {
      setLoading(false);
    }
  }

  const ConfigBanner = () =>
    missingConfig ? (
      <div className="max-w-6xl mx-auto p-6">
        <div className="rounded-md bg-yellow-50 p-4 mb-6 border border-yellow-200">
          <h3 className="font-semibold">Supabase config not set</h3>
          <p className="text-sm">Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or connect via the MCP popover) to enable the Admin dashboard.</p>
        </div>
      </div>
    ) : null;

  return (
    <div>
      <ConfigBanner />
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <button
            onClick={fetchAll}
            className="text-sm px-3 py-2 border rounded-md hover:bg-slate-50"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Contact Messages */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Contact messages</h3>
            {contactsError ? (
              <div className="text-sm text-red-600">{contactsError}</div>
            ) : contacts === null ? (
              <div className="text-sm text-muted-foreground">No contact_messages table or permission denied.</div>
            ) : contacts.length === 0 ? (
              <div className="text-sm text-muted-foreground">No contact messages yet.</div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-auto text-sm">
                {contacts.map((c) => (
                  <div key={c.id} className="border-b pb-2">
                    <div className="font-medium">{c.first_name} {c.last_name} • {c.email}</div>
                    <div className="text-xs text-slate-500">{c.company} • {c.service} • {c.created_at}</div>
                    <div className="text-xs text-slate-600 mt-1 line-clamp-2">{c.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Job Applications */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Job applications</h3>
            {applicationsError ? (
              <div className="text-sm text-red-600">{applicationsError}</div>
            ) : applications === null ? (
              <div className="text-sm text-muted-foreground">No job_applications table or permission denied.</div>
            ) : applications.length === 0 ? (
              <div className="text-sm text-muted-foreground">No applications yet.</div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-auto text-sm">
                {applications.map((a) => (
                  <div key={a.id} className="border-b pb-2">
                    <div className="font-medium">{a.first_name} {a.last_name} • {a.email}</div>
                    <div className="text-xs text-slate-500">{a.position || "—"} • Job ID: {a.job_id ?? "—"} • {a.created_at}</div>
                    {a.resume_file_name ? (
                      <div className="text-xs text-slate-600">Resume: {a.resume_file_name}</div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
