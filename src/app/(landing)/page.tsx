import LandingHeader from "@/components/landing/Header";
import { Skeleton } from "@heroui/skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense
        fallback={<Skeleton classNames={{ base: "h-[450px] lg:h-[380px]" }} />}
      >
        <LandingHeader />
      </Suspense>
    </>
  );
}
