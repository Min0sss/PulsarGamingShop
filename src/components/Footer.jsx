export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-10 md:grid-cols-3">

        {}
        <div>
          <h2 className="text-xl font-semibold text-white">
            Pulsar <span className="text-cyan-400">Gaming Shop</span>
          </h2>
          <p className="mt-3 text-sm text-slate-400 max-w-md leading-relaxed">
            Tienda especializada en hardware y periféricos gamer, Rendimiento real,
            componentes de calidad y una experiencia de compra confiable.
          </p>
        </div>

        {}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
            Categorías
          </h3>

          <div className="grid grid-cols-3 gap-y-2 text-sm">
            {[
              "Tarjetas Gráficas",
              "Motherboards",
              "Procesadores",
              "Memorias RAM",
              "Almacenamiento",
              "Cases / Torres",
              "Fuentes de Poder",
              "Refrigeración",
              "Monitores",
              "Audífonos",
              "Teclados",
              "Mouse",
              "Micrófonos",
              "Accesorios",
            ].map((cat) => (
              <button
                key={cat}
                className="
                  text-slate-400 text-left transition
                  hover:text-cyan-400 hover:translate-x-1
                "
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Información */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
            Información
          </h3>

          <ul className="space-y-2 text-sm">
            {[
              "Términos y Condiciones",
              "Política de Privacidad",
              "Soporte / Atención",
              "Métodos de Pago",
            ].map((item) => (
              <li
                key={item}
                className="
                  text-slate-400 cursor-pointer
                  transition hover:text-cyan-400 hover:translate-x-1
                "
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Línea inferior */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-xs sm:text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2025 Pulsar Gaming Shop — Todos los derechos reservados.</span>
          <span className="text-slate-600">
            Guillermo Contreras - Desarrollador Frontend Junior - Proyecto de portafolio
          </span>
        </div>
      </div>
    </footer>
  );
}
