import './About.scss';
import img1 from "../../../images/about-img1.png";
import img2 from "../../../images/about-img2.png";
import quoteleft from "../../../images/quote-left.svg";
import quoteright from "../../../images/quote-right.svg";

export function About() {
  return (
    <section className="about" id="about">
      <div className="about__first-screen">
        <div className="about__description">
          <p className="about__text">
            FORMA is more than just a fitness app. It’s a space where strength,
            structure, and self-care come together. No random workouts, no
            scattered plans — only thoughtfully built training programs tailored
            specifically to you.
          </p>
          <p className="about__text">
            The idea for FORMA was born from the personal experience of its
            creator — someone who lives an active lifestyle and trains
            regularly.
          </p>
        </div>

        <div className="about__title-img-box">
          <div className="about__title">
            <span className="about__title__italic">About</span>
            <h2 className="about__title__normal">the FORMA</h2>
          </div>
          <img
            src={img1}
            alt="Uniform for sports"
            className="about__first-img"
          />
        </div>

        <div className="about__description about__description--bottom">
          <p className="about__text">
            Like many others, she often found herself jumping between platforms
            in search of the right exercises, watching YouTube videos, reading
            fitness forums, saving Instagram posts, and collecting scattered
            links, notes, and screenshots across different apps.
          </p>
          <p className="about__text">
            Progress was tracked either mentally or in random phone notes. Over
            time, this routine became chaotic and draining — and it was clear
            that something was missing.
          </p>
        </div>
      </div>

      <div className="quote">
        <img
          src={quoteleft}
          alt="Quote Left"
          className="quote__symbol quote__symbol--left"
        />

        <p className="quote__text">
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I kept wishing there was an app
          that could hold{" "}
          <span className="quote__text__italic">&nbsp;everything&nbsp;</span>
          &nbsp; — my plan, my progress, my preferences — in one place.
          Something that would remind me, guide me, and stay by my side like a
          personal coach.
        </p>

        <img
          src={quoteright}
          alt="Quote Right"
          className="quote__symbol quote__symbol--right"
        />
      </div>

      <div className="about__second-screen">
        <img src={img2} alt="Outdoor sports" className="about__second-img" />

        <div className="about__description about__description--wider">
          <p className="about__text">
            That’s how FORMA came to life — a platform created by someone who
            needed it herself, and designed for people who want a consistent,
            structured, and personalized training experience.
          </p>
          <p className="about__text">
            Whether you work out at home, at the gym, or on the go — FORMA
            adapts to your pace and keeps you moving forward.
          </p>
        </div>
      </div>
    </section>
  );
}
