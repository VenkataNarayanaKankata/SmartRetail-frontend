import { useEffect, useState } from "react";

import { getWishlist, removeWishlistItem } from "../Services/wishlistService";

function Wishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) {
        return;
      }

      const data = await getWishlist(currentUser.email);

      console.log(data);

      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (id) => {
    try {
      await removeWishlistItem(id);

      alert("Removed Successfully");

      loadWishlist();
    } catch (error) {
      console.log(error);

      alert("Failed To Remove");
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Wishlist ❤️</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.imageUrl} width="80" />
              </td>

              <td>{item.productTitle}</td>

              <td>₹{item.price}</td>

              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Wishlist;
