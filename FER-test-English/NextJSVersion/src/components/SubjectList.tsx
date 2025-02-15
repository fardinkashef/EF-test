import { getSubjects } from "@/lib/server-actions/subjects";
import SubjectListItem from "./SubjectListItem";

type SubjectListProps = {
  gender: string;
  minAge: number;
  maxAge: number;
  name: string;
  page: number;
};

export default async function SubjectList({
  gender,
  minAge,
  maxAge,
  name,
  page,
}: SubjectListProps) {
  const subjects = await getSubjects(gender, minAge, maxAge, name, page);
  return (
    <div className="grow flex flex-col relative">
      <ul className="grow flex justify-evenly gap-2 flex-wrap p-2">
        {subjects.map((subject, index) => (
          <li
            key={subject.id}
            className={`w-[250px] h-fit rounded ${
              index % 2 === 0 ? "bg-slate-300" : "bg-zinc-300"
            }`}
          >
            <SubjectListItem subject={subject} />
          </li>
        ))}
      </ul>
    </div>
  );
}
