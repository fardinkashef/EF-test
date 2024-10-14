import Results from "@/components/Results";
import { getSubjectById } from "@/lib/server-actions/subjects";

type DataByIdProps = {
  params: {
    id: string;
  };
};

export default async function DataById({ params }: DataByIdProps) {
  const { profile, results } = await getSubjectById(params.id);

  return (
    <Results
      answers={results.byEachQuestion}
      profile={profile}
      showSaveButton={false}
    />
  );
}
