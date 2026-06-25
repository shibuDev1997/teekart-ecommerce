import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../validations/authValidation";
import { Button, Alert, TextField, CircularProgress } from "@mui/material";
import { ArrowLeft, CheckCircle } from "lucide-react";

type ForgotPasswordForm = typeof forgotPasswordSchema._type;

export const ForgotPassword: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (_data: ForgotPasswordForm) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      setSuccess(true);
    } catch {
      // Mock never fails
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
            Reset Password
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Enter your email and we'll send a password reset link.
          </p>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <Alert severity="success" icon={<CheckCircle className="h-5 w-5" />} className="rounded-2xl">
              Reset instructions have been sent to your email.
            </Alert>
            <Button
              component={Link}
              to="/login"
              startIcon={<ArrowLeft className="h-4 w-4" />}
              className="text-sage-dark font-bold hover:underline normal-case"
            >
              Back to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              className="bg-sage-dark hover:bg-emerald-700 text-white font-bold rounded-2xl normal-case text-base py-3 shadow-lg shadow-sage-dark/15 transition-all duration-200"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <Button
                component={Link}
                to="/login"
                startIcon={<ArrowLeft className="h-4 w-4" />}
                className="text-gray-500 dark:text-gray-400 font-bold hover:underline normal-case text-sm"
              >
                Back to Login
              </Button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
