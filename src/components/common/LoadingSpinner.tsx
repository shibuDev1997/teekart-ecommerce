import React from "react";
import { CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
  fullPage?: boolean;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullPage = false, message = "Loading..." }) => {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <CircularProgress className="text-sage-dark" size={48} thickness={4} />
      {message && (
        <p className="mt-4 text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="min-h-[70vh] w-full flex items-center justify-center bg-transparent">
        {content}
      </div>
    );
  }

  return content;
};
