"use client";
import { FC, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { IoCaretForwardOutline, IoCaretBackOutline } from "react-icons/io5";
import { Image, Skeleton } from "@heroui/react";
import Link from "next/link";
import moment from "moment";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IProps {
  data: {
    results: {}[];
  };
  isFetching: boolean;
}

const Slider: FC<IProps> = ({ data, isFetching }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <>
      <div className="flex justify-between mb-4">
        <button
          ref={prevRef}
          className="bg-main text-white p-3 rounded-full absolute -left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-10"
        >
          <IoCaretBackOutline />
        </button>
        <button
          ref={nextRef}
          className="bg-main text-white p-3 rounded-full absolute -right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-10"
        >
          <IoCaretForwardOutline />
        </button>
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={20}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          320: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          896: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 7,
          },
        }}
        loop={true}
        onBeforeInit={(swiper: any) => {
          if (typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {isFetching ? (
          <>
            {new Array(7).fill("").map((_, index) => (
              <SwiperSlide>
                <Skeleton
                  className="h-[220px] w-[160px] rounded-xl"
                  key={index}
                ></Skeleton>
              </SwiperSlide>
            ))}
          </>
        ) : (
          data?.results.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col gap-6 items-center">
                <div className="relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    className="rounded-lg h-[220px]"
                  />
                  <CircularProgressbar
                    className="w-9 h-9 absolute -left-10 -bottom-3 z-10"
                    value={item.vote_average * 10}
                    text={`${Math.ceil(item.vote_average * 10)}%`}
                    background
                    styles={buildStyles({
                      pathColor:
                        item.vote_average * 10 >= 70
                          ? "#21D07A"
                          : item.vote_average * 10 >= 30
                          ? "#D2D531"
                          : "red",
                      textColor: "#fff",
                      trailColor: "#fff",
                      textSize: "30px",
                      backgroundColor: "#000",
                    })}
                  />
                </div>
                <div>
                  <Link className="font-[600]" href="#">
                    {item.title}
                  </Link>
                  <p className="text-gray-500">
                    {moment(item.release_date, "YYYY-M-D").format(
                      "MMMM D, YYYY"
                    )}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
};

export default Slider;
