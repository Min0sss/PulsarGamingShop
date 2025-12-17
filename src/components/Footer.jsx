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
            Specialized store for gaming hardware and peripherals, real performance, 
            quality components, and a reliable shopping experience.
          </p>
        </div>

        {}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
            Categories
          </h3>

          <div className="grid grid-cols-3 gap-y-2 text-sm">
            {[
              "Graphics Cards",
              "Motherboards",
              "Processors",
              "RAM",
              "Storage",
              "Computer Cases",
              "Power Supplies",
              "Cooling",
              "Monitors",
              "Headphones",
              "Keyboards",
              "Mouse",
              "Microphones",
              "Accessories",
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

        {}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 mb-3 uppercase tracking-wide">
            Information
          </h3>

          <ul className="space-y-2 text-sm">
            {[
              "Terms and Conditions",
              "Privacy Policy",
              "Support",
              "Payment Methods",
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

      {}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-xs sm:text-sm text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2025 Pulsar Gaming Shop — All rights reserved.</span>
          <span className="text-slate-600">
           Guillermo Contreras – Junior Frontend Developer – Portfolio Project
          </span>
        </div>
      </div>
    </footer>
  );
}
