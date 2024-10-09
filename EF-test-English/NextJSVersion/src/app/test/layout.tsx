import TestSteps from "@/components/TestSteps";
import { SubjectContextProvider } from "@/lib/contexts/SubjectContext";

// export const dynamic = "force-dynamic";

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grow flex flex-col">
      <TestSteps />
      <SubjectContextProvider>{children}</SubjectContextProvider>
    </div>
  );
}
