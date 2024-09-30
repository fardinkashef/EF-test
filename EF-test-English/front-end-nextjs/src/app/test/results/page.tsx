import Results from "@/components/Results";
import { useSubjectContext } from "@/lib/contexts/SubjectContext";

export default function TestResults() {
  const { answers, profile } = useSubjectContext();
  return <Results answers={answers} profile={profile} showSaveButton={true} />;
}
