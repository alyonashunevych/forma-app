import { About } from "../../components/About/About";
import { FAQ } from "../../components/FAQ/FAQ";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { HowItWorks } from "../../components/HowItWorks/HowItWorks";
import { Main } from "../../components/Main/Main";

export function Welcome() {
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
