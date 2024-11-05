import Image from "next/image";
import hero from "@/assets/icons/mainpage.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grow py-7 px-2 text-center lg:flex lg:items-center">
      <div className="flex flex-col justify-center items-center gap-4 my-[10%] lg:my-0 lg:w-1/2 lg:h-full">
        <h2 className="text-3xl text-cyan-700 mb-5 leading-[3rem]">
          Welcome to
          <span className="block text-cyan-950 font-bold">
            Facial Effect Recognition Test
          </span>
        </h2>

        <Link
          href="/test"
          className="bg-green-700 text-xl font-bold px-5 py-3 m-4 rounded-md cursor-pointer text-gray-300 hover:bg-green-800"
        >
          Start the Test
        </Link>
      </div>
      <Image
        src={hero}
        alt="hero"
        className="w-full max-w-[700px] mx-auto rounded lg:w-1/2"
      />
    </div>
  );
}
