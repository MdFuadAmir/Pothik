import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import SectionTitle from "../../Shared/Sectiontitle/SectionTitle";

const RiderApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [districts, setDistrict] = useState([]);
  //   district name
  useEffect(() => {
    fetch("locations.json")
      .then((res) => res.json())
      .then((data) => {
        const uniqueDistricts = [...new Set(data.map((item) => item.district))];
        setDistrict(uniqueDistricts);
      });
  }, []);
  const onSubmit = async (data) => {
    Swal.fire({
      title: "Confirm Submission",
      text: "Are you sure you want to apply for a Rider account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, apply",
    }).then((result) => {
      if (result.isConfirmed) {
        const riderData = {
          ...data,
          name: user?.displayName || "",
          email: user?.email || "",
          status: "panding",
          created_at: new Date().toISOString(),
        };
        console.log("rider application", riderData);
        axiosSecure.post("/riders-application", riderData).then((res) => {
          if (res.data.insertedId) {
            console.log(res.data);
            Swal.fire(
              "Success!",
              "Your seller request has been submitted.",
              "success"
            );
          }
        });
      }
    });
  };
  return (
    <div className="max-w-7xl bg-indigo-50 mx-auto flex flex-col-reverse md:flex-row">
      <div className="mx-auto w-full md:w-1/2 p-6 my-10">
        <SectionTitle
          sectionTitle={"Apply to Work With Us"}
          sectionSubTitle={"Fill out the form to join as a warehouse worker"}
        ></SectionTitle>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                {...register("name")}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                {...register("email")}
                className="input input-bordered w-full bg-gray-100"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block mb-1 font-medium">Age</label>
              <input
                type="number"
                {...register("age", { required: true })}
                placeholder="Enter your age"
                className="input input-bordered w-full"
              />
              {errors.age && (
                <span className="text-red-500">Age is Required</span>
              )}
            </div>

            {/* Contact */}
            <div>
              <label className="block mb-1 font-medium">Contact Number</label>
              <input
                type="tel"
                {...register("contact", { required: true })}
                placeholder="Enter your phone number"
                className="input input-bordered w-full"
              />
              {errors.contact && (
                <span className="text-red-500">Contact is Required</span>
              )}
            </div>

            {/* NID Number */}
            <div>
              <label className="block mb-1 font-medium">NID Number</label>
              <input
                type="text"
                {...register("nid", { required: true })}
                placeholder="Enter your NID"
                className="input input-bordered w-full"
              />
              {errors.nid && (
                <span className="text-red-500">National id is Required</span>
              )}
            </div>

            {/* region Selection */}
            <div>
              <label className="block mb-1 font-medium">Region</label>
              <select
                {...register("region", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="Islam">Islam</option>
                <option value="Hindu">Hindu</option>
                <option value="Kristan">Kristan</option>
                <option value="Boddo">Boddo</option>
                <option value="Nastik">Nastik</option>
                <option value="Other">Other</option>
              </select>
              {errors.region && (
                <span className="text-red-500">Region are Required</span>
              )}
            </div>
            {/* region Selection */}
            <div>
              <label className="block mb-1 font-medium">Vehicle</label>
              <select
                {...register("vehicle", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="Bike">Bike</option>
                <option value="Bicycle">Bicycle</option>
                <option value="Scooter">Scooter</option>
                <option value="Car">Car</option>
              </select>
              {errors.vehicle && (
                <span className="text-red-500">Vehicle are Required</span>
              )}
            </div>
          </div>
          {/* work-house Selection */}
          <div>
            <label className="block mb-1 font-medium">Your Location</label>
            <select
              {...register("workLocation", { required: true })}
              className="select select-bordered w-full"
              defaultValue="Dhaka"
            >
              {districts.map((district, idx) => (
                <option key={idx} value={district}>
                  {district}
                </option>
              ))}
            </select>
            {errors.workLocation && (
              <span className="text-red-500">work location are Required</span>
            )}
          </div>
          {/* Terms */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("agree", { required: true })}
              className="checkbox checkbox-primary"
            />
            <label>I agree to all terms & conditions</label>
          </div>
          {errors.agree && (
            <span className="text-red-500">Aggrument are Required</span>
          )}
          {/* Submit Button */}
          <button type="submit" className="btn bg-indigo-950 text-white w-full">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default RiderApplications;
