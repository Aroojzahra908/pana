import React, { useEffect, useMemo, useState } from "react";
import { Briefcase, Inbox, RefreshCw, Sparkles, Users } from "lucide-react";
import supabase from "@/lib/supabaseClient"; // simple REST helpers: supabase.fetchTable / supabase.insertInto
import { toast } from "@/hooks/use-toast";
import colors from "@/components/colors";

type TabKey = "contacts" | "applications" | "selected";

const formatDateTime = (value?: string | null) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
};

const formatFullName = (first?: string | null, last?: string | null) => {
  const parts = [first, last].filter((part): part is string => Boolean(part && part.trim()));
  return parts.length ? parts.join(" ") : "—";
};

const primaryTint = (opacity: number) => `rgba(${colors.primaryRgb}, ${opacity})`;
const secondaryTint = (opacity: number) => `rgba(${colors.secondaryRgb}, ${opacity})`;

const Admin: React.FC = () => {
  const [contacts, setContacts] = useState<any[] | null>(null); // contact_messages table
  const [contactsError, setContactsError] = useState<string | null>(null);

  const [applications, setApplications] = useState<any[] | null>(null); // job_applications table
  const [applicationsError, setApplicationsError] = useState<string | null>(null);

  const [selectedStudents, setSelectedStudents] = useState<any[] | null>(null); // selected_students table
  const [selectedStudentsError, setSelectedStudentsError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("contacts");
  const [lastSynced, setLastSynced] = useState<string | null>(null);

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
      setSelectedStudents(null);
      setContactsError(msg);
      setApplicationsError(msg);
      setSelectedStudentsError(msg);
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

      // selected_students
      try {
        const selectedData = await supabase.fetchTable("selected_students");
        const sorted = Array.isArray(selectedData)
          ? selectedData.sort((a: any, b: any) => (a.selected_at < b.selected_at ? 1 : -1))
          : selectedData;
        setSelectedStudents(sorted || []);
        setSelectedStudentsError(null);
      } catch (err: any) {
        console.warn("selected_students fetch error:", err);
        setSelectedStudents(null);
        setSelectedStudentsError(err?.message || String(err));
      }

      setLastSynced(new Date().toISOString());
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to fetch data from Supabase." });
    } finally {
      setLoading(false);
    }
  }

  const uniqueCompanies = useMemo(() => {
    const pendingContacts = (contacts || []).filter((c: any) => c.status !== "selected");
    if (!pendingContacts?.length) return 0;
    const companies = new Set<string>();
    pendingContacts.forEach((entry) => {
      if (entry?.company) {
        companies.add(String(entry.company));
      }
    });
    return companies.size;
  }, [contacts]);

  const uniqueRoles = useMemo(() => {
    const pendingApplications = (applications || []).filter((a: any) => a.status !== "selected");
    if (!pendingApplications?.length) return 0;
    const roles = new Set<string>();
    pendingApplications.forEach((entry) => {
      if (entry?.position) {
        roles.add(String(entry.position));
      }
    });
    return roles.size;
  }, [applications]);

  const tabs = [
    {
      id: "contacts" as const,
      label: "Contact Messages",
      description: "Leads captured through the website form.",
      icon: Inbox,
      badge: ((contacts || []).filter((c: any) => c.status !== "selected").length ?? 0),
    },
    {
      id: "applications" as const,
      label: "Job Applications",
      description: "Candidates who applied for open roles.",
      icon: Briefcase,
      badge: ((applications || []).filter((a: any) => a.status !== "selected").length ?? 0),
    },
    {
      id: "selected" as const,
      label: "Selected Students",
      description: "Approved candidates (selected).",
      icon: Sparkles,
      badge: selectedStudents?.length ?? 0,
    },
  ];

  const summaryCards = [
    {
      label: "Pending Leads",
      value: (contacts || []).filter((c: any) => c.status !== "selected").length ?? 0,
      helper: uniqueCompanies > 0 ? `${uniqueCompanies} unique companies` : "Awaiting first lead",
      icon: Inbox,
      tint: primaryTint(0.16),
    },
    {
      label: "Pending Applicants",
      value: (applications || []).filter((a: any) => a.status !== "selected").length ?? 0,
      helper: uniqueRoles > 0 ? `${uniqueRoles} roles represented` : "No roles yet",
      icon: Users,
      tint: secondaryTint(0.18),
    },
    {
      label: "Dashboard status",
      value: loading ? "Refreshing…" : "Live",
      helper: lastSynced ? `Last sync ${formatDateTime(lastSynced)}` : "Sync to populate data",
      icon: Sparkles,
      tint: primaryTint(0.22),
    },
  ];

  const ConfigBanner = () =>
    missingConfig ? (
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          className="mb-6 rounded-2xl border p-6 text-sm"
          style={{
            background: colors.primaryHex,
            borderColor: colors.primaryHex,
            color: colors.white,
          }}
        >
          <h3 className="text-lg font-semibold" style={{ color: colors.white }}>
            Supabase configuration required
          </h3>
          <p className="mt-2 leading-relaxed" style={{ color: colors.white }}>
            Connect your project to Supabase by setting VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY or use the MCP popover to link
            Supabase before the admin data can be displayed.
          </p>
        </div>
      </div>
    ) : null;

  const renderEmptyState = (title: string, description: string, tone: "muted" | "error" = "muted") => {
    const background = tone === "error" ? "rgba(220, 38, 38, 0.2)" : primaryTint(0.08);
    const border = tone === "error" ? "rgba(220, 38, 38, 0.45)" : primaryTint(0.35);
    return (
      <div
        className="rounded-3xl border px-8 py-14 text-center text-sm leading-relaxed"
        style={{ background, borderColor: border, color: colors.white }}
      >
        <p className="text-lg font-semibold" style={{ color: colors.white }}>
          {title}
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm" style={{ color: colors.white }}>
          {description}
        </p>
      </div>
    );
  };

  const tableShellStyle = {
    background: colors.white,
    borderColor: primaryTint(0.12),
  } as const;

  const renderContactsTable = () => {
    if (contactsError) {
      return renderEmptyState("Unable to load contact messages", contactsError, "error");
    }
    if (contacts === null) {
      return renderEmptyState(
        "Connect Supabase to view leads",
        "We could not reach the contact_messages table. Confirm database permissions and try syncing again."
      );
    }

    // Show all contacts (both pending and approved)
    const allContacts = (contacts || []);

    if (!allContacts.length) {
      return renderEmptyState(
        "No contact messages",
        "No contact submissions yet."
      );
    }

    return (
      <div className="overflow-hidden rounded-3xl border shadow-2xl backdrop-blur" style={tableShellStyle}>
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-5"
          style={{ borderColor: secondaryTint(0.35) }}
        >
          <div>
            <h2 className="text-xl font-semibold" style={{ color: colors.secondaryHex }}>
              Contact messages
            </h2>
            <p className="text-sm" style={{ color: secondaryTint(0.65) }}>
              Review student and client enquiries with all supporting details.
            </p>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: colors.primaryHex, color: colors.white }}
          >
            {allContacts.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y text-left text-sm" style={{ color: colors.secondaryHex }}>
            <thead style={{ background: primaryTint(0.12), color: colors.primaryHex }}>
              <tr>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Student</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Contact</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Company &amp; Service</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Message</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Received</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allContacts.map((contact) => (
                <tr key={contact.id} style={{ borderBottom: `1px solid ${secondaryTint(0.35)}`, transition: 'background-color 0.18s ease' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `rgba(${colors.primaryRgb},0.08)`)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <td className="px-6 py-4">
                    <p className="font-semibold" style={{ color: colors.secondaryHex }}>
                      {formatFullName(contact.first_name, contact.last_name)}
                    </p>
                    <p className="text-xs" style={{ color: secondaryTint(0.6) }}>
                      {contact.role || contact.company || "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {contact.email ? (
                      <a
                        href={`mailto:${contact.email}`}
                        style={{ color: colors.primaryHex }}
                        className="text-sm hover:underline"
                      >
                        {contact.email}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: secondaryTint(0.8) }}>
                        —
                      </p>
                    )}
                    {contact.phone ? (
                      <p className="mt-1 text-xs" style={{ color: secondaryTint(0.8) }}>
                        {contact.phone}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm" style={{ color: colors.secondaryHex }}>
                      {contact.company || "—"}
                    </p>
                    <span
                      className="mt-1 inline-flex rounded-full px-3 py-1 text-xs font-medium"
                      style={{ background: colors.primaryHex, color: colors.white }}
                    >
                      {contact.service || "Not specified"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="max-w-md text-sm" style={{ color: colors.secondaryHex }}>
                      {contact.message || "No additional message supplied."}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: secondaryTint(0.6) }}>
                    {formatDateTime(contact.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    {contact.status === "selected" ? (
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold" style={{ minWidth: 84, background: '#10b981', color: '#fff' }}>Approved</span>
                    ) : (
                      <button className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold" style={{ minWidth: 84, background: colors.primaryHex, color: colors.white }} onClick={async () => await handleApprove('contact_messages', contact.id)}>Pending</button>
                    )}
                    <button className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold ml-2" style={{ minWidth: 84, background: '#ef4444', color: '#fff' }} onClick={async () => await handleDelete('contact_messages', contact.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderApplicationsTable = () => {
    if (applicationsError) {
      return renderEmptyState("Unable to load job applications", applicationsError, "error");
    }
    if (applications === null) {
      return renderEmptyState(
        "Connect Supabase to view applications",
        "We could not reach the job_applications table. Confirm database permissions and try syncing again."
      );
    }

    // Show all applications (both pending and approved)
    const allApplications = (applications || []);

    if (!allApplications.length) {
      return renderEmptyState(
        "No job applications",
        "No applications submitted yet."
      );
    }

    return (
      <div className="overflow-hidden rounded-3xl border shadow-2xl backdrop-blur" style={tableShellStyle}>
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-b px-6 py-5"
          style={{ borderColor: secondaryTint(0.35) }}
        >
          <div>
            <h2 className="text-xl font-semibold" style={{ color: colors.secondaryHex }}>
              Job applications
            </h2>
            <p className="text-sm" style={{ color: secondaryTint(0.65) }}>
              Track every applicant and their supporting documents at a glance.
            </p>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: colors.primaryHex, color: colors.white }}
          >
            {allApplications.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y text-left text-sm" style={{ color: colors.secondaryHex }}>
            <thead style={{ background: primaryTint(0.12), color: colors.primaryHex }}>
              <tr>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Student</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Contact</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Role info</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Resume &amp; links</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Applied</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide" style={{ color: colors.primaryHex }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allApplications.map((application) => (
                <tr key={application.id} style={{ borderBottom: `1px solid ${secondaryTint(0.35)}`, transition: 'background-color 0.18s ease' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `rgba(${colors.primaryRgb},0.08)`)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                  <td className="px-6 py-4">
                    <p className="font-semibold" style={{ color: colors.secondaryHex }}>
                      {formatFullName(application.first_name, application.last_name)}
                    </p>
                    <p className="text-xs" style={{ color: secondaryTint(0.6) }}>
                      {application.linkedin || "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {application.email ? (
                      <a
                        href={`mailto:${application.email}`}
                        style={{ color: colors.primaryHex }}
                        className="text-sm hover:underline"
                      >
                        {application.email}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: secondaryTint(0.8) }}>
                        —
                      </p>
                    )}
                    {application.phone ? (
                      <p className="mt-1 text-xs" style={{ color: secondaryTint(0.8) }}>
                        {application.phone}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm" style={{ color: colors.secondaryHex }}>
                      {application.position || "General application"}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: secondaryTint(0.6) }}>
                      Job ID: {application.job_id ?? "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4 space-y-2">
                    {application.resume_file_url ? (
                      <a
                        href={application.resume_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold hover:underline"
                        style={{ color: colors.primaryHex }}
                      >
                        View resume
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: secondaryTint(0.8) }}>
                        {application.resume_file_name || "No resume attached"}
                      </p>
                    )}
                    {application.cover_letter ? (
                      <p className="text-xs" style={{ color: secondaryTint(0.8) }}>
                        {application.cover_letter}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-6 py-4 text-sm" style={{ color: secondaryTint(0.8) }}>
                    {formatDateTime(application.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    {application.status === "selected" ? (
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold" style={{ minWidth: 84, background: '#10b981', color: '#fff' }}>Approved</span>
                    ) : (
                      <button className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold" style={{ minWidth: 84, background: colors.primaryHex, color: colors.white }} onClick={async () => await handleApprove('job_applications', application.id)}>Pending</button>
                    )}
                    <button className="inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-semibold ml-2" style={{ minWidth: 84, background: '#ef4444', color: '#fff' }} onClick={async () => await handleDelete('job_applications', application.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  async function handleDelete(table: string, id: string | number) {
    if (!confirm("Are you sure you want to permanently delete this record?")) return;
    try {
      await supabase.deleteFrom(table, id);

      // Also delete from selected_students table if it exists there
      try {
        await supabase.deleteByQuery("selected_students", `source_table=eq.${encodeURIComponent(table)}&source_id=eq.${encodeURIComponent(String(id))}`);
      } catch (err) {
        console.warn("Could not delete from selected_students:", err);
      }

      toast({ title: "Deleted", description: "Record deleted." });
      if (table === "contact_messages") setContacts((prev) => (prev || []).filter((c) => c.id !== id));
      if (table === "job_applications") setApplications((prev) => (prev || []).filter((a) => a.id !== id));
    } catch (err: any) {
      console.error("Delete failed", err);
      toast({ title: "Error", description: err?.message || "Failed to delete" });
    }
  }

  async function handleApprove(table: string, id: string | number) {
    try {
      // locate the current record from local state first (stable reference)
      let record: any = null;
      if (table === "job_applications") {
        record = (applications || []).find((a: any) => a.id === id) || null;
      }
      if (table === "contact_messages") {
        record = (contacts || []).find((c: any) => c.id === id) || null;
      }

      if (!record) {
        toast({ title: "Error", description: "Record not found in local state" });
        return;
      }

      // perform the DB update
      await supabase.updateRow(table, id, { status: "selected" });

      // Create the selected_students payload
      const payload = {
        source_table: table,
        source_id: record.id,
        first_name: record.first_name || null,
        last_name: record.last_name || null,
        email: record.email || null,
        phone: record.phone || null,
        position: record.position || null,
        company: record.company || null,
        resume_file_url: record.resume_file_url || null,
        notes: record.cover_letter || record.message || null,
        selected_at: new Date().toISOString(),
      };

      // persist selection to selected_students
      let savedRecord: any = payload;
      try {
        const result = await supabase.upsertInto("selected_students", payload);
        // If the result is an array, take the first item; if it's a single object, use it
        savedRecord = Array.isArray(result) ? result[0] : result || payload;
      } catch (insErr: any) {
        console.error("Failed to upsert selected_students", insErr);
        toast({ title: "Warning", description: "Approved but failed to save selected student. Check DB schema/permissions." });
        return;
      }

      // Update local state: add to selectedStudents and REMOVE from contacts/applications
      setSelectedStudents((prev) => {
        if (!prev) return [savedRecord];
        const exists = prev.some((s: any) => s.source_table === table && s.source_id === record.id);
        return exists ? prev : [...prev, savedRecord];
      });

      // Update local state to reflect new status but keep in source table
      if (table === "job_applications") {
        setApplications((prev) => (prev || []).map((a) => a.id === id ? { ...a, status: "selected" } : a));
      }
      if (table === "contact_messages") {
        setContacts((prev) => (prev || []).map((c) => c.id === id ? { ...c, status: "selected" } : c));
      }

      toast({ title: "Approved!", description: "Record marked as approved and added to Selected Students." });
    } catch (err: any) {
      console.error("Approve failed", err);
      toast({ title: "Error", description: err?.message || "Failed to approve. Ensure the table has a 'status' column and RLS allows updates." });
    }
  }

  async function handleDeleteSelected(id: string | number) {
    if (!confirm("Are you sure you want to permanently remove this student from Selected Students? (Their resume will still be available in the original tab)")) return;
    try {
      console.log("Deleting selected student with id:", id);

      // Only delete from selected_students table - keep the source record for resume access
      try {
        console.log("Deleting from selected_students table");
        await supabase.deleteFrom("selected_students", id);
        console.log("Successfully deleted from selected_students");
      } catch (delErr: any) {
        console.error("Error deleting from selected_students:", delErr);
        throw new Error(`Failed to delete: ${delErr?.message || delErr}`);
      }

      toast({ title: "Removed", description: "Student removed from Selected Students. Original record kept for reference." });
      setSelectedStudents((prev) => (prev || []).filter((s) => s.id !== id));
    } catch (err: any) {
      console.error("Delete failed:", err);
      toast({ title: "Error", description: `Failed: ${err?.message || "Failed to remove"}` });
    }
  }

  const renderSelectedTable = () => {
    if (selectedStudentsError) {
      return renderEmptyState("Unable to load selected students", selectedStudentsError, "error");
    }
    if (selectedStudents === null) {
      return renderEmptyState(
        "Connect Supabase to view selected students",
        "We could not reach the selected_students table. Confirm database permissions and try syncing again."
      );
    }
    if (!selectedStudents.length) {
      return renderEmptyState("No selected students", "No approved students yet.");
    }

    return (
      <div className="overflow-hidden rounded-3xl border shadow-2xl backdrop-blur" style={tableShellStyle}>
        <div className="p-6">
          <h2 className="text-xl font-semibold" style={{ color: colors.secondaryHex }}>Selected students</h2>
          <p className="text-sm" style={{ color: secondaryTint(0.65) }}>Approved students from contacts and applications.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y text-left text-sm" style={{ color: colors.secondaryHex }}>
            <thead style={{ background: primaryTint(0.06), color: colors.primaryHex }}>
              <tr>
                <th className="px-6 py-3 font-bold text-sm tracking-wide">Name</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide">Source</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide">Contact</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide">Position</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide">Resume</th>
                <th className="px-6 py-3 font-bold text-sm tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedStudents.map((row: any) => (
                <tr key={row.id} style={{ borderBottom: `1px solid ${secondaryTint(0.35)}` }}>
                  <td className="px-6 py-4">
                    <p className="font-semibold" style={{ color: colors.secondaryHex }}>{formatFullName(row.first_name, row.last_name)}</p>
                  </td>
                  <td className="px-6 py-4"><p style={{ color: secondaryTint(0.6) }}>{row.source_table}</p></td>
                  <td className="px-6 py-4">
                    {row.email ? <a href={`mailto:${row.email}`} style={{ color: colors.primaryHex }}>{row.email}</a> : <span style={{ color: secondaryTint(0.8) }}>—</span>}
                  </td>
                  <td className="px-6 py-4"><p style={{ color: colors.secondaryHex }}>{row.position || row.company || '—'}</p></td>
                  <td className="px-6 py-4">
                    {row.resume_file_url ? (
                      <a href={row.resume_file_url} target="_blank" rel="noopener noreferrer" style={{ color: colors.primaryHex, textDecoration: 'underline' }} className="font-medium">View Resume</a>
                    ) : (
                      <span style={{ color: secondaryTint(0.8) }}>—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button className="inline-flex items-center justify-center px-3 py-1 rounded-md" style={{ minWidth: 84, background: '#ef4444', color: '#fff', fontWeight: 600 }} onClick={async () => await handleDeleteSelected(row.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    if (activeTab === 'contacts') return renderContactsTable();
    if (activeTab === 'applications') return renderApplicationsTable();
    return renderSelectedTable();
  };

  return (
    <div
      className="relative isolate min-h-screen pb-16 pt-8"
      style={{
        background: colors.white,
        color: colors.secondaryHex,
        paddingTop: '6.5rem' // extra spacing to account for fixed header
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden />
      <ConfigBanner />
      {/* Hero banner below header */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="mt-8 mb-8">
          <div
            className="w-full rounded-3xl p-6 shadow-sm hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ background: `linear-gradient(90deg, rgba(${colors.primaryRgb},0.10), ${colors.white})`, border: `1px solid ${primaryTint(0.08)}`, borderLeft: `6px solid ${colors.primaryHex}` }}
          >
            <div className="flex-1">
              <h3 className="text-2xl font-semibold" style={{ color: colors.secondaryHex }}>Welcome back</h3>
              <p className="mt-1 text-sm" style={{ color: secondaryTint(0.6) }}>
                Here's a quick overview of recent activity. Use the controls to the left to switch tabs and manage submissions.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold" style={{ background: colors.primaryHex, color: colors.white }}>
                  {(contacts || []).filter((c: any) => c.status !== "selected").length ?? 0} Pending Leads
                </span>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold" style={{ background: colors.white, border: `1px solid ${primaryTint(0.06)}`, color: colors.secondaryHex }}>
                  {(applications || []).filter((a: any) => a.status !== "selected").length ?? 0} Pending Applicants
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="/" className="inline-flex items-center px-4 py-2 rounded-full font-medium" style={{ background: colors.primaryHex, color: colors.white }}>
                View site
              </a>
              <button onClick={fetchAll} className="inline-flex items-center px-4 py-2 rounded-full border" style={{ borderColor: primaryTint(0.06), color: colors.secondaryHex }}>
                Refresh
              </button>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside
            className="w-full rounded-3xl border p-6 shadow-sm lg:max-w-xs"
            style={{ background: colors.primaryHex, borderColor: colors.primaryHex, color: colors.white }}
          >
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: colors.primaryHex }}>
              Control
            </p>
            <h1 className="mt-3 text-2xl font-bold" style={{ color: colors.white }}>
              Admin dashboard
            </h1>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: colors.white }}>
              Switch between tabs to review contact enquiries and job applications in real time.
            </p>

            <div className="mt-6 space-y-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-pressed={active}
                    className="group flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(${colors.primaryRgb},0.12)`; if (!active) { (e.currentTarget as HTMLElement).style.color = colors.white; } else { (e.currentTarget as HTMLElement).style.color = colors.primaryHex; } }}
                    onMouseLeave={(e) => { if (active) { (e.currentTarget as HTMLElement).style.backgroundColor = colors.white; (e.currentTarget as HTMLElement).style.color = colors.primaryHex; } else { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = colors.white; } }}
                    style={{
                      borderColor: 'rgba(255,255,255,0.14)',
                      background: active ? colors.white : 'transparent',
                      color: active ? colors.primaryHex : colors.white,
                      boxShadow: active ? '0 6px 18px rgba(0,0,0,0.06)' : 'none'
                    }}
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: active ? colors.white : 'rgba(255,255,255,0.12)',
                        color: active ? colors.primaryHex : colors.white,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="text-sm font-semibold" style={{ color: active ? colors.primaryHex : colors.white }}>
                        {tab.label}
                      </span>
                      <p className="mt-1 text-xs" style={{ color: active ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.85)' }}>
                        {tab.description}
                      </p>
                    </span>
                    <span
                      className="rounded-full px-2 py-1 text-xs font-semibold"
                      style={{
                        background: active ? colors.white : 'rgba(255,255,255,0.12)',
                        color: active ? colors.primaryHex : colors.white,
                      }}
                    >
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="flex-1" style={{ color: colors.secondaryHex }}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em]" style={{ color: secondaryTint(0.7) }}>
                  Overview
                </p>
                <h2 className="mt-2 text-3xl font-semibold" style={{ color: colors.secondaryHex }}>
                  Control center
                </h2>
                <p className="mt-1 text-sm" style={{ color: secondaryTint(0.65) }}>
                  {activeTab === "contacts"
                    ? "Monitor every contact submission instantly."
                    : "Discover the latest applicants and their documents."}
                </p>
              </div>

              <button
                onClick={fetchAll}
                disabled={loading}
                className="group inline-flex items-center gap-2 self-start rounded-full border px-5 py-2 text-sm font-medium transition"
                style={{
                  background: colors.primaryHex,
                  borderColor: colors.primaryHex,
                  color: colors.white,
                  opacity: loading ? 0.6 : 1,
                }}
              >
                <RefreshCw className={`h-4 w-4 transition ${loading ? "animate-spin" : "group-hover:-rotate-45"}`} />
                {loading ? "Refreshing..." : "Refresh data"}
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {summaryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="relative overflow-hidden rounded-3xl border p-6 shadow-sm transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = `rgba(${colors.primaryRgb},0.08)`; (e.currentTarget as HTMLElement).style.color = colors.secondaryHex; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = colors.white; (e.currentTarget as HTMLElement).style.color = colors.secondaryHex; }}
                    style={{
                      background: colors.white,
                      borderColor: primaryTint(0.12),
                      color: colors.secondaryHex,
                    }}
                  >
                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide" style={{ color: secondaryTint(0.7) }}>
                          {card.label}
                        </p>
                        <p className="mt-2 text-2xl font-semibold" style={{ color: colors.secondaryHex }}>
                          {card.value}
                        </p>
                        <p className="mt-1 text-sm" style={{ color: secondaryTint(0.6) }}>
                          {card.helper}
                        </p>
                      </div>
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-2xl"
                        style={{ background: colors.primaryHex, color: colors.white }}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">{renderTabContent()}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Admin;
