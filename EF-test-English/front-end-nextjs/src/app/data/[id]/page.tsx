import Results from "@/components/Results";
import { getResultsById } from "@/lib/server-actions/results";

type DataByIdProps = {
  params: {
    id: string;
  };
};

export default async function DataById(props: DataByIdProps) {
  const { profile, results } = await getResultsById(props.params.id);

  return (
    <Results
      answers={results.byEachQuestion}
      profile={profile}
      showSaveButton={false}
    />
  );
}
