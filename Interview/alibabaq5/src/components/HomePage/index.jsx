import Navbar from "../NavBar";
import PreNavbar from "../PreNavBar";
import CarouselComponents from "./Carousel";
import CardItem from "./CardItem";
import Footer from "../Footer";
import HoverDropdown from '../HoverButton';

export default function HomePage() {
  return (
    <div>
      <PreNavbar />
      <Navbar />
      <CarouselComponents />
      <CardItem />
      <Footer />
      <HoverDropdown />
    </div>
  );
}
