import instance from "@/services/interceptor";
import { useQuery } from "@tanstack/react-query";
import CustomCard from "./Card";
import ErrorComponent from "@/components/common/ErrorComponent";
import { Button, Pagination, Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";
import { HiMiniArrowLongLeft, HiMiniArrowLongRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

interface Iprops {
  query: string | null;
}

export default function SearchResultsList({ query }: Iprops) {
  const [page, setPage] = useState(1);
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["searchedMovies"],
    queryFn: () =>
      instance.get(`/search/movie?query=${query}&page=${page.toString()}`),
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
            new Array(10)
              .fill("")
              .map((_, index) => (
                <Skeleton key={index} className="h-[140px] rounded-lg" />
              ))
          ) : (
            <>
              {data?.data.results.length > 0 ? (
                <>
                  {data?.data.results.map((item: any) => (
                    <CustomCard key={item.id} {...item} />
                  ))}
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
                <p>There are no movies that matched your query.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

{
  /* <Pagination
  // style={{ direction: "ltr" }}
  // className="mt-8"
  // classNames={{
  //   base: "flex justify-center",
  //   item: "rounded-full mx-1 dark:bg-dark-100",
  //   prev: "dark:bg-dark-100",
  //   next: "dark:bg-dark-100",
  //   cursor: "bg-primary rounded-full",
  // }}
  total={Math.ceil(data?.data.results / 10)}
  page={page}
  showControls
  onChange={(number) => {
    // setReFetch(true);
    // setCoursesPageNumber(number);
    // scrollTo({ top: 560, behavior: "smooth" });
  }}
/>; */
}
