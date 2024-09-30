import Image from "next/image";
import hero from "@/assets/icons/mainpage.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="MainPage">
      <div className="welcome">
        <h2>
          Welcome to
          {/* <br /> */}
          <span> Facial Effect Recognition Test</span>
          {/* <br /> */}
        </h2>

        <Link href="/test"> Start the Test </Link>
      </div>
      <Image src={hero} alt="hero" />
    </div>
  );
}
