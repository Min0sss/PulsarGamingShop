// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import CheckoutPage from "./components/CheckoutPage";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import CartMenu from "./components/CartMenu";
import { products } from "./data/products";

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const filteredProducts = products.filter((prod) => {
    const matchesCategory =
      category === "Todos" || prod.category === category;

    const matchesSearch =
      prod.name.toLowerCase().includes(search.toLowerCase()) ||
      prod.marca.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const toggleCart = () => setCartOpen((prev) => !prev);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    showToastMessage(`"${product.name}" agregado al carrito`);

    const btn = document.getElementById("cart-btn");
    if (btn) {
      btn.classList.add("cart-shake");
      setTimeout(() => btn.classList.remove("cart-shake"), 500);
    }
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

  const updateQty = (id, qty) =>
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );

  const clearCart = () => setCart([]);

  const handleSelectProduct = (product) => setSelectedProduct(product);
  const handleBack = () => setSelectedProduct(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {}
      <Navbar
        cartCount={cart.length}
        onCartClick={toggleCart}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      {}
      <Toast show={showToast} message={toastMessage} />

      {}
      <CartMenu
        cartOpen={cartOpen}
        toggleCart={toggleCart}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQty={updateQty}
        clearCart={clearCart}
      />

      {}
      <Routes>
        <Route
          path="/"
          element={
            selectedProduct ? (
              <ProductDetail
                product={selectedProduct}
                onBack={handleBack}
                addToCart={addToCart}
              />
            ) : (
              <ProductList
                products={filteredProducts}
                onSelectProduct={handleSelectProduct}
                addToCart={addToCart}
              />
            )
          }
        />

        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} clearCart={clearCart} />}
        />
      </Routes>

      {}
      <Footer />
    </div>
  );
}

export default App;
