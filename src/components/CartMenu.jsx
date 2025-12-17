import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CartMenu({
  cartOpen,
  toggleCart,
  cart,
  removeFromCart,
  updateQty,
  clearCart,
}) {
  const total = cart.reduce((acc, p) => acc + p.price * p.qty, 0);

  return (
    <>
      {}
      {cartOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={toggleCart}
        />
      )}

      {}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: cartOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="
          fixed right-0 top-0 h-full w-full sm:w-[380px] md:w-[420px]
          bg-slate-950/95 border-l border-slate-800 z-50
          shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col
        "
      >
        {}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-teal-400/80">
              Cart
            </p>
            <h2 className="text-sm font-semibold text-slate-50">Purchase summary</h2>
          </div>

          <button
            onClick={toggleCart}
            className="
              h-8 w-8 rounded-full bg-slate-900/80 border border-slate-700/70
              flex items-center justify-center text-slate-300
              hover:border-teal-400 hover:text-teal-300 hover:bg-slate-900
              transition
            "
          >
            ✕
          </button>
        </div>

        {}
        <div className="flex-1 px-5 py-4 flex flex-col gap-4 overflow-hidden">
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 text-sm">
              <p>Your cart is empty.</p>
              <p className="text-xs text-slate-500 mt-1">Add products to view them here.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scroll">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="
                      border border-slate-800 rounded-xl bg-slate-950/80 
                      px-3 py-2.5 flex items-center gap-3
                    "
                  >
                    {}
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="
                        w-14 h-14 rounded-lg object-cover 
                        bg-slate-900/60 border border-slate-800
                      "
                    />

                    {}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-100 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        S/. {item.price.toFixed(2)}
                      </p>

                      {}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                          className="
                            h-6 w-6 rounded-full border border-slate-700 
                            flex items-center justify-center text-xs
                            hover:border-teal-400 hover:text-teal-300 transition
                          "
                        >
                          -
                        </button>

                        <span className="text-xs text-slate-100 w-6 text-center">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="
                            h-6 w-6 rounded-full border border-slate-700
                            flex items-center justify-center text-xs
                            hover:border-teal-400 hover:text-teal-300 transition
                          "
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {}
                    <div className="flex flex-col items-end justify-between h-full">
                      <p className="text-xs font-semibold text-teal-300">
                        S/. {(item.price * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[11px] text-red-300 hover:text-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {}
              <div className="border-t border-slate-800 pt-3 space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-200">
                  <span>Total</span>
                  <span className="font-semibold text-teal-300">S/. {total.toFixed(2)}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={clearCart}
                    className="
                      flex-1 text-xs border border-slate-700 rounded-xl px-3 py-2
                      text-slate-300 hover:border-red-400 hover:text-red-200
                      transition bg-slate-950/60
                    "
                  >
                    Empty cart
                  </button>

                  <Link
                    to="/checkout"
                    onClick={toggleCart}
                    className="
                      flex-1 text-xs flex items-center justify-center gap-1
                      rounded-xl bg-teal-500 text-slate-950 font-semibold px-3 py-2
                      shadow-[0_0_25px_rgba(45,212,191,0.45)]
                      hover:bg-teal-400 transition
                    "
                  >
                    Proceed to checkout
                    <span className="text-[10px] opacity-80">(S/. {total.toFixed(2)})</span>
                  </Link>
                </div>

                <p className="text-[13px] text-slate-500">
                  Review your order, choose a payment method, and confirm your purchase.
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
