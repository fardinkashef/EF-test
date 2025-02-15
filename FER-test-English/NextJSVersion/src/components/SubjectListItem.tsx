"use client";
import { useState } from "react";
import Link from "next/link";
import { subject } from "@/lib/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteSubject } from "@/lib/server-actions/subjects";

type SubjectListItemProps = {
  subject: subject;
};

export default function SubjectListItem({ subject }: SubjectListItemProps) {
  //* This is for using NextAuth in a client component 👇:
  const { data: session } = useSession();

  const [showModal, setShowModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const router = useRouter();
  const type =
    subject.results.byEachQuestion.length === 60 ? "main " : "sample ";

  // Handlers 👇:
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleHideModal = () => {
    setShowModal(false);
  };
  const handleConfirmRemove = async () => {
    if (!session) return router.push("/api/auth/signin?callbackUrl=/data");
    setIsRemoving(true);
    try {
      await handleRemoveSubject(subject.id as string);
      handleHideModal();
    } catch (error) {
      console.log("This error happen while removing the data:", error);
    } finally {
      setIsRemoving(false);
    }
  };
  ////////////////////
  // Handlers 👇:
  const handleRemoveSubject = async (id: string) => {
    try {
      await deleteSubject(id);
    } catch (error) {
      console.log("Sth went wrong with deleting the subject:", error);
    }
  };

  /////////////////////////
  const fullName = subject.profile.firstName + " " + subject.profile.lastName;
  return (
    <div className="w-full h-full bg-inherit p-2 rounded relative text-slate-800">
      <ul>
        <li className="text-cyan-950 text-lg font-semibold mb-2">{fullName}</li>
        <li>{`${subject.profile.age} years old`}</li>
        <li>{`Has participated in ${type} test`}</li>
        <li>
          Correct answers:
          <span className="text-green-900 font-semibold">
            {subject.results.byAnswerStatus.correct}
          </span>
        </li>
        <li>
          Wrong answers:
          <span className="text-red-900 font-semibold">
            {subject.results.byAnswerStatus.wrong}
          </span>
        </li>
        <li>
          No answers:
          <span className="text-gray-800 font-semibold">
            {subject.results.byAnswerStatus.missed}
          </span>
        </li>
      </ul>
      <button
        className="bg-inherit absolute top-1 right-1 p-1 border-solid border-2 border-transparent rounded-full hover:border-red-700"
        onClick={handleShowModal}
        title="remove this data"
      >
        ❌
      </button>
      <Link
        className="bg-more w-10 h-10 bg-contain block mx-auto my-2 px-2 py-1 border-solid border-2 border-transparent rounded-full hover:border-slate-500  "
        href={`/data/${subject.id}`}
        title="more details"
      />
      <div
        className={`flex flex-col justify-center items-center px-2 bg-slate-200 absolute top-0 left-0 w-full h-full rounded ${
          !showModal ? "hidden" : "z-10"
        }`}
      >
        <h3 className="mb-4">{`Are you sure you want to delete ${
          subject.profile.gender === "male" ? "Mr" : "Mrs"
        } ${fullName}'s results of ${type} test?`}</h3>
        <div className="flex justify-center gap-5 ">
          <button
            className="w-20 p-1 rounded-md text-lg text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
            onClick={handleConfirmRemove}
            disabled={isRemoving}
          >
            {`${isRemoving ? "Wait" : "Remove"}`}
          </button>
          <button
            className="w-20 p-1 rounded-md text-lg text-white bg-blue-600 hover:bg-blue-700 "
            onClick={handleHideModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
