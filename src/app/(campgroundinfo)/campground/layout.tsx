import Navbar from "@/components/Navbar";

export default function CampgroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="w-screen top-0 sticky drop-shadow-lg bg-white z-10"></div>
      {children}
    </div>
  );
}
