"use client";
import instance from "@/services/interceptor";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import SocialTabs from "./Tabs";
import { Review } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ReviewBox from "./ReviewBox";
import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/react";
import ErrorComponent from "@/components/common/ErrorComponent";
import "swiper/css";
import "swiper/css/pagination";

export default function Social() {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsNum, setReviewsNum] = useState(0);

  const {
    data: social,
    isFetching,
    error,
  } = useQuery<{ data: { results: Review[] } }>({
    queryKey: ["social"],
    queryFn: () => instance.get(`/movie/${id}/reviews`),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (social?.data.results) {
      setReviewsNum(social.data.results.length);
    }
  }, [social]);

  return (
    <div className="mt-5 flex flex-col gap-4">
      {error ? (
        <ErrorComponent>Something Went Wrong Loading Reviews</ErrorComponent>
      ) : (
        <>
          {isFetching ? (
            <Skeleton className="w-full h-[300px] rounded-lg" />
          ) : (
            <>
              {social?.data.results.length == 0 ? (
                <p>there are no reviews for this movie yet</p>
              ) : (
                <>
                  <SocialTabs reviewsNum={reviewsNum} />
                  <div>
                    <Swiper
                      onSlideChange={(swiper) =>
                        setCurrentIndex(swiper.activeIndex)
                      }
                      modules={[Pagination]}
                      pagination={{ clickable: true }}
                      spaceBetween={20}
                      loop={true}
                    >
                      {social?.data.results.map((review) => (
                        <SwiperSlide>
                          <ReviewBox {...review} currentIndex={currentIndex} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
