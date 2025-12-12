import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../Shared/Loader/Loader";
import EditScholarshipModal from "./EditScholarshipModal"; // নিচে বানানো হবে
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingScholarship, setEditingScholarship] = useState(null);

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-scholarships");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scholarship?"))
      return;

    try {
      await axiosSecure.delete(`/scholarships/${id}`);
      alert("Scholarship deleted successfully!");
      queryClient.invalidateQueries(["scholarships"]);
    } catch (err) {
      console.error(err);
      alert("Failed to delete scholarship");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen p-6 bg-base-200 text-neutral">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        Manage Scholarships
      </h1>
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow border border-base-300 p-4">
        <table className="table table-zebra w-full">
          <thead className="bg-base-300 text-neutral font-semibold">
            <tr>
              <th>#</th>
              <th>Scholarship Name</th>
              <th>University</th>
              <th>Country</th>
              <th>City</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Degree</th>
              <th>Deadline</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center text-muted">
                  No scholarships found.
                </td>
              </tr>
            ) : (
              scholarships.map((sch, index) => (
                <tr key={sch._id}>
                  <th>{index + 1}</th>
                  <td>{sch.scholarshipName}</td>
                  <td>{sch.universityName}</td>
                  <td>{sch.universityCountry}</td>
                  <td>{sch.universityCity}</td>
                  <td>{sch.subjectCategory}</td>
                  <td>{sch.scholarshipCategory}</td>
                  <td>{sch.degree}</td>
                  <td>{new Date(sch.deadline).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-warning text-white"
                      onClick={() => setEditingScholarship(sch)}
                    >
                      <CiEdit size={20} />
                    </button>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(sch._id)}
                    >
                      <MdOutlineDeleteForever size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editingScholarship && (
        <EditScholarshipModal
          scholarship={editingScholarship}
          closeModal={() => setEditingScholarship(null)}
          onUpdate={() => {
            queryClient.invalidateQueries(["scholarships"]);
            setEditingScholarship(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageScholarships;
