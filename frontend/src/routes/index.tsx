import { Navigate, useRoutes } from "react-router-dom";
import { DashboardLayout } from "@/layouts/dashboard";
import { PublicLayout } from "@/layouts/public";
import { Dashboard } from "@/pages/dashboard";
import { Login } from "@/pages/login";
import { useAuth } from "@/hooks/use-auth";
import { CreateQrCodePage } from "@/pages/create-qrcode";

export function Router() {
  const { isAuthenticated } = useAuth();

  const routes = useRoutes([
    {
      path: "/",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
    {
      path: "/",
      element: !isAuthenticated ? (
        <PublicLayout />
      ) : (
        <Navigate to="/dashboard" />
      ),
      children: [{ path: "login", element: <Login /> }],
    },
    {
      path: "/create-qrcode",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [{ path: "/create-qrcode", element: <CreateQrCodePage /> }],
    },
  ]);

  return routes;
}
