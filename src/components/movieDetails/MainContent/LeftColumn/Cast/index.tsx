"use client";
import instance from "@/services/interceptor";
import { Cast } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import CastCard from "./CastCard";
import { FaArrowRightLong } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Skeleton } from "@heroui/react";
import ErrorComponent from "@/components/common/ErrorComponent";

export default function TopBilledCast() {
  const { id } = useParams();
  const {
    data: cast,
    isFetching,
    error,
  } = useQuery<{ data: { cast: Cast[] } }>({
    queryKey: ["cast"],
    queryFn: () => instance.get(`/movie/${id}/credits`),
  });

  return (
    <>
      {error ? (
        <ErrorComponent className="h-40 flex items-center justify-center">
          Something Went Wrong
        </ErrorComponent>
      ) : (
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl">Top Billed Cast</h3>
          <div className="flex gap-4 overflow-x-scroll overflow-y-hidden custom-scroll pb-6">
            {isFetching ? (
              <>
                {new Array(9).fill("").map(() => (
                  <Skeleton
                    key={crypto.randomUUID()}
                    className="min-w-[140px] h-[180px] rounded-lg"
                  />
                ))}
              </>
            ) : (
              <>
                {cast?.data.cast.length == 0 ? (
                  <p className="mt-8">no cast are added yet</p>
                ) : (
                  <>
                    {cast?.data.cast
                      .sort((a, b) => a.order - b.order)
                      .slice(0, 9)
                      .map((cast) => (
                        <CastCard key={cast.id} {...cast} />
                      ))}
                  </>
                )}
              </>
            )}
            <span
              className={cn(
                "flex items-center justify-center gap-2 min-w-[120px] cursor-pointer",
                isFetching && "hidden",
                cast?.data.cast.length == 0 && "hidden"
              )}
            >
              View More <FaArrowRightLong />
            </span>
          </div>
          <p className={cn("my-5", cast?.data.cast.length == 0 && "hidden")}>
            Full Cast & Crew
          </p>
        </div>
      )}
    </>
  );
}
