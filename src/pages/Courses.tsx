import React, { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    setLoading(true);
    try {
      const data = await supabase.fetchTable("courses");
      const published = Array.isArray(data) ? data.filter((c) => c.published) : data;
      setCourses(published || []);
    } catch (err) {
      console.error(err);
      setCourses(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      {loading && <div>Loading...</div>}
      {courses === null ? (
        <div className="text-sm text-muted-foreground">No courses available or permission denied.</div>
      ) : courses.length === 0 ? (
        <div className="text-sm text-muted-foreground">No published courses yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <div key={c.id} className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-slate-600 mb-2">{c.description}</p>
              <div className="text-xs text-slate-400">Added: {new Date(c.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
