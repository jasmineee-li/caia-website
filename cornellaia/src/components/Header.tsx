export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-8 flex justify-between items-center">
        <a href="/" className="text-cornell-red text-2xl font-bold">
          Cornell AI Alignment
        </a>

        <nav className="space-x-8">
          <a href="/" className="hover:text-[#FF6B1A]">
            Home
          </a>
          <a href="/team" className="hover:text-[#FF6B1A]">
            Team
          </a>
          <a href="/get-involved" className="hover:text-[#FF6B1A]">
            Get Involved
          </a>
          <a href="/resources" className="hover:text-[#FF6B1A]">
            Resources
          </a>
        </nav>
      </div>
    </header>
  );
}
