import DataList from "@/components/DataList";
import { getResults } from "@/lib/server-actions/results";

export default async function Data() {
  const data = await getResults();

  return <DataList initialData={data} />;
}
