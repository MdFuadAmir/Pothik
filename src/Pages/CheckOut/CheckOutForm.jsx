/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const CheckOutForm = ({ setMethods }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser } = useQuery({
  queryKey: ["dbUser"],
  queryFn: async () => {
    const { data } = await axiosSecure.get(`/users/${user.email}`);
    return data;
  },
});

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      email: user?.email || "",
    },
  });
  const {
    register,
    formState: { errors },
  } = methods;
  useEffect(() => {
    setMethods(methods);
  }, [methods.formState]);

  return (
    <div className="space-y-2 p-4 md:p-6 rounded">
      {/* First Name */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-md dark:text-white">First Name</label>
        <input
          type="text"
          placeholder="full name.."
          {...register("fullName", { required: true })}
          className="input w-full"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">name required</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-md dark:text-white">Email</label>
        <input
          type="email"
          {...register("email")}
          readOnly
          className="border w-full p-2 rounded bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
        {/* Street */}
        <div>
          <label className="text-sm font-md dark:text-white">Street</label>
          <input
            type="text"
            placeholder="street.."
            {...register("street", { required: true })}
            className="input"
          />
          {errors.street && (
            <p className="text-red-500 text-sm">Street is required</p>
          )}
        </div>
        {/* City */}
        <div>
          <label className="text-sm font-md dark:text-white">City</label>
          <input
            type="text"
            placeholder="city.."
            {...register("city", { required: true })}
            className="input"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">City is required</p>
          )}
        </div>
        {/* Zip Code */}
        <div>
          <label className="text-sm font-md dark:text-white">Zip Code</label>
          <input
            type="number"
            placeholder="zip code.."
            {...register("zipCode", { required: true })}
            className="input"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm">Zip Code is required</p>
          )}
        </div>
        {/* Phone */}
        <div>
          <label className="text-sm font-md dark:text-white">Phone Number</label>
          <input
            type="tel"
            defaultValue={dbUser?.phone}
            {...register("phone")}
            className="input"
          />
        </div>
      </div>

      {/* Full Address */}
      <div className="flex flex-col">
        <label className="text-sm font-md dark:text-white">Full Address</label>
        <input
          type="text"
          defaultValue={dbUser?.address}
          {...register("fullAddress")}
          className="input w-full"
        ></input>
      </div>
    </div>
  );
};

export default CheckOutForm;


