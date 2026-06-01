"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/pacientes", label: "Pacientes" },
  { href: "/consultas", label: "Consultas" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          🏥 Saúde App
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`hover:text-blue-200 transition-colors ${
                  pathname === href ? "underline underline-offset-4" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
