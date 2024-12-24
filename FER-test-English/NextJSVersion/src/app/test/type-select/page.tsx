import Link from "next/link";
import { CircleCheckBig } from "lucide-react";

export default function TestTypeSelect() {
  return (
    <div className="p-2 grow">
      <div className="wrapper sm:flex sm:justify-center sm:gap-[10%] sm:items-stretch">
        <section className="max-w-[250px] my-10 mx-auto p-2 rounded border-solid border-t-8 border-blue-500 bg-slate-100 text-slate-700 shadow-lg sm:w-[40%] sm:mx-0 sm:flex sm:flex-col">
          <h2 className="mt-6 mb-4 text-2xl">Sample Test</h2>
          <ul className="flex flex-col gap-4 sm:grow mb-8">
            <li className="flex items-start gap-2">
              <CircleCheckBig size={20} /> <span>Includes 6 pictures</span>
            </li>
            <li className="flex items-start gap-2">
              <span>
                <CircleCheckBig size={20} />
              </span>
              <span>To familiarize the subject with the main test</span>
            </li>
            <li className="flex items-start gap-2">
              <span>
                <CircleCheckBig size={20} />
              </span>
              <span>
                Choose the option that represents the person’s feeling for each
                picture
              </span>
            </li>
          </ul>
          {/* <p className="sm:grow mb-8">
            The purpose of the sample test is to familiarize the subject with
            the main test. In the sample test, 6 pictures are shown to the
            subject, and they must choose the option that represents the
            person’s feeling for each picture.
          </p> */}
          <Link
            href="/test/sample"
            className="block w-full text-center my-4 mx-auto px-2 py-1 rounded-md text-lg font-semibold bg-cyan-800 text-white border-2 border-solid border-cyan-950  hover:bg-cyan-900"
          >
            Start
          </Link>
        </section>
        <section className="max-w-[250px] my-10 mx-auto p-2 rounded border-solid border-t-8 border-blue-500 bg-slate-100 text-slate-700 shadow-lg sm:w-[40%] sm:mx-0 sm:flex sm:flex-col">
          <h2 className="mt-6 mb-4 text-2xl">Main Test</h2>
          <ul className="flex flex-col gap-4 sm:grow mb-8">
            <li className="flex items-start gap-2">
              <CircleCheckBig size={20} /> <span>Includes 60 pictures</span>
            </li>
            <li className="flex items-start gap-2">
              <span>
                <CircleCheckBig size={20} />
              </span>
              <span>
                To assess subject&apos;s facial effect recognition ability
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>
                <CircleCheckBig size={20} />
              </span>
              <span>
                Choose the option that represents the person’s feeling for each
                picture
              </span>
            </li>
          </ul>

          <Link
            href="/test/main"
            className="block w-full text-center my-4 mx-auto px-2 py-1 rounded-md text-lg font-semibold bg-cyan-800 text-white border-2 border-solid border-cyan-950  hover:bg-cyan-900"
          >
            Start
          </Link>
        </section>
      </div>
    </div>
  );
}
