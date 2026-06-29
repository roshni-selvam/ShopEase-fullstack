import "./About.css";

function About() {
  const values = [
    { icon: "🌸", title: "Elegance", desc: "Every piece is curated for the modern woman who values style and grace." },
    { icon: "💫", title: "Quality", desc: "We bring you premium western wear that lasts — crafted with care." },
    { icon: "🌿", title: "Sustainability", desc: "Fashion that's good for you and kind to the planet." },
    { icon: "❤️", title: "Community", desc: "Built for women, by women — a space where you belong." },
  ];

  return (
    <div className="about-page">

      {/* Hero Section */}
      <div className="about-hero">
        <p className="about-tag">✦ Our Story</p>
        <h1 className="about-heading">We Believe Every Woman<br />Deserves to Feel Stylish</h1>
        <p className="about-para">
          TrendyVibe was born from a simple idea — fashion should be accessible, beautiful, and empowering.
          We curate the finest western wear collections for the bold, modern woman.
        </p>
      </div>

      <div className="about-divider" />

      {/* Brand Story */}
      <div className="about-story">
        <div className="about-story-text">
          <h2>How It All Started</h2>
          <p>Founded in 2024, TrendyVibe started as a small passion project by a group of fashion-forward
            women who wanted to bring the best of western fashion to everyday wardrobes.</p>
          <p>From casual tops to elegant dresses, our collections are handpicked to ensure every woman
            finds her perfect style — no matter the occasion.</p>
          <p>Today, we are proud to serve thousands of happy customers who trust TrendyVibe for their
            everyday fashion needs.</p>
        </div>
        <div className="about-story-image">
  <img
    src="https://i.pinimg.com/1200x/ed/2a/79/ed2a79d966ef35c6cccf1006ec94fb1f.jpg"
    alt="TrendyVibe Fashion"
    className="about-img"
  />
</div>
      </div>

      {/* Values */}
      <div className="about-values">
        <h2 className="values-heading">What We Stand For</h2>
        <div className="values-grid">
          {values.map((v, i) => (
            <div className="value-card" key={i}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default About;