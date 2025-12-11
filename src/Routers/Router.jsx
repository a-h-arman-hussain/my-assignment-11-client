import { createBrowserRouter } from "react-router";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import AllScholarships from "../Pages/AllScholarships/AllScholarships";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import MyApplications from "../Pages/Dashboard/StudentDashboard/MyApplications/MyApplications";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled";
import MyReviews from "../Pages/Dashboard/StudentDashboard/MyReviews/MyReviews";
import AddScholarship from "../Pages/Dashboard/AdminDashboard/AddScholarship/AddScholarship";
import ManageScholarships from "../Pages/Dashboard/AdminDashboard/ManageScholarships/ManageScholarships";
import ManageUsers from "../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers";
import ManageApplications from "../Pages/Dashboard/ModeratorDashboard/ManageApplications/ManageApplications";
import AllReviews from "../Pages/Dashboard/ModeratorDashboard/AllReviews/AllReviews";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import AdminRoute from "./AdminRoute";
import Analytics from "../Pages/Dashboard/AdminDashboard/Analytics/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "/all-scholarships", Component: AllScholarships },
      { path: "/scholarship-details/:id", Component: ScholarshipDetails },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      { path: "/register", Component: Register },
      { path: "/login", Component: Login },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      { path: "my-applications", Component: MyApplications },
      { path: "my-reviews", Component: MyReviews },
      {
        path: "add-scholarship",
        element: (
          <AdminRoute>
            <AddScholarship></AddScholarship>
          </AdminRoute>
        ),
      },
      {
        path: "manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships></ManageScholarships>
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <AdminRoute>
            <Analytics></Analytics>
          </AdminRoute>
        ),
      },

      { path: "manage-applications", Component: ManageApplications },
      { path: "all-reviews", Component: AllReviews },
      { path: "user-profile", Component: UserProfile },

      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
  { path: "/*", Component: NotFoundPage },
]);

export default router;
