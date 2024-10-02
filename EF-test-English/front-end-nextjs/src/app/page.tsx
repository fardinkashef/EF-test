import Image from "next/image";
import hero from "@/assets/icons/mainpage.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grow py-7 px-2 bg-green-200 text-center md:flex md:items-center">
      <div className="mb-[15%] md:w-1/2 md:h-full md:mb-0 md:flex md:flex-col md:items-center md:justify-center md: md: ">
        <h2 className="text-2xl text-green-700 mb-5">
          Welcome to
          {/* <br /> */}
          <span className="text-red-800 block">
            Facial Effect Recognition Test
          </span>
          {/* <br /> */}
        </h2>

        <Link
          href="/test"
          className="bg-yellow-700 text-xl font-bold px-5 py-2 m-4 border-solid border-2 border-yellow-700 rounded cursor-pointer text-gray-300 hover:bg-green-600 hover:border-green-600 "
        >
          Start the Test
        </Link>
      </div>
      <Image
        src={hero}
        alt="hero"
        className="w-full max-w-[700px] rounded md:w-1/2"
      />
    </div>
  );
}
