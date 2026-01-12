import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPhone,
  FiMapPin,
  FiBookOpen,
  FiX,
  FiCheckCircle,
} from "react-icons/fi";

const EditMyApplication = ({ application, closeModal, onUpdate }) => {
  const [formData, setFormData] = useState({
    phone: application.phone || "",
    address: application.address || "",
    previousEducation: application.previousEducation || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(application._id, formData);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 flex items-center justify-center z-[100] px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="absolute inset-0 bg-neutral/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-base-100 rounded-[2.5rem] shadow-2xl w-full max-w-2xl relative overflow-hidden border border-base-300"
        >
          {/* Edit Application Modal Header */}
          <div className="bg-primary/5 p-6 md:p-8 border-b border-base-200 flex justify-between items-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              {/* ১. সাব-টাইটেল ইন্ডিকেটর */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
                  Update Mode
                </span>
              </div>

              {/* ২. মেইন টাইটেল - Standardized Typography */}
              <h2 className="text-2xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none">
                Edit <span className="text-primary">Application</span>
              </h2>

              {/* ৩. ডেসক্রিপশন */}
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-2 ml-1">
                Update your contact & professional info
              </p>
            </motion.div>

            {/* ৪. ইউনিফাইড ক্লোজ বাটন - (হুবহু সেম এনিমেশন) */}
            <button
              onClick={closeModal}
              className="group p-3 hover:bg-error/10 text-base-content/30 hover:text-error rounded-2xl transition-all duration-300 border border-transparent hover:border-error/20"
              title="Close Modal"
            >
              <FiX
                size={24}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <InputField
              icon={<FiPhone />}
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +880123456789"
            />

            <InputField
              icon={<FiMapPin />}
              label="Current Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. Road 12, Dhaka"
            />

            <InputField
              icon={<FiBookOpen />}
              label="Previous Education"
              name="previousEducation"
              value={formData.previousEducation}
              onChange={handleChange}
              placeholder="e.g. HSC / Bachelor"
            />

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                type="button"
                onClick={closeModal}
                className="flex-1 px-6 py-4 rounded-2xl bg-base-200 text-neutral font-black uppercase text-xs tracking-widest hover:bg-base-300 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-4 rounded-2xl bg-primary text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FiCheckCircle size={18} /> Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Reusable Input Field (Global Style)
const InputField = ({ label, name, value, onChange, placeholder, icon }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase tracking-widest ml-3 text-neutral/40">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary opacity-50 group-focus-within:opacity-100 transition-opacity">
        {icon}
      </div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full pl-11 pr-4 py-4 bg-base-200 border-none rounded-2xl text-sm font-bold text-white focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:font-medium placeholder:opacity-30"
      />
    </div>
  </div>
);

export default EditMyApplication;
