// eslint-disable-next-line 
import React, { useState, useEffect } from 'react';
import './Home.css';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import item1 from '../../assets/item1.jpeg';
import item2 from '../../assets/item2.jpeg';
import item3 from '../../assets/item3.jpeg';

const items = [
  {
    img: item2,
    title: "High-Quality Radios",
    desc: "A stylish, reworked piece that adds charm to any space.",
  },
  {
    img: item1,
    title: "High-Quality Lamps",
    desc: "Classic design with a sustainable twist.",
  },
  {
    img: item3,
    title: "Retro Chairs",
    desc: "Comfort meets classic with these unique finds.",
  },
];

function HomeUI({ annonces, loading }) {
  const [startIndex, setStartIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [direction, setDirection] = useState('left');
  const itemsToShow = 2;

  const visibleItems = items.slice(startIndex, startIndex + itemsToShow);

  const triggerAnimation = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setDirection('left');
      setStartIndex(startIndex - 1);
      triggerAnimation();
    }
  };

  const handleNext = () => {
    if (startIndex + itemsToShow < items.length) {
      setDirection('right');
      setStartIndex(startIndex + 1);
      triggerAnimation();
    }
  };

  return (
    <div className="home">
      <div className="blur-container-wrapper">
        <div className="promo-text">
          <p>
            Give your old item a <br />
            <span className="bold-text">New Life</span>.
          </p>
        </div>

        <div className={`blur-box-slider ${animate ? direction : ''}`}>
          {visibleItems.map((item, index) => (
            <div
              className={`blur-box ${animate ? 'animate-in' : ''}`}
              key={`${startIndex}-${index}`}
            >
              <div className="blur-box-content">
                <img src={item.img} alt={item.title} />
                <div className="text-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="action-buttons">
                    <button className="shop-now-btn">Shop Now</button>
                    <button className="heart-btn">
                      <AiOutlineHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrow-controls">
          <button
            className={`arrow-btn left ${startIndex === 0 ? 'disabled' : ''}`}
            onClick={handlePrev}
          >
            <IoIosArrowBack />
          </button>
          <button
            className={`arrow-btn right ${startIndex + itemsToShow >= items.length ? 'disabled' : ''}`}
            onClick={handleNext}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomeUI;
