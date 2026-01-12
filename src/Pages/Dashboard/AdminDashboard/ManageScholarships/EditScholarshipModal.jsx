import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FiX, FiSave, FiEdit3 } from "react-icons/fi";

const EditScholarshipModal = ({ scholarship, closeModal, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const [isUpdating, setIsUpdating] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axiosSecure.patch(`/scholarships/${scholarship._id}`, formData);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Scholarship info updated.",
        timer: 2000,
        showConfirmButton: false,
        customClass: { popup: "rounded-[2rem]" },
      });

      onUpdate();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Update Failed" });
    } finally {
      setIsUpdating(false);
    }
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

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-base-100 rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden relative border border-base-300"
        >
          {/* Edit Header Section */}
          <div className="bg-base-200/50 p-6 md:p-8 border-b border-base-300 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-1"
            >
              {/* ১. সাব-টাইটেল ইন্ডিকেটর */}
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px] md:text-[10px]">
                  Modification Mode
                </span>
              </div>

              {/* ২. মেইন টাইটেল - Standardized Typography */}
              <h2 className="text-2xl md:text-3xl font-black text-base-content uppercase tracking-tighter leading-none">
                Edit <span className="text-primary">Scholarship</span>
              </h2>

              {/* ৩. ডেসক্রিপশন */}
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-2 ml-1">
                Update opportunity details and sync changes
              </p>
            </motion.div>

            {/* ৪. ক্লোজ বাটন - Enhanced Interactive Look */}
            <button
              onClick={closeModal}
              className="group p-3 hover:bg-error/10 text-base-content/40 hover:text-error rounded-2xl transition-all duration-300 border border-transparent hover:border-error/20"
              title="Close Modal"
            >
              <FiX
                size={24}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </div>

          {/* Form Content */}
          <form
            onSubmit={handleSubmit}
            className="p-4 md:p-8 max-h-[75vh] overflow-y-auto custom-scrollbar space-y-8 bg-base-100"
          >
            {/* Header inside Form (Optional but looks pro) */}
            <div className="border-b border-base-200 pb-4 mb-6">
              <h3 className="text-xl font-black text-base-content uppercase tracking-tighter flex items-center gap-2">
                <FiEdit3 className="text-primary" /> Update{" "}
                <span className="text-primary">Scholarship</span>
              </h3>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
                Modified details will be synced instantly
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <FormGroup label="Scholarship Name">
                <input
                  name="scholarshipName"
                  value={formData.scholarshipName}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary bg-base-200/30 border-base-300 h-12"
                  required
                />
              </FormGroup>

              <FormGroup label="University Name">
                <input
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary bg-base-200/30 border-base-300 h-12"
                  required
                />
              </FormGroup>

              <FormGroup label="Country">
                <input
                  name="universityCountry"
                  value={formData.universityCountry}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary bg-base-200/30 border-base-300 h-12"
                  required
                />
              </FormGroup>

              <FormGroup label="City">
                <input
                  name="universityCity"
                  value={formData.universityCity}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary bg-base-200/30 border-base-300 h-12"
                  required
                />
              </FormGroup>

              <FormGroup label="Subject Category">
                <input
                  name="subjectCategory"
                  value={formData.subjectCategory}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary bg-base-200/30 border-base-300 h-12"
                  required
                />
              </FormGroup>

              <FormGroup label="Deadline">
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary bg-base-200/30 border-base-300 h-12"
                  required
                />
              </FormGroup>

              <FormGroup label="Category">
                <select
                  name="scholarshipCategory"
                  value={formData.scholarshipCategory}
                  onChange={handleChange}
                  className="select select-bordered w-full rounded-2xl font-bold focus:select-primary bg-base-200/30 border-base-300 h-12"
                >
                  <option>Full fund</option>
                  <option>Partial</option>
                  <option>Self-fund</option>
                </select>
              </FormGroup>

              <FormGroup label="Degree">
                <select
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="select select-bordered w-full rounded-2xl font-bold focus:select-primary bg-base-200/30 border-base-300 h-12"
                >
                  <option>Bachelor</option>
                  <option>Masters</option>
                  <option>Diploma</option>
                </select>
              </FormGroup>
            </div>

            {/* Actions - Stays at bottom */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-6 border-t border-base-200">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-ghost flex-1 rounded-2xl font-black uppercase tracking-widest text-xs border border-base-300"
              >
                Discard changes
              </button>
              <button
                type="submit"
                disabled={isUpdating}
                className="btn btn-primary flex-1 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
              >
                {isUpdating ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <>
                    <FiSave className="text-lg" /> Update Scholarship
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Internal Helper
const FormGroup = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase tracking-widest ml-2 text-neutral/40">
      {label}
    </label>
    {children}
  </div>
);

export default EditScholarshipModal;
