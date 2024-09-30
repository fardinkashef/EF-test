import Link from "next/link";
export default function TestTypeSelect() {
  return (
    <div className="bg-green-200 p-2 grow">
      <div className="wrapper sm:flex sm:justify-around sm:items-stretch">
        <section className="max-w-[300px] my-10 mx-auto p-2 rounded-md bg-blue-300 text-blue-900 sm:w-[40%] sm:flex sm:flex-col">
          <p className="sm:grow">
            The purpose of the sample test is to familiarize the user with the
            main test. In the sample test, 6 pictures are shown to the subject,
            and they must choose the option that represents the person’s feeling
            for each picture.
          </p>
          <Link
            href="/test/sample"
            className="block w-fit my-4 mx-auto p-1 rounded text-lg font-semibold border-2 border-solid border-green-800 bg-green-300 text-yellow-700 hover:bg-green-700 hover:text-white"
          >
            ُStart Sample Test
          </Link>
        </section>
        <section className="max-w-[300px] my-10 mx-auto p-2 rounded-md bg-blue-600 text-gray-300 sm:w-[40%] sm:flex sm:flex-col">
          <p className="sm:grow">
            In this test, 60 pictures are shown to the subject, and they must
            choose the option that represents the person’s feeling for each
            picture
          </p>
          <Link
            href="/test/main"
            className="block w-fit my-4 mx-auto p-1 rounded text-lg font-semibold border-2 border-solid border-green-800 bg-green-300 hover:bg-green-700 hover:text-white"
          >
            ُStart Main Test
          </Link>
        </section>
      </div>
    </div>
  );
}
