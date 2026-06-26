import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/Themecontext";

function ProductList({ products }) {
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  function handleBuy(product) {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    navigate(`/product/${product.id}`, {
      state: { product },
    });
  }

  return (
    <div className="mt-4 d-flex justify-content-center">
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <div className="row gx-4">
          {products.map((item) => (
            <div className="col-md-3 mb-4" key={item.id}>
              <div
                className={`card p-3 shadow-sm h-100 ${
                  theme === "dark" ? "bg-dark text-white" : ""
                }`}
              >
                <img
                  src={item.media?.imageUrl}
                  alt={item.title}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />

                <h5 className="mt-3">{item.title}</h5>

                <p>{item.brand}</p>

                <p className="text-success fw-bold">₹{item.price}</p>

                <p>⭐ {item.rating}</p>

                <p>Reviews: {item.reviews?.length || 0}</p>
                <div>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => handleBuy(item)}
                >
                  Buy
                </button>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
