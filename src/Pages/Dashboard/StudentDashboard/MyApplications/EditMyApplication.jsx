import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EditMyApplication = ({ application, closeModal, onUpdate }) => {
  const [formData, setFormData] = useState({
    phone: application.phone || "",
    address: application.address || "",
    previousEducation: application.previousEducation || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdate(application._id, formData);
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
          className="bg-black p-6 rounded-2xl shadow-2xl w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Update Application</h2>

          <div className="space-y-3">
            <div>
              <label className="font-semibold">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="font-semibold">Previous Education</label>
              <input
                name="previousEducation"
                value={formData.previousEducation}
                onChange={handleChange}
                className="input input-bordered w-full mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <button onClick={closeModal} className="btn btn-sm">
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn btn-sm btn-success">
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditMyApplication;
