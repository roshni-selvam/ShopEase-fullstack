import "./Collection.css";
import { useNavigate } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Western Wear",
    subtitle: "Bold. Modern. Effortless.",
    desc: "Explore our latest western wear collection — from chic tops to stylish dresses crafted for the modern woman.",
    tag: "New Arrivals",
    route: "western",
    reverse: false,
    images: [
      "https://i.pinimg.com/1200x/5b/dd/cb/5bddcbf309600c3a6c5c8ad355d65755.jpg",
      "https://i.pinimg.com/736x/d8/ab/26/d8ab2657ed1f29ce1de00227af9466b0.jpg",
      "https://i.pinimg.com/736x/11/ee/a1/11eea1c0c4172d1f3026550b818e39a2.jpg",
      "https://i.pinimg.com/736x/bb/56/22/bb562254c4fd03f7dcdf83d438da51f0.jpg",
    ],
  },
  {
    id: 2,
    title: "Party Wear",
    subtitle: "Shine Every Night.",
    desc: "Turn heads at every event with our glamorous party wear collection — designed to make you unforgettable.",
    tag: "Trending",
    route: "party",
    reverse: true,
    images: [
      "https://i.pinimg.com/736x/d6/7d/8a/d67d8aae534d5d05ebdab3a20d7f8f31.jpg",
      "https://i.pinimg.com/1200x/9b/da/b7/9bdab7cb1df5fa5d39a1b1c0609968fe.jpg",
      "https://i.pinimg.com/736x/a8/4d/25/a84d2522569dd72daf63c6be35775398.jpg",
      "https://i.pinimg.com/736x/88/3c/6d/883c6db57e40162d5426b42c24c05a20.jpg",
    ],
  },
  {
    id: 3,
    title: "Traditional Wear",
    subtitle: "Roots. Grace. Elegance.",
    desc: "Celebrate your heritage in style with our curated traditional wear — blending culture with contemporary fashion.",
    tag: "Bestseller",
    route: "traditional",
    reverse: false,
    images: [
      "https://i.pinimg.com/736x/e5/24/d5/e524d576aec9cf8726effdd7434a0e99.jpg",
      "https://i.pinimg.com/736x/96/32/9a/96329aa4b5e454e3cf0cea36af4aaa8e.jpg",
      "https://i.pinimg.com/474x/78/ef/7f/78ef7fd645e99d6863273ab10bb57d5f.jpg",
      "https://i.pinimg.com/736x/79/3c/ef/793cef125ec3c67d76e0bbb0a4cb62b6.jpg",
    ],
  },
  {
  id:4,
  title: "Traditional & Modern Sarees",
  subtitle:"Classic Meets Contemporary.",
  desc:"Discover timeless sarees with a modern twist — perfect for weddings, festivals, and elegant evenings.",
  tag:"Elegant",
  route:"sarees",
  reverse:true,
  images:[
    "https://i.pinimg.com/736x/13/c3/4d/13c34d9191611a2590dc68c67f28865e.jpg",
    "https://i.pinimg.com/736x/6b/e2/21/6be221d0c7c421d76479e3896dcc73ff.jpg",
    "https://i.pinimg.com/736x/ff/d2/7b/ffd27bae2109e02a7926b9799ca3a064.jpg",
    "https://i.pinimg.com/1200x/0d/01/68/0d016889a24266c28b0f1038af3badb4.jpg",
  ]
},

{
  id:5,
  title:"Casual Wear",
  subtitle:"Simple. Stylish. Everyday.",
  desc:"Refresh your wardrobe with comfy and trendy casual outfits designed for effortless everyday fashion.",
  tag:"Daily Style",
  route:"casual",
  reverse:false,
  images:[
    "https://i.pinimg.com/736x/ac/c9/40/acc940484ec29e4cc742d4f28cd6c1ac.jpg",
    "https://i.pinimg.com/736x/b6/f8/26/b6f826ddd8097a6c76c6e2c6a8108b07.jpg",
    "https://i.pinimg.com/736x/42/2d/f6/422df66ed094d90fedd6c98c67de005d.jpg",
    "https://i.pinimg.com/736x/ab/0f/31/ab0f312fef2156d6883dc71b608f1afd.jpg",
  ]
},
];

function Collection() {
  const navigate = useNavigate();

  return (
    <div className="collection-page">
      <div className="collection-header">
        <p className="collection-tag">✦ Explore</p>
        <h1 className="collection-title">The Collections</h1>
        <p className="collection-subtitle">Handpicked styles for every occasion</p>
      </div>

      <div className="collection-list">
        {collections.map((col) => (
          <div
            className={`collection-item ${col.reverse ? "reverse" : ""}`}
            key={col.id}
          >
            <div className="col-scroll-wrapper">
              <span className="col-badge">{col.tag}</span>
              <div className="col-scroll">
                {col.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${col.title} ${i + 1}`}
                    className="col-scroll-img"
                  />
                ))}
              </div>
            </div>

            <div className="col-content">
              <p className="col-subtitle">{col.subtitle}</p>
              <h2 className="col-heading">{col.title}</h2>
              <div className="col-divider" />
              <p className="col-desc">{col.desc}</p>

              {/*  FIXED — route correct */}
              <button
                className="col-btn"
                onClick={() => navigate(`/shop/${col.route}`)}
              >
                Shop Now →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Collection;