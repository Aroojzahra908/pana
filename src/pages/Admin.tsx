import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import { toast } from "@/hooks/use-toast";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<any[] | null>(null);
  const [visits, setVisits] = useState<any[] | null>(null);
  const [courses, setCourses] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const missingConfig = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

  useEffect(() => {
    if (missingConfig) return;
    fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchAll() {
    setLoading(true);
    try {
      const { data: usersData, error: usersError } = await supabase.from("users").select("*");
      if (usersError) {
        console.warn("users fetch error:", usersError);
        setUsers(null);
      } else {
        setUsers(usersData || []);
      }

      const { data: visitsData, error: visitsError } = await supabase.from("page_visits").select("*");
      if (visitsError) {
        console.warn("visits fetch error:", visitsError);
        setVisits(null);
      } else {
        setVisits(visitsData || []);
      }

      const { data: coursesData, error: coursesError } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
      if (coursesError) {
        console.warn("courses fetch error:", coursesError);
        setCourses(null);
      } else {
        setCourses(coursesData || []);
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
      const payload = { title: title.trim(), description: description.trim(), created_at: new Date().toISOString() };
      const { data, error } = await supabase.from("courses").insert([payload]);
      if (error) {
        console.error(error);
        toast({ title: "Error", description: "Failed to add course. Check RLS and keys." });
      } else {
        toast({ title: "Success", description: "Course added." });
        setTitle("");
        setDescription("");
        // refresh
        const { data: refreshed } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
        setCourses(refreshed || []);
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Unexpected error while adding course." });
    } finally {
      setLoading(false);
    }
  }

  if (missingConfig) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Admin panel setup</h2>
        <p className="mb-4">
          Supabase environment variables are not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment or
          connect via the Builder MCP popover.
        </p>
        <p className="text-sm text-muted-foreground">After you configure the keys, refresh this page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Users</h3>
          {users === null ? (
            <div className="text-sm text-muted-foreground">No users table or permission denied.</div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-auto">
              {users.map((u) => (
                <div key={u.id} className="text-sm">
                  <div className="font-medium">{u.email || u.id}</div>
                  <div className="text-xs text-slate-500">{u.role || "-"}</div>
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
  );
};

export default Admin;
