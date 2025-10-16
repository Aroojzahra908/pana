import React, { useEffect, useMemo, useState } from "react";
import { Briefcase, Inbox, RefreshCw, Sparkles, Users } from "lucide-react";
import supabase from "@/lib/supabaseClient"; // simple REST helpers: supabase.fetchTable / supabase.insertInto
import { toast } from "@/hooks/use-toast";
import colors from "@/components/colors";

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

const primaryTint = (opacity: number) => `rgba(${colors.primaryRgb}, ${opacity})`;
const secondaryTint = (opacity: number) => `rgba(${colors.secondaryRgb}, ${opacity})`;

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
      tint: primaryTint(0.16),
    },
    {
      label: "Applicants",
      value: applications?.length ?? 0,
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
    background: primaryTint(0.04),
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
    if (!contacts.length) {
      return renderEmptyState(
        "No contact messages yet",
        "When someone fills out the contact form, their details will appear here automatically."
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
            {contacts.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y text-left text-sm" style={{ color: colors.secondaryHex }}>
            <thead style={{ background: colors.primaryHex, color: colors.white }}>
              <tr>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Student</th>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Contact</th>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Company &amp; Service</th>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Message</th>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Received</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} style={{ borderBottom: `1px solid ${secondaryTint(0.35)}`, transition: 'background-color 0.18s ease' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `rgba(${colors.primaryRgb},0.04)`)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
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
            {applications.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y text-left text-sm" style={{ color: colors.secondaryHex }}>
            <thead style={{ background: colors.primaryHex, color: colors.white }}>
              <tr>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Student</th>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Contact</th>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Role info</th>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Resume &amp; links</th>
                <th className="px-6 py-3 font-bold text-sm uppercase tracking-wide" style={{ color: colors.white }}>Applied</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application) => (
                <tr key={application.id} style={{ borderBottom: `1px solid ${secondaryTint(0.35)}`, transition: 'background-color 0.18s ease' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `rgba(${colors.primaryRgb},0.04)`)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
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
                  {contacts?.length ?? 0} Leads
                </span>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold" style={{ background: colors.white, border: `1px solid ${primaryTint(0.06)}`, color: colors.secondaryHex }}>
                  {applications?.length ?? 0} Applicants
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
            style={{ background: primaryTint(0.03), borderColor: primaryTint(0.12), color: colors.secondaryHex }}
          >
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: colors.primaryHex }}>
              Control
            </p>
            <h1 className="mt-3 text-2xl font-semibold" style={{ color: colors.secondaryHex }}>
              Admin dashboard
            </h1>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: secondaryTint(0.65) }}>
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
                    className="group flex w-full items-start gap-3 rounded-2xl border px-4 py-3 text-left transition hover:shadow-md"
                    style={{
                      borderColor: active ? colors.primaryHex : primaryTint(0.08),
                      background: active ? colors.primaryHex : colors.white,
                      color: active ? colors.white : colors.secondaryHex,
                    }}
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background: active ? colors.white : primaryTint(0.06),
                        color: colors.primaryHex,
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="text-sm font-semibold" style={{ color: active ? colors.white : colors.secondaryHex }}>
                        {tab.label}
                      </span>
                      <p className="mt-1 text-xs" style={{ color: active ? 'rgba(255,255,255,0.9)' : secondaryTint(0.6) }}>
                        {tab.description}
                      </p>
                    </span>
                    <span
                      className="rounded-full px-2 py-1 text-xs font-semibold"
                      style={{
                        background: active ? colors.white : primaryTint(0.06),
                        color: active ? colors.primaryHex : colors.secondaryHex,
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
                    style={{
                      background: primaryTint(0.06),
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
