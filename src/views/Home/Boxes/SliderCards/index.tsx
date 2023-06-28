import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

const SliderCards = ({ data }: { data: any[] }) => {
  return (
    <Swiper
      style={{
        margin: "10px",
        padding: "15px 5px",
        height: "clamp(300px, 25vw, 300px)",
        width: "100%",
      }}
      modules={[Autoplay]}
      // onSwiper={(swiper) => console.log(swiper)}
      centeredSlides={false}
      navigation={false}
      slidesPerView={5}
      spaceBetween={50}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      // onSlideChange={() => console.log("slide change")}
      // effect={"fade"}
      breakpoints={{
        0: { slidesPerView: 1, centeredSlides: true },
        430: { slidesPerView: 2 },
        820: { slidesPerView: 3 },
        1500: { slidesPerView: 4 },
        1900: { slidesPerView: 5 },
      }}
      pagination={{
        clickable: true,
      }}
    >
      {data?.map((item, key) => (
        <SwiperSlide key={item.text + key + "sliderItem" + Math.random()}>
          {item}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export { SliderCards };
