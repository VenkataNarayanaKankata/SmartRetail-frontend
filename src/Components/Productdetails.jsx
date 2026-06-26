import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../Services/cartService";
import { addToWishlist } from "../Services/wishlistService";

function ProductDetails({ products }) {
  const { id } = useParams();

  const [count, setCount] = useState(1);

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h2 className="mb-0">Product Not Found</h2>
        </div>
      </div>
    );
  }

  const totalPrice = product.price * count;

  const handleAddToCart = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));

      if (!currentUser) {
        alert("Please login first");
        return;
      }

      const cartData = {
        userEmail: currentUser.email,
        productId: product.id,
        productTitle: product.title,
        price: product.price,
        quantity: count,
        imageUrl: product.media?.imageUrl,
      };

      await addToCart(cartData);
      alert("Product Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Cart");
    }
  };

  const handleWishlist = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const wishlistItem = {
      userEmail: currentUser.email,
      productId: product.id,
      productTitle: product.title,
      price: product.price,
      imageUrl: product.media?.imageUrl,
    };

    console.log(wishlistItem);

    try {
      await addToWishlist(wishlistItem);
      alert("Added To Wishlist ❤️");
    } catch (error) {
      alert("Product already in wishlist ❤️");
    }
  };

  return (
    <div className="container py-5">
      {/* BREADCRUMB */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <Link to="/home" className="text-primary">
              All Products
            </Link>
          </li>
          <li className="breadcrumb-item active">{product.title}</li>
        </ol>
      </nav>

      <div className="row g-4 align-items-stretch">
        {/* IMAGE SECTION */}
        <div className="col-lg-5">
          <div className="text-center h-100 d-flex align-items-center justify-content-center bg-light rounded border" style={{ minHeight: "600px" }}>
            <img
              src={product.media?.imageUrl}
              alt={product.title}
              className="img-fluid rounded"
              style={{ maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* PRODUCT DETAILS SECTION */}
        <div className="col-lg-7">
          <h1 className="mb-3">{product.title}</h1>

          <p className="text-muted fs-5 mb-4">{product.description}</p>

          <h2 className="text-success mb-4">₹{product.price}</h2>

          {/* PRODUCT SPECIFICATIONS */}
          <div className="card border-light shadow-sm mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">Product Specifications</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>Brand:</strong>
                  </p>
                  <p className="text-muted">{product.brand}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>Category:</strong>
                  </p>
                  <p className="text-muted">{product.category}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>SKU:</strong>
                  </p>
                  <p className="text-muted">{product.sku}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>Stock:</strong>
                  </p>
                  <p className="text-muted">{product.stock}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>Rating:</strong>
                  </p>
                  <p className="text-muted">⭐ {product.rating}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">
                    <strong>Status:</strong>
                  </p>
                  <span className="badge bg-success">{product.availabilityStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* QUANTITY SELECTOR */}
          <div className="card border-light shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">Select Quantity</h5>
              <div className="d-flex align-items-center gap-2 mb-3">
                <button
                  className="btn btn-warning fw-bold"
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                  style={{ fontSize: "18px" }}
                >
                  −
                </button>
                <input
                  type="number"
                  className="form-control text-center fw-bold"
                  value={count}
                  min="1"
                  readOnly
                  style={{ maxWidth: "80px", fontSize: "18px" }}
                />
                <button
                  className="btn btn-success fw-bold"
                  onClick={() => setCount(count + 1)}
                  style={{ fontSize: "18px" }}
                >
                  +
                </button>
              </div>

              <h5>Total: <span className="text-success">₹{totalPrice}</span></h5>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="d-grid gap-2 d-md-flex">
            <button
              className="btn btn-primary btn-lg flex-grow-1"
              onClick={handleAddToCart}
            >
              🛒 Add To Cart
            </button>
            <button
              className="btn btn-outline-danger btn-lg flex-grow-1"
              onClick={handleWishlist}
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* ADDITIONAL INFORMATION */}
      <div className="row g-4 mt-2">
        <div className="col-lg-6">
          <div className="card border-light shadow-sm h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">Warranty & Shipping</h5>
            </div>
            <div className="card-body">
              <p className="mb-3">
                <strong>Warranty:</strong>
                <br />
                <span className="text-muted">{product.warrantyInformation}</span>
              </p>
              <p className="mb-0">
                <strong>Shipping:</strong>
                <br />
                <span className="text-muted">{product.shippingInformation}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-light shadow-sm h-100">
            <div className="card-header bg-light">
              <h5 className="mb-0">Additional Details</h5>
            </div>
            <div className="card-body">
              <p className="mb-3">
                <strong>Return Policy:</strong>
                <br />
                <span className="text-muted">{product.media?.returnPolicy}</span>
              </p>
              <p className="mb-0">
                <strong>Min. Order:</strong>
                <br />
                <span className="text-muted">
                  {product.media?.minimumOrderQuantity} unit(s)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BARCODE & QR CODE */}
      {product.media?.barcode && (
        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="card border-light shadow-sm">
              <div className="card-header bg-light">
                <h5 className="mb-0">Product Codes</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p>
                      <strong>Barcode:</strong>
                    </p>
                    <p className="text-muted">{product.media.barcode}</p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>QR Code:</strong>
                    </p>
                    {product.media?.qrCode && (
                      <img
                        src={product.media.qrCode}
                        alt="QR Code"
                        className="img-fluid"
                        style={{ maxWidth: "150px" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )} 
      <div className="row mt-4 mb-5">
        <div className="col-lg-12">
          <div className="card border-light shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">Customer Reviews</h5>
            </div>
            <div className="card-body">
              {product.reviews && product.reviews.length > 0 ? (
                <div className="list-group list-group-flush">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="list-group-item px-0">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-1">
                          <span className="badge bg-warning text-dark me-2">
                            ⭐ {review.rating}/5
                          </span>
                          {review.reviewerName}
                        </h6>
                        <small className="text-muted">
                          {new Date(review.reviewDate).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="mb-2">{review.comment}</p>
                      <small className="text-muted">{review.reviewerEmail}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="alert alert-info mb-0">
                  No reviews available yet. Be the first to review!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
