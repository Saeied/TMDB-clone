import SliderSkeleton from "@/components/common/SliderSkeleton";
import LandingHeader from "@/components/landing/Header";
import Popular from "@/components/landing/Popular";
import Trailers from "@/components/landing/Trailers";
import Trending from "@/components/landing/Trending";
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
      <Trending />
      <Trailers />
      <Suspense fallback={<SliderSkeleton />}>
        <Popular />
      </Suspense>
    </>
  );
}
