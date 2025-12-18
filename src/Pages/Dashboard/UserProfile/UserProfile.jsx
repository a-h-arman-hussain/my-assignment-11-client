import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import { FiMail, FiCamera, FiShield } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { imageUpload } from "../../../utils";

const UserProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(""); // temporary preview
  const [tempCover, setTempCover] = useState("");

  const { data: userData } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setLoading(true);
      const uploadedURL = await imageUpload(file);

      // temporary preview
      if (type === "avatar") setTempAvatar(uploadedURL);
      if (type === "cover") setTempCover(uploadedURL);

      // payload for backend
      const payload = { email: user.email };
      if (type === "avatar") payload.photo = uploadedURL;
      if (type === "cover") payload.cover = uploadedURL;

      await axiosSecure.patch("/users/update", payload);

      queryClient.invalidateQueries(["user", user.email]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Cover */}
      <div className="relative h-64 bg-base-300">
        <img
          src={tempCover || userData?.cover || null}
          alt="Cover"
          className="h-full w-full object-cover"
        />
        <label className="absolute top-4 right-6 flex cursor-pointer items-center gap-2 rounded-lg bg-black/60 px-4 py-2 text-sm text-white">
          <FiCamera /> {loading ? "Updating..." : "Edit cover"}
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleImageChange(e, "cover")}
          />
        </label>
      </div>

      {/* Profile Card */}
      <div className="relative mx-auto -mt-24 max-w-4xl rounded-2xl bg-base-100 p-6 text-center shadow-xl">
        {/* Avatar */}
        <div className="relative mx-auto -mt-20 w-40">
          <img
            src={tempAvatar || userData?.photo || user?.photoURL}
            alt="Avatar"
            className="h-40 w-40 rounded-full border-4 border-base-100 object-cover bg-white"
          />
          <label className="absolute bottom-2 right-2 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-primary text-white">
            <FiCamera />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => handleImageChange(e, "avatar")}
            />
          </label>
        </div>

        <h2 className="mt-4 text-2xl font-bold text-neutral">
          {userData?.name || user.displayName || "Unnamed User"}
        </h2>

        <p className="mt-1 flex items-center justify-center gap-2 text-muted">
          <FiMail /> {userData?.email || user.email}
        </p>

        <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-base-200 px-4 py-1 font-semibold text-neutral">
          <FiShield /> {role}
        </span>
      </div>
    </div>
  );
};

export default UserProfile;
