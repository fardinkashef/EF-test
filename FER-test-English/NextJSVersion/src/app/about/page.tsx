import Image from "next/image.js";
import ekmanImage from "../../../public/images/about/Paul-Ekman.jpg";
import logo from "@/assets/icons/logo.svg";

export default function About() {
  return (
    <div className="">
      <section className="pt-12 px-4 sm:flex justify-center items-center lg:gap-20 xl:gap-28 mb-16">
        <div className="max-w-96 px-4 mx-auto sm:mx-0">
          <h2 className="text-2xl mb-3 text-slate-900 ">About Test</h2>
          <p>
            The Ekman-Friesen Facial Affect Recognition Test, also known as the
            Pictures of Facial Affect (POFA), is a psychological tool developed
            by Paul Ekman and Wallace V. Friesen in 1976. It consists of 110
            black-and-white photographs depicting actors expressing six basic
            emotions—happiness, sadness, anger, fear, disgust, and
            surprise—along with neutral expressions. This test is widely used in
            research to assess how well individuals can recognize and
            differentiate these emotions from facial expressions, making it
            valuable in fields like developmental psychology, social cognition,
            and clinical assessments of emotional recognition abilities.
          </p>
        </div>
        <div className="hidden w-full max-w-72 sm:block">
          <Image
            alt="Image of a person with some emotion"
            className="w-full aspect-square "
            src={ekmanImage}
          />
          <p className="mt-2 text-lg text-center">Paul Ekman</p>
        </div>
      </section>
      <section className="pt-12 px-4 sm:flex justify-center items-center lg:gap-20 xl:gap-28 mb-16">
        <div className="max-w-96 px-4 mx-auto sm:mx-0">
          <h2 className="text-2xl mb-3 text-slate-900 ">About Us</h2>
          <p className="">
            We created this web app to streamline the administration of the
            Ekman-Friesen Facial Affect Recognition Test for psychology
            students. By utilizing this app, students can easily conduct the
            test, as it efficiently gathers participants’ responses, analyzes
            the results, and stores the data in a database. This tool not only
            simplifies the testing process but also enhances the accuracy and
            accessibility of emotional recognition assessments in educational
            and research settings.
          </p>
        </div>
        <div className="hidden w-full max-w-72 sm:block bg-slate-800">
          <Image
            alt="Image of a person with some emotion"
            className="w-full aspect-square"
            src={logo}
          />
        </div>
      </section>
    </div>
  );
}
