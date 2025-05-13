import instance from "@/services/interceptor";
import { useQuery } from "@tanstack/react-query";
import CustomCard from "./Card";
import ErrorComponent from "@/components/common/ErrorComponent";
import { Button, Pagination, Skeleton, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { HiMiniArrowLongLeft, HiMiniArrowLongRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { ParamValue } from "next/dist/server/request/params";
import PersonCard from "./Person";

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
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [page]);

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
                  .map((_, index) => (
                    <Skeleton key={index} className="h-[140px] rounded-lg" />
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
                        {data?.data.results.map((item) => (
                          <CustomCard key={item.id} {...item} />
                        ))}
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
                                {data?.data.results.map((item) => (
                                  <PersonCard key={item.id} {...item} />
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                  <div className="flex justify-center items-center mt-4">
                    <Button
                      disabled={page == 1}
                      className={cn(
                        "text-[16px] bg-transparent",
                        page == 1 && "text-[#D8D8D8]"
                      )}
                      size="sm"
                      variant="flat"
                      onPress={() => {
                        setPage((prev) => (prev > 1 ? prev - 1 : prev));
                        scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      <HiMiniArrowLongLeft className="" />
                      Previous
                    </Button>
                    <Pagination
                      classNames={{
                        wrapper: "gap-0",
                        item: "text-small rounded-xl bg-transparent shadow-none",
                        cursor: "bg-[#E1E1E1] text-main",
                      }}
                      page={page}
                      total={Math.ceil(data?.data.total_pages)}
                      onChange={(number) => {
                        setPage(number);
                        scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                    <Button
                      disabled={page == data?.data.total_pages}
                      className={cn(
                        "text-[16px] bg-transparent",
                        page == data?.data.total_pages && "text-[#D8D8D8]"
                      )}
                      size="sm"
                      variant="flat"
                      onPress={() => {
                        setPage((prev) => (prev < 10 ? prev + 1 : prev));
                        scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Next
                      <HiMiniArrowLongRight />
                    </Button>
                  </div>
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
