import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validations/authValidation";
import { useAuthStore } from "../../store/useAuthStore";
import { Button, Alert, TextField, CircularProgress } from "@mui/material";
import { ArrowRight } from "lucide-react";

type RegisterForm = typeof registerSchema._type;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setErrorMsg("");
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 800));

      const mockUser = {
        id: Math.floor(100 + Math.random() * 900).toString(),
        name: data.name,
        email: data.email,
        role: "user" as const,
        avatar: `https://images.unsplash.com/photo-${1535713875002 + Math.floor(Math.random() * 100000)}?w=150`,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("teekart-token", "mock-token-session");
      login(mockUser);
      navigate("/");
    } catch (err: any) {
      setErrorMsg(err.message || "Registration failed.");
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
            Create Account
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Join TeeKart and start shopping premium tees.
          </p>
        </div>

        {errorMsg && (
          <Alert severity="error" className="mb-6 rounded-2xl">
            {errorMsg}
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            InputProps={{ className: "rounded-2xl dark:text-white" }}
            InputLabelProps={{ className: "dark:text-gray-400" }}
          />

          {/* Email */}
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{ className: "rounded-2xl dark:text-white" }}
            InputLabelProps={{ className: "dark:text-gray-400" }}
          />

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{ className: "rounded-2xl dark:text-white" }}
            InputLabelProps={{ className: "dark:text-gray-400" }}
          />

          {/* Confirm Password */}
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{ className: "rounded-2xl dark:text-white" }}
            InputLabelProps={{ className: "dark:text-gray-400" }}
          />

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowRight className="h-4 w-4" />}
            className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case text-base py-3 shadow-lg shadow-sage-dark/15 transition-all duration-200"
          >
            {loading ? "Registering..." : "Create Account"}
          </Button>
        </form>

        {/* Footer Link */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sage-dark dark:text-emerald-400 font-bold hover:underline"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};
