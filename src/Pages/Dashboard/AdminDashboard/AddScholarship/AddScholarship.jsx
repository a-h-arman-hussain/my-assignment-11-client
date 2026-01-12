import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { imageUpload } from "../../../../utils";
import { motion } from "framer-motion";
import { FiUploadCloud, FiBook, FiCalendar } from "react-icons/fi";

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    universityCountry: "",
    universityCity: "",
    universityWorldRank: "",
    subjectCategory: "",
    scholarshipCategory: "Full fund",
    degree: "Bachelor",
    tuitionFees: "",
    applicationFees: "",
    serviceCharge: "",
    deadline: "",
    postDate: new Date().toISOString().slice(0, 10),
    userEmail: user?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = "";
      if (formData.universityImage) {
        imageUrl = await imageUpload(formData.universityImage);
      }

      const scholarshipData = {
        ...formData,
        universityImage: imageUrl,
        userEmail: user?.email,
      };

      await axiosSecure.post("/add-scholarship", scholarshipData);

      Swal.fire({
        icon: "success",
        title: "Scholarship Published!",
        text: "The new scholarship has been added successfully.",
        confirmButtonColor: "var(--color-primary)",
        customClass: { popup: "rounded-[2rem]" },
      });

      navigate("/dashboard/manage-scholarships");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please check your information and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mb-10"
    >
      <div className="bg-base-100 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-base-300">
        {/* Dashboard Page Header - Add New Scholarship */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-base-200 pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
          >
            {/* ১. সাব-টাইটেল: পালসিং ডট সহ প্রফেশনাল ইন্ডিকেটর */}
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-primary font-black tracking-[0.3em] uppercase text-[10px]">
                Admin Console
              </span>
            </div>

            {/* ২. মেইন টাইটেল: ডাইনামিক বেস-কন্টেন্ট ব্যবহার করা হয়েছে */}
            <h1 className="text-3xl md:text-5xl font-black text-base-content uppercase tracking-tighter leading-none">
              Add New <span className="text-primary">Scholarship</span>
            </h1>

            {/* ৩. ডেসক্রিপশন: থিম ফ্রেন্ডলি অপাসিটি */}
            <p className="text-[10px] md:text-xs font-bold opacity-40 uppercase tracking-[0.2em] mt-3">
              Fill in the details below to publish a new global opportunity
            </p>
          </motion.div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-10 max-w-5xl mx-auto">
          {/* Section: Basic Info Card */}
          <div className="bg-base-100 p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-base-200 space-y-8">
            <div className="flex items-center gap-3 border-b border-base-200 pb-4">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                <FiBook size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-base-content uppercase tracking-tighter">
                  Scholarship Details
                </h2>
                <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">
                  General and Location Info
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormGroup label="Scholarship Name">
                <input
                  name="scholarshipName"
                  placeholder="e.g. Global Excellence Award"
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary h-14"
                  required
                />
              </FormGroup>
              <FormGroup label="University Name">
                <input
                  name="universityName"
                  placeholder="e.g. Oxford University"
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary h-14"
                  required
                />
              </FormGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormGroup label="University City">
                <input
                  name="universityCity"
                  placeholder="City"
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary h-14"
                  required
                />
              </FormGroup>
              <FormGroup label="Country">
                <input
                  name="universityCountry"
                  placeholder="Country"
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary h-14"
                  required
                />
              </FormGroup>
              <FormGroup label="World Rank">
                <input
                  type="number"
                  name="universityWorldRank"
                  placeholder="Rank"
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary h-14"
                  required
                />
              </FormGroup>
            </div>
          </div>

          {/* Section: Financials & Upload */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Dynamic Image Upload Box */}
            <div className="lg:col-span-1 bg-base-200/50 rounded-[2.5rem] border-2 border-dashed border-base-300 flex flex-col items-center justify-center p-8 group hover:border-primary/50 transition-all">
              <label className="cursor-pointer text-center">
                <FiUploadCloud className="mx-auto text-5xl text-primary mb-4 group-hover:scale-110 transition-transform" />
                <span className="block font-black uppercase tracking-widest text-[10px] text-base-content/60">
                  Cover Image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      universityImage: e.target.files[0],
                    })
                  }
                  className="hidden"
                />
                {formData.universityImage && (
                  <p className="mt-3 text-[10px] text-success font-black truncate max-w-[150px] mx-auto">
                    {formData.universityImage.name}
                  </p>
                )}
              </label>
            </div>

            {/* Financials Box */}
            <div className="lg:col-span-2 bg-base-100 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-base-200 grid md:grid-cols-2 gap-6">
              <FormGroup label="Category">
                <select
                  name="scholarshipCategory"
                  onChange={handleChange}
                  className="select select-bordered w-full rounded-2xl font-bold focus:select-primary h-14"
                >
                  <option>Full fund</option>
                  <option>Partial</option>
                  <option>Self-fund</option>
                </select>
              </FormGroup>
              <FormGroup label="Degree">
                <select
                  name="degree"
                  onChange={handleChange}
                  className="select select-bordered w-full rounded-2xl font-bold focus:select-primary h-14"
                >
                  <option>Bachelor</option>
                  <option>Masters</option>
                  <option>Diploma</option>
                </select>
              </FormGroup>
              <FormGroup label="App Fee ($)">
                <input
                  type="number"
                  name="applicationFees"
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary h-14"
                  required
                />
              </FormGroup>
              <FormGroup label="Service Charge ($)">
                <input
                  type="number"
                  name="serviceCharge"
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold focus:input-primary h-14"
                  required
                />
              </FormGroup>
            </div>
          </div>

          {/* Section: Deadlines with Neutral-Content Theme */}
          <div className="bg-neutral p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <FiCalendar className="text-primary" size={24} />
              <h2 className="text-xl font-black uppercase tracking-tighter text-neutral-content">
                Important Deadlines
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <FormGroup label="Application Deadline">
                <input
                  type="date"
                  name="deadline"
                  onChange={handleChange}
                  className="input input-bordered w-full rounded-2xl font-bold bg-neutral-focus border-neutral-content/10 text-neutral focus:input-primary h-14"
                  required
                />
              </FormGroup>
              <FormGroup label="System Post Date">
                <input
                  type="date"
                  name="postDate"
                  value={formData.postDate}
                  readOnly
                  className="input input-bordered w-full rounded-2xl font-bold bg-neutral-focus/30 border-neutral-content/5 text-neutral h-14"
                />
              </FormGroup>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full h-20 rounded-[2rem] text-xl font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Confirm & Publish"
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

// Internal Helper Components
const FormGroup = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[11px] font-black uppercase tracking-[0.1em] ml-2 text-white">
      {label}
    </label>
    {children}
  </div>
);

export default AddScholarship;
