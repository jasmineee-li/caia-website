import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-8 flex justify-between items-center">
        <Link href="/" className="text-cornell-red">
          <Image
            src="/serif-logo.svg"
            alt="Cornell AI Alignment"
            width={240}
            height={60}
            priority
          />
        </Link>

        <nav className="space-x-8">
          <Link href="/" className="hover:text-[#FF6B1A]">
            Home
          </Link>
          <Link href="/team" className="hover:text-[#FF6B1A]">
            Team
          </Link>
          <Link href="/get-involved" className="hover:text-[#FF6B1A]">
            Get Involved
          </Link>
          <Link href="/resources" className="hover:text-[#FF6B1A]">
            Resources
          </Link>
        </nav>
      </div>
    </header>
  );
}
