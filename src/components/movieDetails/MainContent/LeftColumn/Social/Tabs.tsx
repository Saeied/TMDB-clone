import { Tab, Tabs } from "@heroui/react";

export default function SocialTabs({ reviewsNum }: { reviewsNum: number }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:gap-10">
      <h3 className="text-2xl">Social</h3>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "gap-4 w-full relative rounded-none p-0",
            cursor: "w-full bg-main h-1",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-main",
          }}
          color="primary"
          variant="underlined"
        >
          <Tab
            key="Reviews"
            title={
              <div className="flex items-center">
                <strong className="text-[17px]">Reviews</strong>
                <span className="px-1 text-[#686868] font-bold">
                  {reviewsNum}
                </span>
              </div>
            }
          />
          <Tab
            key="Discussions"
            title={
              <div className="flex items-center">
                <strong className="text-[17px]">Discussions</strong>
                <span className="px-1 text-[#686868] font-bold">12</span>
              </div>
            }
          />
        </Tabs>
      </div>
    </div>
  );
}
