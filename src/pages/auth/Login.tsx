import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validations/authValidation";
import { useAuthStore } from "../../store/useAuthStore";
import { dummyUsers } from "../../constants/mockData";
import { ShieldAlert, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button, Alert, TextField, CircularProgress } from "@mui/material";

type LoginForm = typeof loginSchema._type;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((s) => s.login);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect target
  const from = (location.state as any)?.from?.pathname || "/";

  const onSubmit = async (data: LoginForm) => {
    setErrorMsg("");
    setLoading(true);

    try {
      // Simulate API verification
      await new Promise((res) => setTimeout(res, 800));

      const foundUser = dummyUsers.find(
        (u) => u.email.toLowerCase() === data.email.toLowerCase()
      );

      if (!foundUser) {
        // Fallback user creation if it's a demonstration
        if (data.email.includes("@")) {
          const mockUser = {
            id: (dummyUsers.length + 1).toString(),
            name: data.email.split("@")[0].toUpperCase(),
            email: data.email,
            role: "user" as const,
            avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=150`,
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem("teekart-token", "mock-token-session");
          login(mockUser);
          navigate(from, { replace: true });
          return;
        }
        throw new Error("No account registered with this email.");
      }

      // If matches, log in
      localStorage.setItem("teekart-token", foundUser.role === "admin" ? "mock-admin-token" : "mock-user-token");
      login(foundUser);
      navigate(from, { replace: true });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700/50">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl gradient-sage flex items-center justify-center text-white font-bold text-xl mx-auto shadow-md">
            T
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Sign in to access your orders and wishlist.
          </p>
        </div>

        {/* Demo Accounts Alert */}
        <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 rounded-2xl p-4 text-xs text-gray-600 dark:text-gray-400 mb-6 space-y-1">
          <p className="font-bold flex items-center gap-1 text-sage-dark dark:text-emerald-400">
            <ShieldAlert className="h-3.5 w-3.5" /> MNC Test Credentials:
          </p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>User: <code className="font-mono">john@example.com</code> / Pass: <code className="font-mono">123456</code></li>
            <li>Admin: <code className="font-mono">admin@teekart.com</code> / Pass: <code className="font-mono">123456</code></li>
            <li>Or log in with any email to auto-register.</li>
          </ul>
        </div>

        {errorMsg && (
          <Alert severity="error" className="mb-6 rounded-2xl">
            {errorMsg}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              variant="outlined"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                className: "rounded-2xl dark:text-white",
              }}
              InputLabelProps={{
                className: "dark:text-gray-400",
              }}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                className: "rounded-2xl dark:text-white",
                endAdornment: (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                ),
              }}
              InputLabelProps={{
                className: "dark:text-gray-400",
              }}
            />
          </div>

          {/* Links */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <Link
              to="/forgot-password"
              className="hover:underline text-sage-dark dark:text-emerald-400 font-semibold"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowRight className="h-4 w-4" />}
            className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case text-base py-3 shadow-lg shadow-sage-dark/15 transition-all duration-200"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sage-dark dark:text-emerald-400 font-bold hover:underline"
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
};
