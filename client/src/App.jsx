import Banner from "./components/Banner";
import Container from "./components/Container";
import Header from "./components/Header";
import NewArrivals from "./components/NewArrivals";
import Sale from "./components/Sale";
import Title from "./components/Title";
import "./index.css";
function App() {
  return (
    <main>
      <Banner />
      <Container className="py-5 md:py-10">
        <Sale />
        <NewArrivals/>
        {/* Best seller */}
        {/* Product of the year */}
        {/* Special Offers */}
      </Container>
    </main>
  );
}

export default App;
