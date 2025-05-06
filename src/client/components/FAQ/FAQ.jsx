import "./FAQ.scss";
import arrow from "../../../images/faq-arrow.svg";
import { useState } from "react";
import img from "../../../images/faq-img.png";
import img2 from "../../../images/faq-img2.png";

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What makes FORMA different from other fitness apps?",
      answer:
        "FORMA offers personalized workout plans tailored to your goals, fitness level, limitations, and even your mood. It’s not just a template — it’s a coach in your pocket.",
    },
    {
      question: "Is FORMA suitable for beginners?",
      answer:
        "Absolutely! Your workouts are built around your experience and the intensity you prefer. You start simple and progress gradually.",
    },
    {
      question: "How are workouts personalized for me?",
      answer:
        "Based on your answers during registration: goals, body parameters, injuries, level of exertion - everything is taken into account.",
    },
    {
      question: "Can I change my goals or workout intensity later?",
      answer:
        "Yes! You can update your preferences anytime in your profile, and the system will adjust your plan accordingly.",
    },
    {
      question: "What if I have injuries or physical limitations?",
      answer:
        "FORMA adapts to your needs. Just mark any injuries when setting up your profile, and we’ll avoid stressing those areas.",
    },
  ];

  return (
    <div className="faq" id="faq">
      <h1 className="faq__title">FAQ</h1>

      <img src={img} alt="Uniform for sports" className="faq__img" />
      <img src={img2} alt="Uniform for sports" className="faq__img faq__img--bottom" />

      <div className="faq__items">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="faq__item"
            onClick={() => toggleAnswer(index)}
          >
            <p className="faq__item__number">0{index + 1}</p>

            <div className="faq__item__content">
              <div className="faq__item__box">
                <h2 className="faq__item__question">{item.question}</h2>
                <img
                  src={arrow}
                  alt="Faq Arrow"
                  className={`faq__item__arrow ${
                    activeIndex === index ? "active" : "no-active"
                  }`}
                />
              </div>

              <p
                className={`faq__item__answer ${
                  activeIndex === index ? "active" : "no-active"
                }`}
              >
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
