
export default function ProductList({ products, onSelectProduct, addToCart }) {
  return (
    <div
      className="
        max-w-7xl mx-auto px-6 py-12
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8
      "
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="
            relative bg-slate-900 border border-slate-700 rounded-2xl p-5 
            shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 
            hover:-translate-y-1 cursor-pointer group
          "
        >
          {}
          {product.tag && (
            <span
              className="
                absolute top-3 right-3 bg-cyan-500 text-slate-900 
                text-xs font-bold px-3 py-1 rounded-full shadow-md
              "
            >
              {product.tag}
            </span>
          )}

          {}
          <div onClick={() => onSelectProduct(product)}>
            <img
              src={product.image}
              alt={product.name}
              className="
                w-full h-48 object-contain rounded-lg mb-4 
                transition-all duration-300 
                group-hover:scale-105 group-hover:brightness-110
              "
            />
          </div>

          {}
          <div onClick={() => onSelectProduct(product)} className="flex-1">
            <h2 className="text-lg font-bold text-white leading-tight">
              {product.name}
            </h2>
            <p className="text-sm text-slate-400">{product.marca}</p>

            <p className="text-cyan-400 text-xl font-bold mt-2">
              S/ {product.price}
            </p>

            <p className="text-xs text-slate-500 mt-1">
              Stock: <span className="text-slate-300">{product.stock}</span>
            </p>
          </div>

          {}
          <button
            onClick={() => addToCart(product)}
            className="
              mt-4 w-full py-2 bg-cyan-500 text-slate-900 font-semibold 
              rounded-xl hover:bg-cyan-400 transition shadow-lg 
              hover:shadow-cyan-500/30
            "
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}
