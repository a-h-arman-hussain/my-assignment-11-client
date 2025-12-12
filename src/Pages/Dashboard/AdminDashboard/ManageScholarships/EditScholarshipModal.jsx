import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EditScholarshipModal = ({ scholarship, closeModal, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    scholarshipName: scholarship.scholarshipName || "",
    universityName: scholarship.universityName || "",
    universityCountry: scholarship.universityCountry || "",
    universityCity: scholarship.universityCity || "",
    subjectCategory: scholarship.subjectCategory || "",
    scholarshipCategory: scholarship.scholarshipCategory || "",
    degree: scholarship.degree || "",
    deadline: scholarship.deadline ? scholarship.deadline.slice(0, 10) : "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axiosSecure.patch(`/scholarships/${scholarship._id}`, formData);
      alert("Scholarship updated successfully!");
      onUpdate();
    } catch (err) {
      console.error(err);
      alert("Failed to update scholarship");
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 40 }}
          transition={{ duration: 0.25 }}
          className="bg-base-100 p-6 rounded-2xl shadow-2xl w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Edit Scholarship
          </h2>

          <div className="space-y-3">
            <input
              type="text"
              name="scholarshipName"
              value={formData.scholarshipName}
              onChange={handleChange}
              placeholder="Scholarship Name"
              className="input input-bordered w-full bg-base-200 text-neutral"
            />
            <input
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              placeholder="University Name"
              className="input input-bordered w-full bg-base-200 text-neutral"
            />
            <input
              type="text"
              name="universityCountry"
              value={formData.universityCountry}
              onChange={handleChange}
              placeholder="Country"
              className="input input-bordered w-full bg-base-200 text-neutral"
            />
            <input
              type="text"
              name="universityCity"
              value={formData.universityCity}
              onChange={handleChange}
              placeholder="City"
              className="input input-bordered w-full bg-base-200 text-neutral"
            />
            <input
              type="text"
              name="subjectCategory"
              value={formData.subjectCategory}
              onChange={handleChange}
              placeholder="Subject Category"
              className="input input-bordered w-full bg-base-200 text-neutral"
            />
            <select
              name="scholarshipCategory"
              value={formData.scholarshipCategory}
              onChange={handleChange}
              className="select select-bordered w-full bg-base-200 text-neutral"
            >
              <option>Full fund</option>
              <option>Partial</option>
              <option>Self-fund</option>
            </select>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="select select-bordered w-full bg-base-200 text-neutral"
            >
              <option>Bachelor</option>
              <option>Masters</option>
              <option>Diploma</option>
            </select>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 text-neutral"
            />
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={closeModal}
              className="btn btn-sm btn-neutral text-neutral-content"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="btn btn-sm btn-success text-neutral-content"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditScholarshipModal;
