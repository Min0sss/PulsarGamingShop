import { motion } from "framer-motion";

export default function ProductCard({ product, onAddToCart, onViewDetail }) {
  
  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleDetail = () => onViewDetail(product);

  return (
    <motion.article
      layout
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 18px 40px rgba(15,23,42,0.7)",
      }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      onClick={handleDetail}
      className="
        group rounded-2xl border border-slate-800 bg-slate-900/70 
        overflow-hidden flex flex-col cursor-pointer transition-all
      "
    >
      {}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="
            h-full w-full object-cover 
            transition-transform duration-500 
            group-hover:scale-110
          "
        />

        {}
        <span
          className="
            pointer-events-none absolute inset-0 
            opacity-0 group-active:opacity-100 
            group-active:scale-150 transition-all duration-300 
            bg-white/30 rounded-full blur-2xl
          "
        ></span>
      </div>

      {}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-sm font-semibold text-white">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-xs text-slate-400 line-clamp-2">
            {product.description}
          </p>
        )}

        <span className="text-lg font-bold text-cyan-400 mt-1">
          S/ {product.price}
        </span>

        {}
        <motion.button
          onClick={handleAdd}
          whileTap={{ scale: 0.9 }}
          className="
            mt-3 h-9 rounded-full bg-cyan-500/90 hover:bg-cyan-400 
            text-slate-950 font-semibold text-xs transition-all shadow-md
          "
        >
          Agregar al carrito
        </motion.button>
      </div>
    </motion.article>
  );
}
