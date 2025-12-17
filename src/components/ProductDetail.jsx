
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetail({ product, onBack, addToCart }) {
  if (!product) return null;

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image
    ? [product.image]
    : ["/placeholder-product.png"];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex];

  const prevImg = () =>
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const nextImg = () =>
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-4">

        {}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400 transition"
        >
          <span className="text-lg">←</span>
          Back to products
        </button>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] mt-2">

          {}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/60 shadow-[0_18px_60px_rgba(0,0,0,0.7)]">
              
              {images.length > 1 && (
                <button
                  onClick={prevImg}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition"
                >
                  ‹
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={currentImage}
                  alt={product.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <button
                  onClick={nextImg}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition"
                >
                  ›
                </button>
              )}

              {images.length > 1 && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 w-5 rounded-full transition-all ${
                        idx === currentIndex ? "bg-cyan-400" : "bg-slate-600/60"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative h-16 w-20 rounded-xl overflow-hidden border transition-all flex-shrink-0 ${
                      idx === currentIndex
                        ? "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.45)]"
                        : "border-slate-700/80 hover:border-cyan-400/70"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.8)] space-y-4">
            
            {}
            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400/80">
                {product.category || "Producto"}
              </p>
              <h1 className="text-xl md:text-2xl font-semibold">
                {product.name}
              </h1>
            </div>

            {}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Price</p>
                <p className="text-2xl font-semibold text-cyan-400">
                  S/. {product.price.toFixed(2)}
                </p>
              </div>

              <div className="text-right">
                {typeof product.stock === "number" && (
                  <p
                    className={`text-xs font-medium ${
                      product.stock > 0 ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {product.stock > 0
                      ? `Stock: ${product.stock} und.`
                      : "Sin stock"}
                  </p>
                )}

                {product.marca && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Brand:{" "}
                    <span className="text-slate-200">{product.marca}</span>
                  </p>
                )}
              </div>
            </div>

            {}
            {product.description && (
              <p className="text-sm text-slate-300">{product.description}</p>
            )}

            {}
            {Array.isArray(product.specs) && (
              <div className="pt-2">
                <p className="text-xs font-semibold mb-2">Specs</p>
                <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                  {product.specs.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {}
            <div className="pt-3 border-t border-slate-800 mt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 rounded-xl bg-cyan-500 text-slate-950 text-sm font-semibold px-4 py-2.5 shadow-[0_0_35px_rgba(34,211,238,0.55)] hover:bg-cyan-400 transition"
              >
                🛒 Add to cart
              </button>

              <button
                onClick={onBack}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-200 text-sm hover:border-cyan-400 hover:text-cyan-300 transition"
              >
                ← See more products
              </button>
            </div>

            <p className="text-[16px] text-slate-500 pt-1">
            Credit or debit card: 5% fee. Bank transfer and cash: no extra charge. 
            Interest-free installments available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
