import { DataContextProvider } from "@/lib/contexts/DataContext";

// export const dynamic = "force-dynamic";

export default function DataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grow">
      <DataContextProvider>{children}</DataContextProvider>
    </div>
  );
}
