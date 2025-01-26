import Sidenav from "@/components/SideNav/Sidenav";

export default function GatheringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex pt-16">
      <Sidenav section="/gathering" />
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
