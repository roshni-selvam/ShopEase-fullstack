import "./Hero.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.png";
import profile3 from "../assets/profile3.png";
const slides = [
  { img: profile1 },
  { img: profile2 },
  { img: profile3 },
];

function Hero() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-badge">✦ New Collection 2026</p>

        <h1 className="hero-title">Style That Speaks</h1>

        <p className="hero-desc">
          Discover the latest women's western wear — crafted for the modern woman.
        </p>

        <div className="hero-buttons">
          
          <button
            className="hero-btn"
            onClick={() => navigate("/shop/western")}
          >
            Shop Now
          </button>

          <button
            className="hero-btn-outline"
            onClick={() => navigate("/shop/western")}
          >
            Explore
          </button>
        </div>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${i === idx ? "active" : ""}`}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
      </div>

      <div className="hero-image">
        <img src={slides[i].img} alt="Fashion" />
      </div>
    </section>
  );
}

export default Hero;