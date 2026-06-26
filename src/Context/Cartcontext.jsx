import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // GET CURRENT USER
  const user = JSON.parse(localStorage.getItem("currentUser"));

  // DIFFERENT CART FOR EACH USER
  const cartKey = user ? `cart_${user.email}` : "cart_guest";

  // LOAD CORRECT USER CART
  useEffect(() => {
    const storedCart = localStorage.getItem(cartKey);

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      setCartItems([]);
    }
  }, [cartKey]);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }, [cartItems, cartKey]);

  // ADD TO CART
  function addToCart(product, quantity) {
    if (quantity <= 0) {
      alert("Please select quantity");

      return;
    }

    const alreadyExists = cartItems.find((item) => item.id === product.id);

    if (alreadyExists) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
            }
          : item,
      );

      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity,
        },
      ]);
    }
  }

  // REMOVE PRODUCT
  function removeFromCart(id) {
    const updatedCart = cartItems.filter((item) => item.id !== id);

    setCartItems(updatedCart);
  }

  // CART COUNT
  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
