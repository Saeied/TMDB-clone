"use client";
import { useEffect, useState } from "react";
import instance from "@/services/interceptor";
import { Tab, Tabs } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "../../common/Slider";
import styles from "./index.module.css";
import ErrorComponent from "@/components/common/ErrorComponent";

export default function Trending() {
  const [time, setTime] = useState("day");
  const [page, setPage] = useState("1");

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ["trending"],
    queryFn: () =>
      instance
        .get(`/trending/movie/${time}?page=${page}`)
        .then((res) => res.data),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    refetch();
  }, [time, page]);

  if (error) {
    return (
      <ErrorComponent className="my-36">Something Went Wrong</ErrorComponent>
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
      className={`flex flex-col gap-1 py-10 px-7 lg:px-20 xl:px-52 ${styles.responsiveBgSize}`}
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
            <Slider isFetching={isFetching} data={data} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
