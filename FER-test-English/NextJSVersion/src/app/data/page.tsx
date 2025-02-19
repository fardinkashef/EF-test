import Filter from "@/components/Filter";
import Pagination from "@/components/Pagination";
import SubjectList from "@/components/SubjectList";
import { getPagesNumber } from "@/lib/server-actions/subjects";

export const dynamic = "force-dynamic";

export default async function Data(props: {
  searchParams?: Promise<{
    page?: string;
    gender?: string;
    minAge?: string;
    maxAge?: string;
    name?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const gender = searchParams?.gender || "both";
  const minAge = Number(searchParams?.minAge) || 40;
  const maxAge = Number(searchParams?.maxAge) || 120;
  const name = searchParams?.name || "";
  const page = Number(searchParams?.page) || 1;
  const totalPages = await getPagesNumber(gender, minAge, maxAge, name);

  return (
    <div className="w-full">
      <Filter />
      <SubjectList
        gender={gender}
        minAge={minAge}
        maxAge={maxAge}
        name={name}
        page={page}
      />

      <div className="mt-5 mb-3 flex w-full justify-center">
        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
}
