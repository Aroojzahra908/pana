import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, X } from "lucide-react";
import colors from "./colors";
import { toast } from "@/hooks/use-toast";

const ADMIN_EMAIL = "panabotics@gmail.com";
const ADMIN_PASSWORD = "panabotics@123";

const AdminLogin = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
    if (ok) {
      setOpen(false);
      setEmail("");
      setPassword("");
      navigate("/admin");
    } else {
      toast({ title: "Invalid credentials", description: "Wrong email or password" });
    }
  };

  return (
    <>
      <button
        aria-label="Admin login"
        className="fixed right-2 top-1/2 -translate-y-1/2 z-40 rounded-full p-2 shadow-lg transition-opacity opacity-20 hover:opacity-100"
        style={{ backgroundColor: colors.primaryHex, color: colors.white }}
        onClick={() => setOpen(true)}
      >
        <Lock className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <button
              aria-label="Close"
              className="absolute right-3 top-3 rounded-md p-1 text-gray-500 hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="mb-4 text-xl font-bold" style={{ color: colors.secondaryHex }}>
              Admin Login
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label htmlFor="admin-email" className="mb-1 block text-sm text-gray-700">Email</label>
                <input
                  id="admin-email"
                  type="email"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[rgba(0,180,187,0.5)]"
                  placeholder={ADMIN_EMAIL}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </div>
              <div>
                <label htmlFor="admin-pass" className="mb-1 block text-sm text-gray-700">Password</label>
                <input
                  id="admin-pass"
                  type="password"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[rgba(0,180,187,0.5)]"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                className="mt-2 w-full rounded-lg px-4 py-2 font-semibold shadow-md transition-transform hover:scale-[1.01]"
                style={{ backgroundColor: colors.primaryHex, color: colors.white }}
              >
                Login
              </button>
            </form>
            <p className="mt-3 text-center text-xs text-gray-500">For internal use only</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;
