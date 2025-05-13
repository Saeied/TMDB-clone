import { Skeleton } from "@heroui/skeleton";

export default function SliderSkeleton() {
  return (
    <div className="flex justify-center gap-6 py-4">
      {new Array(7).fill("").map((_, index) => (
        <Skeleton
          className="h-[220px] w-[160px] rounded-xl"
          key={index}
        ></Skeleton>
      ))}
    </div>
  );
}
