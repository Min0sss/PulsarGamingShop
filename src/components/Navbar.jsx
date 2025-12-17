import { useEffect, useState, useRef } from "react";

export default function Navbar({
  cartCount = 0,
  onCartClick,
  category,
  setCategory,
  search,
  setSearch,
}) {

  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    if (cartCount <= 0) return;
    setIsShaking(true);
    const timeout = setTimeout(() => setIsShaking(false), 400);
    return () => clearTimeout(timeout);
  }, [cartCount]);
  const categoryMap = {
    All : "Todos",
    "Graphics cards": "tarjeta-grafica",
    Motherboard: "motherboard",
    Processor: "procesador",
    Storage: "almacenamiento",
    Case: "case",
    "Power supply": "fuente",
    Ram: "ram",
    Cooling: "refrigeracion",
    Monitors: "monitor",
    Headphones: "audifonos",
    Keyboards: "teclado",
    Mouse: "mouse",
    Microphones: "microfono",
  };

  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseUp = () => setIsDown(false);
  const onMouseLeave = () => setIsDown(false);

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-cyan-500/10">
      
      {}
      <div className="max-w-7xl mx-auto px-6 py-4 
        grid grid-cols-1 gap-3 
        sm:flex sm:items-center sm:justify-between">

        {}
        <h1 className="text-2xl font-bold text-white text-center sm:text-left">
          Pulsar <span className="text-cyan-400">Gaming Shop</span>
        </h1>

        {}
        <div className="flex justify-center w-full sm:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="
              w-full sm:w-80 
              px-4 py-2 rounded-xl bg-slate-800 text-slate-300 
              border border-slate-700 outline-none 
              focus:border-cyan-400 transition
            "
          />
        </div>

        {}
        <button
          id="cart-btn"
          onClick={onCartClick}
          className={`
            w-full sm:w-auto
            justify-center sm:justify-normal
            bg-black text-white px-5 py-2 rounded-xl 
            hover:bg-slate-800 transition 
            border border-slate-700 shadow-md
            flex items-center gap-2
            ${isShaking ? "animate-bounce" : ""}
          `}
        >
          Cart
          {cartCount > 0 && (
            <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full shadow-md animate-pulse">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {}
      <div className="w-full mt-2 pb-3 flex justify-center">
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          className="
            flex gap-3 overflow-x-auto no-scrollbar px-6 max-w-7xl 
            cursor-grab active:cursor-grabbing select-none
          "
        >
          {Object.keys(categoryMap).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(categoryMap[cat])}
              className={`
                px-4 py-2 rounded-full text-sm whitespace-nowrap transition shadow-sm
                ${
                  category === categoryMap[cat]
                    ? "bg-cyan-500 text-black border border-cyan-400"
                    : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

    </header>
  );
}
