import React from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../Pages/Shared/Loader/Loader";
import useRole from "../hooks/useRole";
import Forbidden from "../Components/Forbidden/Forbidden";

const ModeratorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();
  if (loading || roleLoading) return <Loader></Loader>;
  if (role !== "Moderator") return <Forbidden></Forbidden>;
  return children;
};

export default ModeratorRoute;
