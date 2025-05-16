"use client";
import ErrorComponent from "@/components/common/ErrorComponent";
import CustomTabs from "@/components/common/Tabs";
import { cn } from "@/lib/utils";
import instance from "@/services/interceptor";
import { MediaProps } from "@/types";
import { Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

export default function Media() {
  const { id } = useParams();
  const [imageTypeToShow, setImageTypeToShow] = useState("Backdrops");

  const {
    data: images,
    isFetching,
    error,
  } = useQuery<{ data: { backdrops: MediaProps[]; posters: MediaProps[] } }>({
    queryKey: ["videos"],
    queryFn: () => instance.get(`/movie/${id}/images`),
  });

  return (
    <div className="flex flex-col gap-3 my-1">
      {error ? (
        <ErrorComponent className="my-16">
          Something Went Wrong Fetching Images
        </ErrorComponent>
      ) : (
        <>
          {isFetching ? (
            <Skeleton className="h-72 rounded-lg" />
          ) : (
            <>
              <CustomTabs
                h3="Media"
                items={[
                  { text: "Backdrops", number: images?.data.backdrops.length },
                  { text: "Posters", number: images?.data.posters.length },
                ]}
                toggleHandler={setImageTypeToShow}
              />

              <div className="overflow-x-scroll overflow-y-hidden custom-scroll rounded-lg pb-1">
                {imageTypeToShow == "Backdrops" ? (
                  <>
                    {images?.data.backdrops.length == 0 ? (
                      <p className="mt-8">no backdrops are added yet</p>
                    ) : (
                      <div className="flex">
                        {images?.data.backdrops.slice(0, 8).map((item) => (
                          <div
                            key={crypto.randomUUID()}
                            className="min-w-[500px]"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w780${item.file_path}`}
                            />
                          </div>
                        ))}
                        <span
                          className={cn(
                            `flex items-center justify-center gap-2 ${
                              imageTypeToShow == "Backdrops"
                                ? "min-w-[250px]"
                                : "min-w-[185px]"
                            } cursor-pointer text-xl`,
                            isFetching && "hidden",
                            images?.data.backdrops &&
                              images?.data.backdrops.length < 8 &&
                              "hidden"
                          )}
                        >
                          View More <FaArrowAltCircleRight />
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {images?.data.posters.length == 0 ? (
                      <p className="mt-8">no posters are added yet</p>
                    ) : (
                      <div className="flex">
                        {images?.data.posters.slice(0, 8).map((item) => (
                          <div
                            key={crypto.randomUUID()}
                            className="min-w-[185px]"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w185${item.file_path}`}
                            />
                          </div>
                        ))}
                        <span
                          className={cn(
                            `flex items-center justify-center gap-2 ${
                              imageTypeToShow == "Backdrops"
                                ? "min-w-[250px]"
                                : "min-w-[185px]"
                            } cursor-pointer text-xl`,
                            isFetching && "hidden",
                            images?.data.posters &&
                              images?.data.posters.length < 8 &&
                              "hidden"
                          )}
                        >
                          View More <FaArrowAltCircleRight />
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
