"use client";
import { Button, Input } from "@heroui/react";

export default function HeaderSearchInput() {
  return (
    <div>
      <Input
        classNames={{
          input: "text-[16px]",
          inputWrapper: "bg-white rounded-full ps-5 py-6 pe-0 overflow-hidden",
        }}
        placeholder="Search for a movie, tv show, person......"
        endContent={
          <Button
            style={{
              background:
                "linear-gradient(to right, rgba(30, 214, 169, 1) 0%, rgba(1, 180, 228, 1) 100%)",
            }}
            className="text-white rounded-3xl py-6 px-7 text-[16px]"
          >
            Search
          </Button>
        }
      />
    </div>
  );
}
