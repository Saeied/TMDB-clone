"use client";
import { useEffect, useState } from "react";
import MoviesFilteringCol from "@/components/movies/Filters";
import { useQuery } from "@tanstack/react-query";
import instance from "@/services/interceptor";
import MoviesList from "@/components/movies/MoviesList";

export default function MoviesPage() {
  const [categoryValue, setCategoryValue] = useState("");
  const [genresArray, setGenresArray] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["movies",page],
    queryFn: () =>
      instance.get(
        `/discover/movie?page=${page}${genresArray.length > 0 ? `&with_genres=${genresArray.join(",")}` : ''}${categoryValue ? `&sort_by=${categoryValue}` : ''}`),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      setShouldRefetch(false)
    }
  }, [page, shouldRefetch]);

  return (
    <div className="flex px-7 lg:px-20 xl:px-28 my-16 gap-4 lg:gap-8">
      <MoviesFilteringCol
        categoryValue={categoryValue}
        setCategoryValue={setCategoryValue}
        genresArray={genresArray}
        setGenresArray={setGenresArray}
        setPage={setPage}
        setShouldRefetch={setShouldRefetch}
      />
      <MoviesList
        movies={data?.data.results}
        isFetching={isFetching}
        error={error}
        page={page}
        setPage={setPage}
        total_pages={data?.data.total_pages}
      />
    </div>
  );
}
