import Carousel from "../Components/Carousel";
import ProductList from "../components/ProductList";
function Home({ products }) {
  return (
    <>
      <Carousel />
      <ProductList products={products} />
    </>
  );
}

export default Home;
