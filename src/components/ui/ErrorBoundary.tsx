import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "./Link";
import { Button } from "./button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
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
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught application error caught by ErrorBoundary:", error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 font-sans text-center">
          <div className="p-4 rounded-full bg-rose-50 border border-rose-200 text-rose-600 mb-4 animate-bounce">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
            Something Went Wrong
          </h2>

          <p className="mt-2 text-sm text-ink-600 max-w-md leading-relaxed">
            An unexpected error occurred while processing this return policy view.
          </p>

          {this.state.error && (
            <div className="mt-4 p-3 bg-slate-100 rounded-xl text-xs font-mono text-slate-700 max-w-lg overflow-x-auto text-left border border-slate-200">
              {this.state.error.message || "Unknown client runtime exception"}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button
              onClick={this.handleReset}
              variant="teal"
              className="inline-flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reload Page</span>
            </Button>

            <Link href="/">
              <Button variant="outline" className="inline-flex items-center gap-2 cursor-pointer">
                <Home className="h-4 w-4" />
                <span>Return to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
