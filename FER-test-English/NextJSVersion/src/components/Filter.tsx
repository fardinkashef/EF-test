"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Handlers 👇:
  const handleGenderChange = (gender: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (gender === "both") params.delete("gender");
    else params.set("gender", gender);
    replace(`${pathname}?${params.toString()}`);
  };
  const handleMinAgeChange = (minAge: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (minAge) {
      params.set("minAge", minAge);
    } else {
      params.delete("minAge");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const handleMaxAgeChange = (maxAge: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (maxAge) {
      params.set("maxAge", maxAge);
    } else {
      params.delete("maxAge");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const handleNameChange = useDebouncedCallback((name: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (name) {
      params.set("name", name);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  // Handlers 👆

  return (
    <form className="bg-slate-200 pt-4 pb-8 flex justify-center flex-wrap gap-12">
      <div>
        <label
          className="block text-center text-lg text-slate-700 font-semibold mb-1"
          htmlFor="gender"
        >
          Gender
        </label>
        <select
          name="gender"
          className="p-[2px]"
          id="gender"
          defaultValue={searchParams.get("gender")?.toString()}
          onChange={(e) => handleGenderChange(e.target.value)}
        >
          {["both", "male", "female"].map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <fieldset>
        <legend className="text-lg text-center text-slate-700 font-semibold mb-1">
          Age range
        </legend>
        <div className="flex gap-2">
          <span>from</span>
          <input
            type="number"
            id="min-age"
            className="w-14 px-1 rounded"
            defaultValue={searchParams.get("minAge")?.toString()}
            onChange={(e) => handleMinAgeChange(e.target.value)}
          />
          <span>to</span>
          <input
            type="number"
            id="max-age"
            className="w-14 px-1 rounded"
            defaultValue={searchParams.get("maxAge")?.toString()}
            onChange={(e) => handleMaxAgeChange(e.target.value)}
          />
          <span>years old</span>
        </div>
      </fieldset>
      <div>
        <label
          className="block text-lg text-center text-slate-700 font-semibold mb-1"
          htmlFor="nameFilter"
        >
          {"Subject's name"}
        </label>
        <input
          type="search"
          id="nameFilter"
          className="px-1 py-[2px] text-base rounded"
          defaultValue={searchParams.get("name")?.toString()}
          onChange={(e) => handleNameChange(e.target.value)}
        />
      </div>
    </form>
  );
}
