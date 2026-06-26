function Carousel() {
  return (
    <div className="container mt-4">
      <div
        id="multiCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000"
      >
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <div className="row">
              <div className="col-md-4">
                <img
                  src="https://rukminim2.flixcart.com/fk-p-flap/800/400/image/9e878195b8c43dbd.jpg?q=60"
                  className="d-block w-100 rounded"
                />
              </div>
              <div className="col-md-4">
                <img
                  src="https://rukminim2.flixcart.com/fk-p-flap/800/400/image/232b8fce5dc3469d.png?q=60"
                  className="d-block w-100 rounded"
                />
              </div>
              <div className="col-md-4">
                <img
                  src="https://rukminim2.flixcart.com/fk-p-flap/800/400/image/bd37549c9aedf499.png?q=60"
                  className="d-block w-100 rounded"
                />
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div className="row">
              <div className="col-md-4">
                <img
                  src="https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/76d71e46df098c37.png?q=60"
                  className="d-block w-100 rounded"
                />
              </div>
              <div className="col-md-4">
                <img
                  src="https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/5ff8b3fddf5654a3.png?q=60"
                  className="d-block w-100 rounded"
                />
              </div>
              <div className="col-md-4">
                <img
                  src="https://rukminim2.flixcart.com/fk-p-flap/3200/1560/image/5cf3ad8c807b513d.jpg?q=60"
                  className="d-block w-100 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#multiCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#multiCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
