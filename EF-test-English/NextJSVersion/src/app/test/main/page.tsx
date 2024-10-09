"use client";
import Test from "@/components/Test";
import { useSubjectContext } from "@/lib/contexts/SubjectContext";

export default function Main() {
  const { setAnswers } = useSubjectContext();
  return <Test setAnswers={setAnswers} type="main" />;
}
