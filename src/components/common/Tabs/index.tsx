import { Tab, Tabs } from "@heroui/tabs";
import { Dispatch, SetStateAction } from "react";

export default function CustomTabs({
  h3,
  items,
  toggleHandler,
}: {
  h3: string;
  items: { text: string; number: number | undefined }[];
  toggleHandler?: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-center lg:gap-10">
      <h3 className="text-2xl">{h3}</h3>
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
          onSelectionChange={(e) => {
            if (toggleHandler) {
              toggleHandler(e.toString());
            }
          }}
        >
          {items.map((item) => (
            <Tab
              key={item.text}
              title={
                <div className="flex items-center">
                  <strong className="text-[17px]">{item.text}</strong>
                  <span className="px-1 text-[#686868] font-bold">
                    {item.number}
                  </span>
                </div>
              }
            />
          ))}
        </Tabs>
      </div>
    </div>
  );
}
