import Navbar      from "@/components/layout/Navbar";
import Hero        from "@/sections/01_Hero";
import ValueProp   from "@/sections/02_ValueProp";
import Screenshots from "@/sections/03_Screenshots";
import Features    from "@/sections/04_Features";
import WhoIsItFor  from "@/sections/05_WhoIsItFor";
import HowItWorks  from "@/sections/06_HowItWorks";
import Download    from "@/sections/07_Download";

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <ValueProp />
        <Screenshots />
        <Features />
        <WhoIsItFor />
        <HowItWorks />
        <Download />
      </main>
    </>
  );
}
