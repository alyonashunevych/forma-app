import { useLocation } from "react-router-dom";
import { About } from "../../components/About/About";
import { FAQ } from "../../components/FAQ/FAQ";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { HowItWorks } from "../../components/HowItWorks/HowItWorks";
import { Main } from "../../components/Main/Main";
import { useEffect } from "react";

export function Welcome() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <Main />
      <About />
      <HowItWorks />
      <FAQ />
      <Footer />
    </>
  );
}
