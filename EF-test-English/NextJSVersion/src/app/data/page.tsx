import SubjectList from "@/components/SubjectList";
import { getSubjects } from "@/lib/server-actions/subjects";

export default async function Data() {
  const subjects = await getSubjects();

  return <SubjectList initialSubjects={subjects.toReversed()} />;
}
