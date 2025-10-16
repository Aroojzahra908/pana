import React, { useEffect, useMemo, useState } from "react";
import { Briefcase, Inbox, RefreshCw, Sparkles, Users } from "lucide-react";
import supabase from "@/lib/supabaseClient"; // simple REST helpers: supabase.fetchTable / supabase.insertInto
import { toast } from "@/hooks/use-toast";

type TabKey = "contacts" | "applications";

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

const Admin: React.FC = () => {
  const [contacts, setContacts] = useState<any[] | null>(null); // contact_messages table
  const [contactsError, setContactsError] = useState<string | null>(null);

  const [applications, setApplications] = useState<any[] | null>(null); // job_applications table
  const [applicationsError, setApplicationsError] = useState<string | null>(null);

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

      setLastSynced(new Date().toISOString());
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to fetch data from Supabase." });
    } finally {
      setLoading(false);
    }
  }

  const uniqueCompanies = useMemo(() => {
    if (!contacts?.length) return 0;
    const companies = new Set<string>();
    contacts.forEach((entry) => {
      if (entry?.company) {
        companies.add(String(entry.company));
      }
    });
    return companies.size;
  }, [contacts]);

  const uniqueRoles = useMemo(() => {
    if (!applications?.length) return 0;
    const roles = new Set<string>();
    applications.forEach((entry) => {
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
      badge: contacts?.length ?? 0,
    },
    {
      id: "applications" as const,
      label: "Job Applications",
      description: "Candidates who applied for open roles.",
      icon: Briefcase,
      badge: applications?.length ?? 0,
    },
  ];

  const summaryCards = [
    {
      label: "Contact Leads",
      value: contacts?.length ?? 0,
      helper: uniqueCompanies > 0 ? `${uniqueCompanies} unique companies` : "Awaiting first lead",
      icon: Inbox,
      accent: "from-sky-500/70 via-sky-400/60 to-cyan-500/60",
    },
    {
      label: "Applicants",
      value: applications?.length ?? 0,
      helper: uniqueRoles > 0 ? `${uniqueRoles} roles represented` : "No roles yet",
      icon: Users,
      accent: "from-violet-500/70 via-indigo-500/60 to-fuchsia-500/60",
    },
    {
      label: "Dashboard status",
      value: loading ? "Refreshing…" : "Live",
      helper: lastSynced ? `Last sync ${formatDateTime(lastSynced)}` : "Sync to populate data",
      icon: Sparkles,
      accent: "from-emerald-500/70 via-teal-500/60 to-lime-500/60",
    },
  ];

  const ConfigBanner = () =>
    missingConfig ? (
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-2xl border border-amber-200/40 bg-amber-500/15 p-6 text-amber-100 backdrop-blur">
          <h3 className="text-lg font-semibold">Supabase configuration required</h3>
          <p className="mt-2 text-sm leading-relaxed">
            Connect your project to Supabase by setting VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY or use the MCP popover to link
            Supabase before the admin data can be displayed.
          </p>
        </div>
      </div>
    ) : null;

  const renderEmptyState = (title: string, description: string, tone: "muted" | "error" = "muted") => {
    const toneClasses =
      tone === "error"
        ? "border-rose-400/60 bg-rose-500/15 text-rose-100"
        : "border-white/15 bg-white/5 text-slate-200";
    return (
      <div className={`rounded-3xl border px-8 py-14 text-center text-sm leading-relaxed ${toneClasses}`}>
        <p className="text-lg font-semibold">{title}</p>
        <p className="mx-auto mt-2 max-w-md text-sm opacity-80">{description}</p>
      </div>
    );
  };

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
    if (!contacts.length) {
      return renderEmptyState(
        "No contact messages yet",
        "When someone fills out the contact form, their details will appear here automatically."
      );
    }

    return (
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">Contact messages</h2>
            <p className="text-sm text-slate-300">
              Review student and client enquiries with all supporting details.
            </p>
          </div>
          <span className="rounded-full bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-200">
            {contacts.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-100">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
              <tr>
                <th className="px-6 py-3 font-semibold">Student</th>
                <th className="px-6 py-3 font-semibold">Contact</th>
                <th className="px-6 py-3 font-semibold">Company &amp; Service</th>
                <th className="px-6 py-3 font-semibold">Message</th>
                <th className="px-6 py-3 font-semibold">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {contacts.map((contact) => (
                <tr key={contact.id} className="transition hover:bg-white/10">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">{formatFullName(contact.first_name, contact.last_name)}</p>
                    <p className="text-xs text-slate-300">{contact.role || contact.company || "—"}</p>
                  </td>
                  <td className="px-6 py-4">
                    {contact.email ? (
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm text-sky-200 hover:text-sky-100"
                      >
                        {contact.email}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-300">—</p>
                    )}
                    {contact.phone ? (
                      <p className="mt-1 text-xs text-slate-300">{contact.phone}</p>
                    ) : null}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-200">{contact.company || "—"}</p>
                    <span className="mt-1 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-sky-200">
                      {contact.service || "Not specified"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="max-w-md text-sm text-slate-100 line-clamp-3">
                      {contact.message || "No additional message supplied."}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">{formatDateTime(contact.created_at)}</td>
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
    if (!applications.length) {
      return renderEmptyState(
        "No job applications yet",
        "As soon as a candidate submits the careers form, their record will appear here."
      );
    }

    return (
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">Job applications</h2>
            <p className="text-sm text-slate-300">
              Track every applicant and their supporting documents at a glance.
            </p>
          </div>
          <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200">
            {applications.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-100">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-300">
              <tr>
                <th className="px-6 py-3 font-semibold">Student</th>
                <th className="px-6 py-3 font-semibold">Contact</th>
                <th className="px-6 py-3 font-semibold">Role info</th>
                <th className="px-6 py-3 font-semibold">Resume &amp; links</th>
                <th className="px-6 py-3 font-semibold">Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {applications.map((application) => (
                <tr key={application.id} className="transition hover:bg-white/10">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">
                      {formatFullName(application.first_name, application.last_name)}
                    </p>
                    <p className="text-xs text-slate-300">{application.linkedin || "—"}</p>
                  </td>
                  <td className="px-6 py-4">
                    {application.email ? (
                      <a
                        href={`mailto:${application.email}`}
                        className="text-sm text-sky-200 hover:text-sky-100"
                      >
                        {application.email}
                      </a>
                    ) : (
                      <p className="text-sm text-slate-300">—</p>
                    )}
                    {application.phone ? (
                      <p className="mt-1 text-xs text-slate-300">{application.phone}</p>
                    ) : null}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-slate-200">
                      {application.position || "General application"}
                    </p>
                    <p className="mt-1 text-xs text-slate-300">Job ID: {application.job_id ?? "—"}</p>
                  </td>
                  <td className="px-6 py-4 space-y-2">
                    {application.resume_file_name ? (
                      <p className="text-sm text-slate-100">{application.resume_file_name}</p>
                    ) : (
                      <p className="text-sm text-slate-300">No resume attached</p>
                    )}
                    {application.cover_letter ? (
                      <p className="text-xs text-slate-300 line-clamp-2">{application.cover_letter}</p>
                    ) : null}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">{formatDateTime(application.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderTabContent = () => (activeTab === "contacts" ? renderContactsTable() : renderApplicationsTable());

  return (
    <div className="relative isolate min-h-screen bg-slate-950 pb-16 pt-8 text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%)]"
        aria-hidden
      />
      <ConfigBanner />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="w-full rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur lg:max-w-xs">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-300">Control</p>
            <h1 className="mt-3 text-2xl font-semibold text-white">Admin dashboard</h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
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
                    className={`group flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? "border-white/50 bg-white text-slate-900 shadow-lg"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        active ? "bg-slate-900/5 text-slate-900" : "bg-white/10 text-sky-200"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className={`text-sm font-semibold ${active ? "text-slate-900" : "text-white"}`}>
                        {tab.label}
                      </span>
                      <p className={`mt-1 text-xs ${active ? "text-slate-600" : "text-slate-300"}`}>
                        {tab.description}
                      </p>
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        active ? "bg-slate-900/10 text-slate-900" : "bg-white/10 text-slate-200"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-sky-300">Overview</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Control center</h2>
                <p className="mt-1 text-sm text-slate-300">
                  {activeTab === "contacts"
                    ? "Monitor every contact submission instantly."
                    : "Discover the latest applicants and their documents."}
                </p>
              </div>

              <button
                onClick={fetchAll}
                disabled={loading}
                className="group inline-flex items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCw
                  className={`h-4 w-4 transition ${loading ? "animate-spin" : "group-hover:-rotate-45"}`}
                />
                {loading ? "Refreshing..." : "Refresh data"}
              </button>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {summaryCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur transition hover:border-white/30 hover:bg-white/10"
                  >
                    <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-20`} />
                    <div className="relative z-10 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-300">{card.label}</p>
                        <p className="mt-2 text-2xl font-semibold text-white">{card.value}</p>
                        <p className="mt-1 text-sm text-slate-300">{card.helper}</p>
                      </div>
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
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
