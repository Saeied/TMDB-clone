"use client";
import ErrorComponent from "@/components/common/ErrorComponent";
import instance from "@/services/interceptor";
import Link from "next/link";
import { Image, Tab, Tabs, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

function Trailers() {
  const [trailersBgUrl, setTrailersBgUrl] = useState<string>("");

  const { data, isFetching, error } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: () => instance.get("/movie/now_playing"),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.data) {
      setTrailersBgUrl(data.data.results[0].backdrop_path);
    }
  }, [data]);

  if (error) {
    return (
      <ErrorComponent className="my-36">Something Went Wrong</ErrorComponent>
    );
  }

  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${trailersBgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="flex flex-col pt-6 gap-6 px-7 lg:px-20 xl:px-52 transition-all duration-1000"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <h2 className="text-white text-[24px]">Latest Trailers</h2>
          <div className="flex flex-wrap gap-4">
            <Tabs
              classNames={{
                tab: "h-7 px-4",
                tabList: "p-0 bg-transparent border-2 border-[#1ed5a9]",
                cursor: "bg-gradient-to-r from-[#c0fecf] to-[#1ed5a9]",
                tabContent: "text-white group-data-[selected=true]:text-main",
              }}
              aria-label="Tabs radius"
              radius="full"
            >
              <Tab key="Popular" title="Popular" />
              <Tab key="Theaters" title="In Theaters" />
            </Tabs>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-scroll overflow-y-hidden custom-scroll pb-1">
          {isFetching ? (
            <>
              {new Array(4).fill("").map(() => (
                <Skeleton
                  key={crypto.randomUUID()}
                  className="min-w-[300px] min-h-[170px] rounded-xl"
                ></Skeleton>
              ))}
            </>
          ) : (
            <>
              {data?.data.results.map(
                (item: {
                  title: string;
                  backdrop_path: string;
                  overview: string;
                }) => (
                  <div
                    key={crypto.randomUUID()}
                    className="min-w-[290px] flex flex-col p-2 gap-4 items-center cursor-pointer group hover:scale-105 transition"
                    onMouseEnter={() => setTrailersBgUrl(item.backdrop_path)}
                  >
                    <div className="relative">
                      <FaPlay
                        size={38}
                        color="white"
                        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 group-hover:scale-125 transition"
                      />
                      <Image
                        height={170}
                        src={`https://image.tmdb.org/t/p/w342${item.backdrop_path}`}
                      />
                    </div>
                    <div className="flex flex-col items-center leading-none text-white">
                      <Link href="#" className="text-[20px]">
                        {item.title}
                      </Link>
                      <h3 className="text-[16px]">
                        {item.overview.slice(0, 24)}
                      </h3>
                    </div>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Trailers;
