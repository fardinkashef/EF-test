import FilterNew from "@/components/FilterNew";
import Pagination from "@/components/Pagination";
import SubjectList from "@/components/SubjectList";

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
  // const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <FilterNew />
      <SubjectList
        gender={gender}
        minAge={minAge}
        maxAge={maxAge}
        name={name}
        page={page}
      />
      ;
      <Pagination />
    </div>
  );
}
