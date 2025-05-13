"use client";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderSearchInput() {
  const [searchKey, setSearchKey] = useState("");
  const router = useRouter();

  return (
    <div>
      <Input
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        onKeyUp={(e) => {
          if (e.key == "Enter" && searchKey) {
            router.push(`/search/movie?query=${searchKey}`);
          }
        }}
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
            onPress={() => {
              if (searchKey) {
                router.push(`/search/movie?query=${searchKey}`);
              }
            }}
          >
            Search
          </Button>
        }
      />
    </div>
  );
}
