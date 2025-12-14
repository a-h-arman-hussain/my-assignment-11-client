import React, { useState } from "react";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import { imageUpload } from "../../../../utils";

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // //  Get image file correctly
  // const imageFile = data.photo[0];

  // //  Upload to imgBB
  // const universityImage = imageUpload(imageFile);

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axiosSecure.post("/add-scholarship", formData);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Scholarship Added!",
  //       text: "Your scholarship has been added successfully.",
  //       background: "var(--color-base-100)",
  //       color: "var(--color-neutral)",
  //       confirmButtonColor: "var(--color-primary)",
  //     });
  //     navigate("/all-scholarships");
  //   } catch (err) {
  //     console.error(err);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Failed to add scholarship. Try again.",
  //       background: "var(--color-base-100)",
  //       color: "var(--color-neutral)",
  //       confirmButtonColor: "var(--color-error)",
  //     });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        title: "Scholarship Added!",
      });

      navigate("/all-scholarships");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed to add scholarship",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg shadow-lg bg-base-100 border border-base-300 mt-6">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">
        Add Scholarship
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold text-neutral">Scholarship Name</label>
          <input
            name="scholarshipName"
            value={formData.scholarshipName}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
            required
          />
        </div>

        <div>
          <label className="font-semibold text-neutral">University Name</label>
          <input
            name="universityName"
            value={formData.universityName}
            onChange={handleChange}
            className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
            required
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold text-neutral">
              University Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, universityImage: e.target.files[0] })
              }
              className="file-input input-bordered w-full"
            />
          </div>
          <div>
            <label className="font-semibold text-neutral">Country</label>
            <input
              name="universityCountry"
              value={formData.universityCountry}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-neutral">City</label>
            <input
              name="universityCity"
              value={formData.universityCity}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-neutral">World Rank</label>
            <input
              type="number"
              name="universityWorldRank"
              value={formData.universityWorldRank}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
            />
          </div>
          <div>
            <label className="font-semibold text-neutral">
              Subject Category
            </label>
            <input
              name="subjectCategory"
              value={formData.subjectCategory}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-neutral">
              Scholarship Category
            </label>
            <select
              name="scholarshipCategory"
              value={formData.scholarshipCategory}
              onChange={handleChange}
              className="select select-bordered w-full bg-base-200 border-base-300 text-neutral"
            >
              <option>Full fund</option>
              <option>Partial</option>
              <option>Self-fund</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-neutral">Degree</label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="select select-bordered w-full bg-base-200 border-base-300 text-neutral"
            >
              <option>Bachelor</option>
              <option>Masters</option>
              <option>Diploma</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="font-semibold text-neutral">
              Tuition Fees (Optional)
            </label>
            <input
              type="number"
              name="tuitionFees"
              value={formData.tuitionFees}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
            />
          </div>
          <div>
            <label className="font-semibold text-neutral">
              Application Fees
            </label>
            <input
              type="number"
              name="applicationFees"
              value={formData.applicationFees}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-neutral">Service Charge</label>
            <input
              type="number"
              name="serviceCharge"
              value={formData.serviceCharge}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-neutral">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-neutral">Post Date</label>
            <input
              type="date"
              name="postDate"
              value={formData.postDate}
              className="input input-bordered w-full bg-base-200 border-base-300 text-neutral"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn w-full bg-primary hover:bg-primary/90 text-base-100 mt-4"
        >
          Add Scholarship
        </button>
      </form>
    </div>
  );
};

export default AddScholarship;
