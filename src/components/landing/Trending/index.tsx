"use client";
import { useEffect, useState } from "react";
import instance from "@/services/interceptor";
import { Skeleton, Tab, Tabs } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import TrendingSlider from "./Slider";
import styles from "./index.module.css";
import "react-circular-progressbar/dist/styles.css";

export default function Trending() {
  const [time, setTime] = useState("day");
  const [page, setPage] = useState("1");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dayTrending"],
    queryFn: () =>
      instance
        .get(`/trending/movie/${time}?page=${page}`)
        .then((res) => res.data),
  });

  useEffect(() => {
    refetch();
  }, [time, page]);

  if (error) {
    return (
      <h3 className="text-red-600 text-3xl text-center my-36">
        something went wrong
      </h3>
    );
  }

  return (
    <div
      style={{
        background:
          "url(/images/landing/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50% 80%",
      }}
      className={`flex flex-col gap-1 h-[500px] py-10 px-7 lg:px-20 xl:px-52 ${styles.responsiveBgSize}`}
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <h2 className="text-[24px] font-[500]">Trending</h2>
        <div className="flex flex-wrap gap-4">
          <Tabs
            classNames={{
              tab: "h-7 px-4",
              tabList: "p-0 bg-white border border-main",
              cursor: "bg-main",
              tabContent: "text-main group-data-[selected=true]:text-[#1ed5a9]",
            }}
            aria-label="Tabs radius"
            radius="full"
            onSelectionChange={(e) => {
              setTime(e.toString().split(",")[0]);
              setPage(e.toString().split(",")[1]);
            }}
          >
            <Tab key="day,1" title="Today" />
            <Tab key="week,3" title="This Week" />
          </Tabs>
        </div>
      </div>
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={time}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isLoading ? (
              <div className="flex justify-center gap-6 py-4">
                {new Array(7).fill("").map((_, index) => (
                  <Skeleton
                    className="h-[220px] w-[160px] rounded-xl"
                    key={index}
                  ></Skeleton>
                ))}
              </div>
            ) : (
              <TrendingSlider data={data} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
