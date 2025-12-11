import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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
    try {
      await axiosSecure.post("/add-scholarship", formData);
      Swal.fire({
        icon: "success",
        title: "Scholarship Added!",
        text: "Your scholarship has been added successfully.",
      });
      navigate("/all-scholarships");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add scholarship. Try again.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Add Scholarship</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Scholarship Name</label>
          <input
            name="scholarshipName"
            value={formData.scholarshipName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">University Name</label>
          <input
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">University Image URL</label>
          <input
            name="universityImage"
            value={formData.universityImage}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Country</label>
            <input
              name="universityCountry"
              value={formData.universityCountry}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="font-semibold">City</label>
            <input
              name="universityCity"
              value={formData.universityCity}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">World Rank</label>
            <input
              type="number"
              name="universityWorldRank"
              value={formData.universityWorldRank}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-semibold">Subject Category</label>
            <input
              name="subjectCategory"
              value={formData.subjectCategory}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Scholarship Category</label>
            <select
              name="scholarshipCategory"
              value={formData.scholarshipCategory}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Full fund</option>
              <option>Partial</option>
              <option>Self-fund</option>
            </select>
          </div>
          <div>
            <label className="font-semibold">Degree</label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Bachelor</option>
              <option>Masters</option>
              <option>Diploma</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="font-semibold">Tuition Fees (Optional)</label>
            <input
              type="number"
              name="tuitionFees"
              value={formData.tuitionFees}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-semibold">Application Fees</label>
            <input
              type="number"
              name="applicationFees"
              value={formData.applicationFees}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="font-semibold">Service Charge</label>
            <input
              type="number"
              name="serviceCharge"
              value={formData.serviceCharge}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="font-semibold">Post Date</label>
            <input
              type="date"
              name="postDate"
              value={formData.postDate}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-4">
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
