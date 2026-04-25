import { AdminLayout } from "@/components/AdminLayout";
import { Layout } from "@/components/Layout";
import { LoadingScreen } from "@/components/ui/LoadingSpinner";
import { Toaster } from "@/components/ui/sonner";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";
import { AuthProvider } from "@/hooks/use-auth";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ── LinkSphere pages ──────────────────────────────────────────────────────────
const FeedPage = lazy(() => import("@/pages/FeedPage"));
const ReelsPage = lazy(() => import("@/pages/ReelsPage"));
const FriendsPage = lazy(() => import("@/pages/FriendsPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ProductsPage = lazy(() => import("@/pages/ProductsPage"));
const FilesPage = lazy(() => import("@/pages/FilesPage"));

// ── Admin pages ───────────────────────────────────────────────────────────────
const AdminLoginPage = lazy(() => import("@/pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(
  () => import("@/pages/admin/AdminDashboardPage"),
);
const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsersPage"));
const AdminPostsPage = lazy(() => import("@/pages/admin/AdminPostsPage"));
const AdminVerifiedPage = lazy(() => import("@/pages/admin/AdminVerifiedPage"));
const AdminProductsPage = lazy(() => import("@/pages/admin/AdminProductsPage"));
const AdminFilesPage = lazy(() => import("@/pages/admin/AdminFilesPage"));
const AdminAnalyticsPage = lazy(
  () => import("@/pages/admin/AdminAnalyticsPage"),
);
const AdminSettingsPage = lazy(() => import("@/pages/admin/AdminSettingsPage"));

// ── Unified root route (no Layout at root — delegated to children) ────────────
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <AdminAuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
        <Toaster position="top-center" richColors />
      </AdminAuthProvider>
    </AuthProvider>
  ),
});

// ── LinkSphere layout wrapper route ──────────────────────────────────────────
const linkSphereLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "linksphere-layout",
  component: () => (
    <Layout>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => linkSphereLayoutRoute,
  path: "/",
  component: FeedPage,
});

const reelsRoute = createRoute({
  getParentRoute: () => linkSphereLayoutRoute,
  path: "/reels",
  component: ReelsPage,
});

const friendsRoute = createRoute({
  getParentRoute: () => linkSphereLayoutRoute,
  path: "/friends",
  component: FriendsPage,
});

const notificationsRoute = createRoute({
  getParentRoute: () => linkSphereLayoutRoute,
  path: "/notifications",
  component: NotificationsPage,
});

const profileRoute = createRoute({
  getParentRoute: () => linkSphereLayoutRoute,
  path: "/profile",
  component: ProfilePage,
});

const productsRoute = createRoute({
  getParentRoute: () => linkSphereLayoutRoute,
  path: "/products",
  component: ProductsPage,
});

const filesRoute = createRoute({
  getParentRoute: () => linkSphereLayoutRoute,
  path: "/files",
  component: FilesPage,
});

// ── Admin login (no AdminLayout) ──────────────────────────────────────────────
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLoginPage,
});

// ── Admin layout wrapper route ────────────────────────────────────────────────
const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-layout",
  component: () => (
    <AdminLayout>
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  ),
});

const adminIndexRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin",
  component: AdminDashboardPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/users",
  component: AdminUsersPage,
});

const adminPostsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/posts",
  component: AdminPostsPage,
});

const adminVerifiedRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/verified",
  component: AdminVerifiedPage,
});

const adminProductsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/products",
  component: AdminProductsPage,
});

const adminFilesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/files",
  component: AdminFilesPage,
});

const adminAnalyticsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/analytics",
  component: AdminAnalyticsPage,
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/settings",
  component: AdminSettingsPage,
});

// ── Route tree ────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  linkSphereLayoutRoute.addChildren([
    indexRoute,
    reelsRoute,
    friendsRoute,
    notificationsRoute,
    profileRoute,
    productsRoute,
    filesRoute,
  ]),
  adminLoginRoute,
  adminLayoutRoute.addChildren([
    adminIndexRoute,
    adminUsersRoute,
    adminPostsRoute,
    adminVerifiedRoute,
    adminProductsRoute,
    adminFilesRoute,
    adminAnalyticsRoute,
    adminSettingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
