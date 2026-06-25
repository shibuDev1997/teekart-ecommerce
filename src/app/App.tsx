import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProviders } from "../providers/AppProviders";
import { Header } from "../components/layouts/Header";
import { Footer } from "../components/layouts/Footer";
import { AppRoutes } from "../routes/AppRoutes";
import { ErrorBoundary } from "../components/common/ErrorBoundary";

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AppProviders>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
            {/* Header Navigation */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-grow">
              <AppRoutes />
            </main>

            {/* Footer Information */}
            <Footer />
          </div>
        </AppProviders>
      </Router>
    </ErrorBoundary>
  );
};
