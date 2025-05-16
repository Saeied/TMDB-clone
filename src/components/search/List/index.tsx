import instance from "@/services/interceptor";
import { useQuery } from "@tanstack/react-query";
import CustomCard from "./Card";
import ErrorComponent from "@/components/common/ErrorComponent";
import { Skeleton, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { ParamValue } from "next/dist/server/request/params";
import PersonCard from "./Person";
import { MovieProps, Person, TvShowProps } from "@/types";
import CustomPagination from "@/components/common/CustomPagination";

interface IProps {
  query: string | null;
  slug: ParamValue | undefined;
}

export default function SearchResultsList({ query, slug }: IProps) {
  const [page, setPage] = useState(1);
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["searchedMovies"],
    queryFn: () =>
      instance.get(`/search/${slug}?query=${query}&page=${page.toString()}`),
  });

  useEffect(() => {
    refetch();
  }, [page, query]);

  return (
    <div className="w-full md:w-[78%] flex flex-col gap-5">
      {error ? (
        <ErrorComponent>Something Went Wrong</ErrorComponent>
      ) : (
        <>
          {isFetching ? (
            <>
              {slug == "movie" || slug == "tv" || slug == "collection" ? (
                new Array(10)
                  .fill("")
                  .map(() => (
                    <Skeleton
                      key={crypto.randomUUID()}
                      className="h-[140px] rounded-lg"
                    />
                  ))
              ) : (
                <Spinner className="mt-4" />
              )}
            </>
          ) : (
            <>
              {data?.data.results.length > 0 ? (
                <>
                  <>
                    {slug == "movie" || slug == "tv" || slug == "collection" ? (
                      <>
                        {data?.data.results.map(
                          (item: MovieProps & TvShowProps) => (
                            <CustomCard key={item.id} {...item} />
                          )
                        )}
                      </>
                    ) : (
                      <>
                        {slug == "company" ? (
                          <ul className="border-t border-b border-gray-300 divide-y divide-gray-300">
                            {data?.data.results.map(
                              (item: { id: string; name: string }) => (
                                <li key={item.id} className="text-[18px] py-2">
                                  {item.name}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <>
                            {slug == "keyword" ? (
                              <ul>
                                {data?.data.results.map(
                                  (item: { id: string; name: string }) => (
                                    <li key={item.id}>{item.name}</li>
                                  )
                                )}
                              </ul>
                            ) : (
                              <div className="flex flex-col gap-3">
                                {data?.data.results.map((item: Person) => (
                                  <PersonCard key={item.id} {...item} />
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                  <CustomPagination
                    page={page}
                    setPage={setPage}
                    totalPages={data?.data.total_pages}
                  />
                </>
              ) : (
                <p>There are no results that matched your query.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
