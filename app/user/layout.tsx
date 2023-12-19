export default function UserLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {children}
    </div>
  );
}
