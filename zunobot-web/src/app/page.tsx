import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Initiative from "@/components/Initiative";
import Agents from "@/components/Agents";
import Stories from "@/components/Stories";
import Ecosystem from "@/components/Ecosystem";
import Pricing from "@/components/Pricing";
import Together from "@/components/Together";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Initiative />
        <Agents />
        <Stories />
        <Ecosystem />
        <Pricing />
        <Together />
      </main>
      <Footer />
    </>
  );
}
