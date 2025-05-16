"use client";
import { cn } from "@/lib/utils";
import { Button, Pagination } from "@heroui/react";
import { Dispatch, SetStateAction } from "react";
import { HiMiniArrowLongLeft, HiMiniArrowLongRight } from "react-icons/hi2";

export default function CustomPagination({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
}) {
  return (
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
          setPage((prev) => prev - 1);
          scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <HiMiniArrowLongLeft />
        Previous
      </Button>
      <Pagination
        classNames={{
          wrapper: "gap-0",
          item: "text-small rounded-xl bg-transparent shadow-none",
          cursor: "bg-[#E1E1E1] text-main",
        }}
        page={page}
        total={totalPages < 500 ? Math.ceil(totalPages) : 500}
        onChange={(number) => {
          setPage(number);
          scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
      <Button
        disabled={page == 500}
        className={cn(
          "text-[16px] bg-transparent",
          page == 500 && "text-[#D8D8D8]"
        )}
        size="sm"
        variant="flat"
        onPress={() => {
          setPage((prev) => prev + 1);
          scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Next
        <HiMiniArrowLongRight />
      </Button>
    </div>
  );
}
