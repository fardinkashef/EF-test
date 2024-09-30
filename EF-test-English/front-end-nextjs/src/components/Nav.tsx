"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, useState } from "react";

const tabs = [
  { title: "Home", href: "/" },
  { title: "Test", href: "/test" },
  { title: "About-Test", href: "/about-test" },
  { title: "About-Us", href: "/about-us" },
  { title: "Data", href: "/data" },
];

export default function NavBar() {
  const [showNav, setShowNav] = useState(false);

  const toggleShowNav = () => setShowNav((previousShowNav) => !previousShowNav);

  return (
    <div className="bg-green-300 flex justify-between items-center relative h-[70px] px-12 py-1">
      <Link
        href="/"
        className="bg-logo w-16 h-16 bg-contain bg-no-repeat border-none"
        onClick={() => setShowNav(false)}
      />
      <nav
        className={`absolute top-full left-0 w-full z-10 ${
          showNav ? "" : "hidden"
        } sm:block sm:static sm:w-fit`}
      >
        <ul className="bg-green-300 text-center sm:flex sm:justify-start sm:items-center  ">
          {tabs.map(({ title, href }) => (
            <li
              key={title}
              className="w-full cursor-pointer text-lg hover:bg-slate-200 sm:hover:bg-inherit sm:w-fit sm:ml-8 "
            >
              <NavLink href={href} onClick={() => setShowNav(false)}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="bg-menu w-12 h-12 bg-cover bg-no-repeat  bg-lime-700 border-solid border-2 border-green-950 rounded-sm hover:bg-green-600 sm:hidden"
        onClick={toggleShowNav}
      />
    </div>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "block py-1 px-0 sm:hover:text-red-600  border-b-4 border-solid border-transparent ",
        pathname === props.href &&
          "bg-cyan-300 sm:bg-inherit  sm:text-blue-700  border-blue-700 sm:hover:border-red-600"
      )}
    />
  );
}
export function TestStep(
  props: Omit<ComponentProps<typeof Link>, "className">
) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "block text-center h-[40px] leading-[45px] relative after:z-40 after:content-[''] after:bg-inherit after:block after:w-[40px] after:h-full after:absolute after:top-0 after:right-[-20px] after:rounded-full after:border-r-solid after:border-r-[5px] after:border-r-white bg-cyan-800 text-white hover:bg-blue-600 ",
        pathname === props.href && "bg-green-700"
      )}
    />
  );
}