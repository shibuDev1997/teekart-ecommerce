import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useThemeStore } from "../store/useThemeStore";

interface AppProvidersProps {
  children: ReactNode;
}

// Global React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  const { mode } = useThemeStore();

  // Create Material UI Theme matching our custom design tokens
  const muiTheme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: "#5A827E", // Sage Dark
          light: "#B9D4AA",
          dark: "#3B5A57",
        },
        secondary: {
          main: "#84AE92", // Sage Medium
        },
        background: {
          default: mode === "light" ? "#f9fafb" : "#0f172a", // slate 900 in dark
          paper: mode === "light" ? "#ffffff" : "#1e293b", // slate 800 in dark
        },
        text: {
          primary: mode === "light" ? "#1f2937" : "#f3f4f6",
          secondary: mode === "light" ? "#6b7280" : "#9ca3af",
        },
      },
      typography: {
        fontFamily: "'Outfit', sans-serif",
      },
      shape: {
        borderRadius: 16,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 24,
              textTransform: "none",
              fontWeight: 600,
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: 24,
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
};
