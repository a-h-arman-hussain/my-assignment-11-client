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
          className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg border border-white/20"
        >
          {/* Header */}
          <h2 className="text-3xl font-bold mb-6 text-primary text-center">
            Update Application
          </h2>

          {/* Form Inputs */}
          <div className="space-y-4 text-neutral">
            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
            <InputField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
            <InputField
              label="Previous Education"
              name="previousEducation"
              value={formData.previousEducation}
              onChange={handleChange}
              placeholder="Enter previous education"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={closeModal}
              className="px-4 py-2 rounded-xl bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition  cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded-xl bg-primary text-white font-semibold shadow hover:shadow-lg transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Reusable Input Field
const InputField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="font-semibold block mb-1">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered w-full bg-base-100 text-neutral"
    />
  </div>
);

export default EditMyApplication;
