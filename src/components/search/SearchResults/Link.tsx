import Link from "next/link";
import instance from "@/services/interceptor";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { MdErrorOutline } from "react-icons/md";

interface Iprops {
  text: string;
  url: string;
}

export default function MyLink({ text, url }: Iprops) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`myLink${text}`],
    queryFn: () => instance.get(url),
  });

  return (
    <li className="flex justify-between hover:bg-[#F5F5F5] px-4 py-3 group cursor-pointer">
      <Link href="#">{text}</Link>
      {error ? (
        <MdErrorOutline />
      ) : (
        <>
          {isLoading ? (
            <Spinner color="primary" />
          ) : (
            <span className="bg-[#F5F5F5] group-hover:bg-white flex items-center justify-center px-2 rounded-lg font-extralight text-[12.8px]">
              {data?.data.total_results}
            </span>
          )}
        </>
      )}
    </li>
  );
}
