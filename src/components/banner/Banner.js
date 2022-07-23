import React from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import { Swiper, SwiperSlide } from "swiper/react";
import BannerItems from "./BannerItems";

const Banner = () => {
  const { data } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px]  page-container mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItems item={item}></BannerItems>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
