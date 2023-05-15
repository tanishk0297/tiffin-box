import React from 'react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './ReviewSection.css';

import 'swiper/css/bundle';
import 'swiper/css/navigation';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const reviews = [
  {
    name: 'Aayush Dharwal',
    imageUrl: '/assets/dhruv_m_786_321184509_3439132743023955_7684351509555091783_n.jpg',
    text: 'I recently moved to a new city and was having trouble finding healthy food options. That\'s when I discovered this website and it has been a game-changer! The website is easy to navigate, and I was able to find a tiffin center that offers a variety of fresh and healthy meal options. The meals are affordable and delicious, and I love that I don\'t have to worry about meal prep anymore. I highly recommend this service to anyone looking for convenient and healthy meal options!',
    stars: 5
  },
  {
    name: 'Raju Shrivastava',
    imageUrl: '/assets/prajjwal1010_271324152_964043234534727_2521468812967733447_n.jpg',
    text: 'I have been using this website to find mess and tiffin centers for a few months now, and I am blown away by the quality of the service. The website is user-friendly, and the mess and tiffin centers listed are all reputable and reliable. The meals are always fresh and hygienic, and I appreciate the variety of food options available. I have recommended this website to all of my friends and family who are looking for convenient meal options!',
    stars: 4
  },
  {
    name: 'Tanmay Rawat',
    imageUrl: '/assets/niikhil.jain_316178059_197699429402313_1849039202321748238_n.jpg',
    text: 'I was skeptical at first about using a mess or tiffin center, but this website has completely changed my mind. The website is easy to use, and I was able to find a mess that offers delicious and healthy meal options. The meals are always fresh and hygienic, and I love that I can customize my meal plan to fit my dietary needs. The customer service is also top-notch, and I always feel like my questions and concerns are addressed promptly.',
    stars: 5
  }
];

export const ReviewSection = () => {
  const swiperRef = React.useRef(null);

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="review-section">
      <h2 className="section-title">What Our Customers Say</h2>
      <Swiper
        slidesPerView={1}
        centeredSlides={true} // Align slides in the center
        spaceBetween={20} // Add some space between slides
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="review-card">
              <img className="review-image" src={review.imageUrl} alt={review.name} />
              <h3 className="review-name">{review.name}</h3>
              <p className="review-text">{review.text}</p>
              <div className="review-stars">
                {[...Array(review.stars)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="arrow-buttons">
        <button className="prev-button" aria-label="Previous" onClick={goPrev}>
          {/* <i className="fas fa-chevron-left"></i> */}
        </button>
        <button className="next-button" aria-label="Next" onClick={goNext}>
          {/* <i className="fas fa-chevron-right"></i> */}
        </button>
      </div>
    </section>
  );
};
