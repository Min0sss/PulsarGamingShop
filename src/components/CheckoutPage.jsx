import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function CheckoutPage({ cart = [], clearCart }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [errors, setErrors] = useState({});
  const [isPaying, setIsPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const total = useMemo(
    () => cart.reduce((acc, p) => acc + p.price * p.qty, 0),
    [cart]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGlobalError("");
  };

  const validate = () => {
    const req = ["name", "email", "phone", "address", "city", "country"];
    const newErrors = {};

    req.forEach((f) => {
      if (!form[f].trim()) newErrors[f] = "This field is required";
    });

    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Invalid email";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cart.length) {
      setGlobalError("Your cart is empty, please add products before checking out.");
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setSuccess(true);
      clearCart && clearCart();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-teal-400/80 mb-1">
              Pulsar Gaming Shop
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold">Checkout</h1>
            <p className="text-sm text-slate-400 mt-1">
              Review your information and confirm your order.
            </p>
          </div>

          <Link
            to="/"
            className="text-xs md:text-sm border border-slate-700/70 px-3 py-2 rounded-xl 
            hover:border-teal-400/80 hover:text-teal-300 bg-slate-900/40 backdrop-blur-md transition"
          >
            ⬅ Continue shopping
          </Link>
        </div>

        {}
        {globalError && (
          <div className="rounded-xl border border-red-500/60 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {globalError}
          </div>
        )}

        {success && (
          <div className="rounded-xl border border-teal-500/60 bg-teal-500/10 px-4 py-3 text-sm text-teal-200">
            ✅ Payment successful! Your order has been registered.
          </div>
        )}

        {}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">

          {}
          <form
            onSubmit={handleSubmit}
            className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 
            rounded-2xl p-5 md:p-6 shadow-[0_18px_60px_rgba(0,0,0,0.65)] space-y-5"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-semibold">Shipping information</h2>
              <span className="text-[10px] text-slate-400">
                * Required fields
              </span>
            </div>

            {}
            {[
              { label: "Full name", name: "name", placeholder: "Ej: Guillermo Contreras" },
              { label: "Email", name: "email", placeholder: "youremail@example.com" },
              { label: "Phone", name: "phone", placeholder: "+51 999 999 999" },
              { label: "Adress", name: "address", placeholder: "Street, number, reference" },
              { label: "City", name: "city", placeholder: "Ej: Lima" },
              { label: "country", name: "country", placeholder: "Ej: Perú" },
            ].map(({ label, name, placeholder }) => (
              <div key={name} className="space-y-1">
                <label className="text-xs text-slate-300">
                  {label} <span className="text-red-400">*</span>
                </label>
                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={`w-full rounded-xl bg-slate-900/80 border px-3 py-2.5 text-sm 
                    outline-none ${
                      errors[name]
                        ? "border-red-500/80"
                        : "border-slate-700/70 focus:border-teal-400/80"
                    }`}
                />
                {errors[name] && (
                  <p className="text-xs text-red-300">{errors[name]}</p>
                )}
              </div>
            ))}

            {}
            <div className="space-y-1">
              <label className="text-xs text-slate-300">Additional notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                placeholder="References, schedules…"
                className="w-full rounded-xl bg-slate-900/80 border border-slate-700/70 
                px-3 py-2.5 text-sm outline-none resize-none 
                focus:ring-2 focus:ring-teal-500/80"
              />
            </div>

            {}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-slate-100">Payment method</h3>

              <div className="grid md:grid-cols-3 gap-3 text-xs">
                {[
                  { id: "card", text: "💳 Credit card", sub: "Visa, Mastercard" },
                  { id: "transfer", text: "🏦 Transfer", sub: "Bank deposit" },
                  { id: "cash", text: "📦 Payment on delivery", sub: "Cash upon receipt" },
                ].map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    className={`rounded-xl px-3 py-3 text-left transition 
                      ${
                        paymentMethod === m.id
                          ? "border border-teal-500/70 bg-teal-500/10 shadow-[0_0_15px_rgba(45,212,191,0.4)]"
                          : "border border-slate-700/80 bg-slate-900/70 hover:border-slate-500/80"
                      }`}
                  >
                    {m.text}
                    <p className="text-[11px] text-slate-300 mt-1">{m.sub}</p>
                  </button>
                ))}
              </div>
            </div>

            {}
            <div className="pt-3 border-t border-slate-800/80 mt-2">
              <button
                type="submit"
                disabled={isPaying || success}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl 
                bg-teal-500 text-slate-950 text-sm font-semibold px-5 py-2.5 
                shadow-[0_0_35px_rgba(45,212,191,0.45)] hover:bg-teal-400 
                disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {isPaying ? (
                  <>
                    <span className="h-4 w-4 border-2 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                    Processing payment...
                  </>
                ) : success ? (
                  "Payment Completed"
                ) : (
                  <>
                    Confirm order{" "}
                    <span className="text-xs opacity-80">(S/. {total.toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {}
          <aside className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6 
          shadow-[0_18px_60px_rgba(0,0,0,0.75)] space-y-4 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <span className="text-[11px] text-slate-400">{cart.length} product(s)</span>
            </div>

            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1 custom-scroll">
              {cart.length === 0 ? (
                <p className="text-sm text-slate-400">
                  There are no products in the cart.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border border-slate-800/80 
                    rounded-xl px-3 py-2.5 bg-slate-950/60"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-100 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Amount: {item.qty} × S/. {item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-xs font-semibold text-teal-300">
                      S/. {(item.qty * item.price).toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="space-y-2 border-t border-slate-800/80 pt-3">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Subtotal</span>
                <span>S/. {total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xs text-slate-300">
                <span>Shipment</span>
                <span className="text-teal-300">Free</span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-slate-100 pt-1">
                <span>Total to pay</span>
                <span className="text-teal-300">S/. {total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
