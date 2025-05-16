import CustomPagination from "@/components/common/CustomPagination";
import ErrorComponent from "@/components/common/ErrorComponent";
import { cn } from "@/lib/utils";
import { MovieProps } from "@/types";
import { CircularProgress, Image, Skeleton } from "@heroui/react";
import moment from "moment";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function MoviesList({
  movies,
  isFetching,
  error,
  page,
  setPage,
  total_pages,
}: {
  movies: MovieProps[];
  isFetching: boolean;
  error: Error | null;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  total_pages: number;
}) {
  return (
    <>
      {error ? (
        <ErrorComponent className="mb-60">Something Went Wrong</ErrorComponent>
      ) : (
        <>
          {isFetching ? (
            <div className="w-full md:w-[80%] grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-7">
              {new Array(20).fill("").map(() => (
                <Skeleton
                  className="rounded-2xl h-[280px] xs:h-[260px] sm:h-[240px] md:h-[250px] lg:h-[300px]"
                  key={crypto.randomUUID()}
                />
              ))}
            </div>
          ) : (
            <>
              {movies.length == 0 ? (
                <p className="mb-64">
                  There are no results that matched your query.
                </p>
              ) : (
                <div className="w-full md:w-[80%] flex flex-col gap-8">
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-7">
                    {movies.map((movie) => (
                      <div
                        className="border rounded-2xl shadow-xl max-h-[365px] pb-2"
                        key={movie.id}
                      >
                        <Link
                          href={`/movie/${movie.id}`}
                          className="flex flex-col gap-6"
                        >
                          <div className="w-full relative">
                            <Image
                              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                              className="rounded-lg h-[280px] xs:h-[260px] sm:h-[240px] md:h-[250px] lg:h-[280px]"
                              classNames={{
                                img: "min-w-full",
                                wrapper: "min-w-full",
                              }}
                            />
                            <CircularProgress
                              value={movie.vote_average * 10}
                              showValueLabel={true}
                              className="w-9 h-9 absolute left-2 -bottom-4 z-10 text-white"
                              classNames={{
                                base: "bg-black rounded-full",
                                value: "text-[12px]",
                              }}
                              color={
                                cn(
                                  movie.vote_average * 10 >= 70
                                    ? "success"
                                    : movie.vote_average * 10 >= 30
                                    ? "warning"
                                    : "danger"
                                ) as "success" | "warning" | "danger"
                              }
                            />
                          </div>
                          <div className="px-2">
                            <p className="font-[600] text-start line-clamp-1">
                              {movie.title}
                            </p>
                            <p className="text-gray-500 text-start truncate line-clamp-1">
                              {moment(movie.release_date, "YYYY-M-D").format(
                                "MMMM D, YYYY"
                              )}
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <CustomPagination
                    page={page}
                    setPage={setPage}
                    totalPages={total_pages}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}
