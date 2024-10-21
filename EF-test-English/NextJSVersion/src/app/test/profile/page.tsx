"use client";

import { useSubjectContext } from "@/lib/contexts/SubjectContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be 2 or more characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be 2 or more characters long" }),
  age: z
    .string()
    .length(2, { message: "Age must be exactly 2 characters long" }),
  gender: z.enum(["male", "female"], {
    message: "Please select one of the options",
  }),
  groupCode: z.string(),
  caseCode: z.string(),
});

type FormFields = z.infer<typeof schema>;

export default function Profile() {
  const { profile, setProfile } = useSubjectContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: profile,
    resolver: zodResolver(schema),
  });
  // Handlers 👇:
  const submit: SubmitHandler<FormFields> = async (data) => {
    setProfile(data);
    router.push("/test/type-select");
  };
  // Handlers 👆

  return (
    <section className="grow text-blue-900 p-5 flex flex-col justify-start items-center gap-5 h-full">
      <legend className="text-center text-xl font-semibold">
        ُSubject Info
      </legend>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex justify-evenly gap-5 flex-wrap ">
          <div className="w-full max-w-[250px] ">
            <label htmlFor="firstName" className="block py-0 px-2">
              First Name
            </label>
            <input
              className="w-full py-1 px-2 rounded"
              type="text"
              {...register("firstName")}
              id="firstName"
            />
            {errors.firstName && (
              <div className="text-red-500">{errors.firstName.message}</div>
            )}
          </div>
          <div className="w-full max-w-[250px] ">
            <label htmlFor="lastName" className="block py-0 px-2">
              Last Name
            </label>
            <input
              className="w-full py-1 px-2 rounded"
              type="text"
              {...register("lastName")}
              id="lastName"
            />
            {errors.lastName && (
              <div className="text-red-500">{errors.lastName.message}</div>
            )}
          </div>
          <div className="w-full max-w-[250px] ">
            <label htmlFor="age" className="block py-0 px-2">
              Age
            </label>
            <input
              className="w-full py-1 px-2 rounded"
              type="text"
              {...register("age")}
              id="age"
            />
            {errors.age && (
              <div className="text-red-500">{errors.age.message}</div>
            )}
          </div>
          <div className="w-full max-w-[250px]  ">
            <fieldset className="border-none">
              <legend>Gender</legend>

              <div className="inline my-0 mx-5">
                <label htmlFor="man" className="inline py-0 px-2">
                  male
                </label>
                <input
                  className="py-1 px-2 rounded"
                  type="radio"
                  {...register("gender")}
                  id="man"
                  value="male"
                />
              </div>

              <div className="inline my-0 mx-5">
                <label htmlFor="woman" className="inline py-0 px-2">
                  female
                </label>
                <input
                  className="py-1 px-2 rounded"
                  type="radio"
                  {...register("gender")}
                  id="woman"
                  value="female"
                />
              </div>
            </fieldset>
            {errors.gender && (
              <div className="text-red-500">{errors.gender.message}</div>
            )}
          </div>
          <div className="w-full max-w-[250px] ">
            <label htmlFor="groupCode" className="block py-0 px-2">
              Group Code
            </label>
            <input
              className="w-full py-1 px-2 rounded"
              type="text"
              {...register("groupCode")}
              id="groupCode"
            />
            {errors.groupCode && (
              <div className="text-red-500">{errors.groupCode.message}</div>
            )}
          </div>
          <div className="w-full max-w-[250px] ">
            <label htmlFor="caseCode" className="block py-0 px-2">
              Subject Code
            </label>
            <input
              className="w-full py-1 px-2 rounded"
              type="text"
              {...register("caseCode")}
              id="caseCode"
            />
            {errors.caseCode && (
              <div className="text-red-500">{errors.caseCode.message}</div>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="block w-36 text-white bg-blue-700 text-center mx-auto mt-8 p-2 rounded-md hover:bg-blue-800"
        >
          {isSubmitting ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </section>
  );
}
