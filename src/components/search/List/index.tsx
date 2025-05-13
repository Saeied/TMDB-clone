import instance from "@/services/interceptor";
import { useQuery } from "@tanstack/react-query";
import CustomCard from "./Card";
import ErrorComponent from "@/components/common/ErrorComponent";
import { Skeleton } from "@heroui/react";

interface Iprops {
  query: string | null;
}

export default function SearchResultsList({ query }: Iprops) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["searchedMovies"],
    queryFn: () => instance.get(`/search/movie?query=${query}`),
  });

  return (
    <div className="w-full md:w-[78%] flex flex-col gap-5">
      {error ? (
        <ErrorComponent>Something Went Wrong</ErrorComponent>
      ) : (
        <>
          {isLoading ? (
            new Array(10)
              .fill("")
              .map(() => <Skeleton className="h-[140px] rounded-lg" />)
          ) : (
            <>
              {data?.data.results.length > 0 ? (
                <>
                  {data?.data.results.map((item: any) => (
                    <CustomCard key={crypto.randomUUID()} {...item} />
                  ))}
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
