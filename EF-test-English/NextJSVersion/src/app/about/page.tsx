import Image from "next/image.js";
import ekmanImage from "../../../public/images/about/Paul-Ekman.jpg";

export default function About() {
  return (
    <div className="">
      <section className="pt-12 px-4 sm:flex justify-center items-center lg:gap-20 xl:gap-28">
        <div className="max-w-96 px-4 mx-auto sm:mx-0">
          <h2>About Test</h2>
          <p className="">
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
        </div>
      </section>
    </div>
  );
}
