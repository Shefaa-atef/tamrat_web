import Navbar      from "@/components/layout/Navbar";
import Footer      from "@/components/layout/Footer";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import Hero        from "@/sections/01_Hero";
import ValueProp   from "@/sections/02_ValueProp";
import Screenshots from "@/sections/03_Screenshots";
import Features    from "@/sections/04_Features";
import WhoIsItFor  from "@/sections/05_WhoIsItFor";
import HowItWorks  from "@/sections/06_HowItWorks";
import Download    from "@/sections/07_Download";
import { useEffect, useState } from "react";

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const isPrivacyPage = hash === "#/privacy-policy";

  useEffect(() => {
    if (isPrivacyPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isPrivacyPage]);

  return (
    <>
      <Navbar />

      {isPrivacyPage ? (
        <PrivacyPolicyPage />
      ) : (
        <main>
          <Hero />
          <ValueProp />
          <Screenshots />
          <Features />
          <WhoIsItFor />
          <HowItWorks />
          <Download />
        </main>
      )}

      <Footer />
    </>
  );
}
