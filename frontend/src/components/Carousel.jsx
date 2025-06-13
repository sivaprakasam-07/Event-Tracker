import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Carousel = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/event/getAll')
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <Swiper spaceBetween={50} slidesPerView={1} autoplay={{ delay: 3000 }}>
      {events.map((event) => (
        <SwiperSlide key={event._id}>
          <img src={event.pamphletUrl} alt={event.name} style={{ width: '100%', height: '300px' }} />
          <h3>{event.name}</h3>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
