import SubjectList from "@/components/SubjectList";
import { getSubjects } from "@/lib/server-actions/subjects";
// export const dynamic = "force-dynamic";

export default async function Data() {
  const subjects = await getSubjects();
  //* I reversed the subjects because I wanted the newly created one to be shown first:
  return <SubjectList initialSubjects={subjects.toReversed()} />;
}
