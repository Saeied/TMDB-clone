import { Spinner } from "@heroui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center gap-3 mt-16">
      <h4 className="text-2xl">Searching Among Data</h4>
      <Spinner variant="wave" />
    </div>
  );
}
