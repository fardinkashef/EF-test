import Image from "next/image.js";

export default function About() {
  return (
    <div className="">
      <div className="sm:flex">
        <div className="sm:w-1/2">
          <h2>About Test</h2>
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
        <Image
          alt="Image of a person with some emotion"
          fill
          className="hidden sm:block sm:w-1/2"
          src={`/images/about/Paul-Ekman.jpg`}
        />
      </div>
    </div>
  );
}
