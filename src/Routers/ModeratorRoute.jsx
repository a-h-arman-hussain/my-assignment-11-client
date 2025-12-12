import React from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../Pages/Shared/Loader/Loader";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router";

const ModeratorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) return <Loader></Loader>;
  if (role !== "Moderator")
    return <Navigate state={location.pathname} to="/"></Navigate>;
  return children;
};

export default ModeratorRoute;
