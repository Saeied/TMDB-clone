"use client";
import { Tab, Tabs } from "@heroui/react";

export default function Trending() {
  return (
    <div
      style={{
        background:
          "url(/images/landing/trending-bg-39afc2a5f77e31d469b25c187814c0a2efef225494c038098d62317d923f8415.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        backgroundSize: "77%",
      }}
      className="h-[400px] py-10 px-7 lg:px-20 xl:px-52"
    >
      <div className="flex gap-4 items-center">
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
          >
            <Tab key="photos" title="Today" />
            <Tab key="music" title="This Week" />
          </Tabs>
        </div>
      </div>
    </div>
  );
}
