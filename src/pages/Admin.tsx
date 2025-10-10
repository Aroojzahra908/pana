import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient"; // simple REST helpers: supabase.fetchTable / supabase.insertInto
import { toast } from "@/hooks/use-toast";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<any[] | null>(null); // uses profiles table from Supabase
  const [visits, setVisits] = useState<any[] | null>(null);
  const [courses, setCourses] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const missingConfig = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    // attempt to fetch regardless; fetchTable will throw helpful errors if vars are missing
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      try {
        const usersData = await supabase.fetchTable("profiles");
        setUsers(usersData || []);
      } catch (err) {
        console.warn("users fetch error:", err);
        setUsers(null);
      }

      try {
        const visitsData = await supabase.fetchTable("page_visits");
        setVisits(visitsData || []);
      } catch (err) {
        console.warn("visits fetch error:", err);
        setVisits(null);
      }

      try {
        const coursesData = await supabase.fetchTable("courses");
        // sort by created_at desc if present
        const sorted = Array.isArray(coursesData)
          ? coursesData.sort((a: any, b: any) => (a.created_at < b.created_at ? 1 : -1))
          : coursesData;
        setCourses(sorted || []);
      } catch (err) {
        console.warn("courses fetch error:", err);
        setCourses(null);
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to fetch data from Supabase." });
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast({ title: "Validation", description: "Title is required." });
      return;
    }
    setLoading(true);
    try {
      const payload = [{ title: title.trim(), description: description.trim(), created_at: new Date().toISOString() }];
      try {
        const inserted = await supabase.insertInto("courses", payload);
        toast({ title: "Success", description: "Course added." });
        setTitle("");
        setDescription("");
        // refresh
        try {
          const refreshed = await supabase.fetchTable("courses");
          const sorted = Array.isArray(refreshed) ? refreshed.sort((a: any, b: any) => (a.created_at < b.created_at ? 1 : -1)) : refreshed;
          setCourses(sorted || []);
        } catch (err) {
          console.warn("refresh courses failed", err);
        }
      } catch (err) {
        console.error(err);
        toast({ title: "Error", description: "Failed to add course. Check RLS and keys." });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Unexpected error while adding course." });
    } finally {
      setLoading(false);
    }
  }

  // show banner if env vars are missing but continue rendering so we can surface detailed errors
  const ConfigBanner = () =>
    missingConfig ? (
      <div className="max-w-6xl mx-auto p-6">
        <div className="rounded-md bg-yellow-50 p-4 mb-6 border border-yellow-200">
          <h3 className="font-semibold">Supabase config not set</h3>
          <p className="text-sm">Supabase environment variables are not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment or connect via the Builder MCP popover.</p>
        </div>
      </div>
    ) : null;


  return (
    <div>
      <ConfigBanner />
      <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Profiles</h3>
          {users === null ? (
            <div className="text-sm text-muted-foreground">No profiles table or permission denied.</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-auto">
              {users.map((u) => (
                <div key={u.id} className="text-sm">
                  <div className="font-medium">{u.email || u.id}</div>
                  <div className="text-xs text-slate-500">{u.role || "user"}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Page visits</h3>
          {visits === null ? (
            <div className="text-sm text-muted-foreground">No page_visits table or permission denied.</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-auto text-sm">
              {visits.map((v) => (
                <div key={v.id}>
                  <div className="font-medium">{v.path}</div>
                  <div className="text-xs text-slate-500">{v.created_at}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Courses</h3>
          {courses === null ? (
            <div className="text-sm text-muted-foreground">No courses table or permission denied.</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-auto text-sm">
              {courses.map((c) => (
                <div key={c.id}>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-xs text-slate-500">{c.created_at}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border rounded-lg">
        <h3 className="font-semibold mb-4">Add Course</h3>
        <form onSubmit={handleAddCourse} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded px-3 py-2" />
          </div>
          <div className="flex items-center space-x-3">
            <button disabled={loading} className="px-4 py-2 bg-primary text-primary-foreground rounded">
              Add Course
            </button>
            <button type="button" onClick={() => fetchAll()} className="px-4 py-2 border rounded">
              Refresh
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
};

export default Admin;
