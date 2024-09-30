import { redirect } from "next/navigation";

export default function Test() {
  redirect("/test/profile");
  return <></>;
}
