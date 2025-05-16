"use client";
import ErrorComponent from "@/components/common/ErrorComponent";
import Slider from "@/components/common/Slider";
import instance from "@/services/interceptor";
import { useQuery } from "@tanstack/react-query";

function Popular() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["popular"],
    queryFn: () => instance.get("/movie/popular").then((res) => res.data),
  });

  if (error) {
    return (
      <ErrorComponent className="my-36">Something Went Wrong</ErrorComponent>
    );
  }

  return (
    <div className="flex flex-col gap-1 py-10 px-7 lg:px-20 xl:px-52">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <h2 className="text-[24px] font-[500]">What's Popular</h2>
      </div>
      <div className="relative">
        <Slider isFetching={isFetching} data={data} />
      </div>
    </div>
  );
}

export default Popular;
