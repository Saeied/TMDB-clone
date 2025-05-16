"use client";
import { FC, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { IoCaretForwardOutline, IoCaretBackOutline } from "react-icons/io5";
import { CircularProgress, Image, Skeleton } from "@heroui/react";
import Link from "next/link";
import moment from "moment";
import { MovieProps } from "@/types";
import { cn } from "@/lib/utils";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface IProps {
  data: {
    results: MovieProps[];
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
          400: {
            slidesPerView: 2,
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
            {new Array(7).fill("").map(() => (
              <SwiperSlide>
                <div className="flex flex-col gap-6 items-center">
                  <Skeleton
                    className="h-[220px] w-[160px] rounded-xl"
                    key={crypto.randomUUID()}
                  ></Skeleton>
                </div>
              </SwiperSlide>
            ))}
          </>
        ) : (
          data?.results.map((item, index) => (
            <SwiperSlide key={`${item.title}-${index}`}>
              <Link
                href={`/movie/${item.id}`}
                className="flex flex-col gap-6 items-center"
              >
                <div className="relative">
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${item.poster_path}`}
                    className="rounded-lg h-[220px]"
                  />
                  <CircularProgress
                    value={item.vote_average * 10}
                    showValueLabel={true}
                    className="w-9 h-9 absolute left-2 -bottom-4 z-10 text-white"
                    classNames={{
                      base: "bg-black rounded-full",
                      value: "text-[12px]",
                    }}
                    color={
                      cn(
                        item.vote_average * 10 >= 70
                          ? "success"
                          : item.vote_average * 10 >= 30
                          ? "warning"
                          : "danger"
                      ) as "success" | "warning" | "danger"
                    }
                  />
                </div>
                <div>
                  <p className="font-[600]">{item.title}</p>
                  <p className="text-gray-500">
                    {moment(item.release_date, "YYYY-M-D").format(
                      "MMMM D, YYYY"
                    )}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </>
  );
};

export default Slider;
