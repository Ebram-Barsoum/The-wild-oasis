import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";

import GlobalStyles from "./styles/globalStyles";
import ProtectedRoute from "./ui/ProtectedRoute";
import DarkModeProvider from "./Contexts/DarkModeContext";
import AppLayout from "./ui/AppLayout";
import FullPageSpinner from "./ui/FullPageSpinner";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const Account = lazy(() => import("./pages/Account"));
const Booking = lazy(() => import("./pages/Booking"));
const CheckIn = lazy(() => import("./pages/CheckIn"));
const Notfound = lazy(() => import("./pages/Notfound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />

      <DarkModeProvider>
        <GlobalStyles />

        <BrowserRouter>
          <Suspense fallback={<FullPageSpinner />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />{" "}
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/bookings/:id" element={<Booking />} />
                <Route path="/check-in/:id" element={<CheckIn />} />
                <Route path="/cabins" element={<Cabins />} />
                <Route path="/users" element={<Users />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/account" element={<Account />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "15px" }}
          defaultOptions={{
            style: {
              fontSize: "16px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              width: "500px",
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

export default App;
