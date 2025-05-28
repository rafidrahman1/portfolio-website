import Hero from "../components/home/Hero";
import Footer from "../components/layout/Footer/Footer";
import Navbar from "../components/layout/Header/Navbar";

export default async function Home() {
  return (
  <div>
    <Navbar/>
    <Hero/>
    <Footer/>
  </div>
  )
}