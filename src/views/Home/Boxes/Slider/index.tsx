import React from "react";
import { CircularProgress } from "@mui/material";
import { banners } from "@core/assets/imgs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SliderComponent = (props: SliderProps) => {
  if (!props.className) props.className = "mySwiper2";

  let bannersArray = Object.keys(banners).map((banner) => {
    return banners[banner as keyof bannerType].src;
  });

  if (bannersArray?.length === 0) return <CircularProgress />;

  return (
    <Swiper
      style={{
        height: "clamp(200px, 30vw, 400px)",
        width: "100%",
      }}
      modules={[Autoplay, EffectFade, Pagination]}
      // onSwiper={(swiper) => console.log(swiper)}
      centeredSlides={true}
      navigation={false}
      slidesPerView={1}
      spaceBetween={30}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      // onSlideChange={() => console.log("slide change")}
      effect={"fade"}
      pagination={{
        clickable: true,
      }}
      {...props}
    >
      {bannersArray.map((item, index) => {
        if (item)
          return (
            <SwiperSlide
              key={item + index + "SwiperSlide"}
              // style={{ backgroundImage: `url(${item})` }}
            >
              <img
                key={item + index + "SwiperSlide/img"}
                style={{
                  width: "100%",
                  objectPosition: "center",
                  objectFit: "cover",
                  minHeight: "150px",
                }}
                src={item}
                alt={item}
              />
            </SwiperSlide>
          );
      })}
    </Swiper>
  );
};

export default SliderComponent;

type SliderProps = {
  className: string;
};

type bannerType = {
  banner1: any;
};
