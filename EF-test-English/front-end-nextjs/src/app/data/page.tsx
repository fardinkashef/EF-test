"use client";
import { useDataContext } from "@/lib/contexts/DataContext";

export default function Data() {
  //ToDo: Keep this component a server component. Get all the data and pass it down to DataList component. In DataList, define a state variable called "wholeData" and use the fetched data as its initial value. So first of all, create DataList component.
  const { data, isLoading } = useDataContext();
  console.log("isLoading", isLoading);
  console.log("data", data);

  return <div>data page </div>;
}
