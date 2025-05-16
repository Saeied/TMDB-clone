"use client";
import ErrorComponent from "@/components/common/ErrorComponent";
import instance from "@/services/interceptor";
import { MovieProps } from "@/types";
import { Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Recommendations() {
  const { id } = useParams();

  const {
    data: recommendations,
    isFetching,
    error,
  } = useQuery<{ data: { results: MovieProps[] } }>({
    queryKey: ["recommendations"],
    queryFn: () => instance.get(`/movie/${id}/recommendations`),
  });

  return (
    <>
      {error ? (
        <ErrorComponent className="my-8">Something Went Wrong</ErrorComponent>
      ) : (
        <>
          {isFetching ? (
            <Skeleton className="h-[200px] rounded-lg mb-8" />
          ) : (
            <>
              {recommendations?.data.results.length == 0 ? (
                <p className="my-8">no recommendations are added yet</p>
              ) : (
                <div className="overflow-x-scroll overflow-y-hidden custom-scroll pb-1">
                  <div className="flex gap-4">
                    {recommendations?.data.results.map((item) => (
                      <Link
                        href={`/movie/${item.id}`}
                        key={item.id}
                        className="flex flex-col gap-2 min-w-[300px] overflow-hidden cursor-pointer"
                      >
                        <img
                          className="rounded-lg"
                          src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`}
                        />
                        <div className="flex justify-between">
                          <span className="line-clamp-1">{item.title}</span>
                          <span>{Math.ceil(item.vote_average * 10)}%</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
