import AuthProvider from "@/lib/contexts/AuthProvider";

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
