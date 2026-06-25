import { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@mui/material";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
          <div className="max-w-md bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 dark:text-red-400 mx-auto mb-6">
              <AlertCircle className="h-8 w-8" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
              We apologize for the inconvenience. An unexpected error occurred:{" "}
              <span className="font-mono text-red-500 block mt-2 text-xs p-2 bg-red-50 dark:bg-red-950/30 rounded border border-red-100 dark:border-red-900/20">
                {this.state.error?.message || "Unknown error"}
              </span>
            </p>

            <Button
              variant="contained"
              onClick={this.handleReset}
              startIcon={<RefreshCw className="h-4 w-4" />}
              className="bg-sage-dark hover:bg-emerald-700 font-bold rounded-full normal-case text-white px-6 py-2 shadow-lg"
            >
              Go to Home Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
