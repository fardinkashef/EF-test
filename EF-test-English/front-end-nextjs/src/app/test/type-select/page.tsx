import Link from "next/link";
export default function TestTypeSelect() {
  return (
    <div className="p-2 grow">
      <div className="wrapper sm:flex sm:justify-center sm:gap-[10%] sm:items-stretch">
        <section className="max-w-[250px] my-10 mx-auto p-2 rounded-md bg-cyan-600 text-cyan-50 sm:w-[40%] sm:mx-0 sm:flex sm:flex-col">
          <p className="sm:grow">
            The purpose of the sample test is to familiarize the subject with
            the main test. In the sample test, 6 pictures are shown to the
            subject, and they must choose the option that represents the
            person’s feeling for each picture.
          </p>
          <Link
            href="/test/sample"
            className="block w-fit my-4 mx-auto px-2 py-1 rounded-md text-lg font-semibold bg-cyan-800 text-white border-2 border-solid border-cyan-950  hover:bg-cyan-900"
          >
            Sample Test
          </Link>
        </section>
        <section className="max-w-[250px] my-10 mx-auto p-2 rounded-md bg-cyan-800 text-cyan-50 sm:w-[40%] sm:mx-0 sm:flex sm:flex-col">
          <p className="sm:grow">
            In this test, 60 pictures are shown to the subject, and they must
            choose the option that represents the person’s feeling for each
            picture
          </p>
          <Link
            href="/test/main"
            className="block w-fit my-4 mx-auto px-2 py-1 rounded-md text-lg font-semibold border-2 border-solid border-cyan-950 bg-cyan-600 hover:bg-cyan-700"
          >
            Main Test
          </Link>
        </section>
      </div>
    </div>
  );
}
