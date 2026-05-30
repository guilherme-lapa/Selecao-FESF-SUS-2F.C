import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        🏥 Sistema de Saúde
      </h1>
      <p className="text-lg text-gray-500 mb-10 max-w-xl mx-auto">
        Gerencie pacientes e consultas médicas de forma simples e eficiente.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link
          href="/pacientes"
          className="bg-blue-600 text-white rounded-xl p-8 hover:bg-blue-700 transition-colors shadow-md"
        >
          <div className="text-4xl mb-3">👤</div>
          <h2 className="text-xl font-semibold mb-2">Pacientes</h2>
          <p className="text-blue-100 text-sm">
            Cadastre, consulte e gerencie os dados dos pacientes.
          </p>
        </Link>

        <Link
          href="/consultas"
          className="bg-teal-600 text-white rounded-xl p-8 hover:bg-teal-700 transition-colors shadow-md"
        >
          <div className="text-4xl mb-3">📋</div>
          <h2 className="text-xl font-semibold mb-2">Consultas</h2>
          <p className="text-teal-100 text-sm">
            Agende e acompanhe o status das consultas médicas.
          </p>
        </Link>
      </div>

      <p className="mt-12 text-sm text-gray-400">
        Conectado à{" "}
        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          Saúde API
        </a>
      </p>
    </div>
  );
}
