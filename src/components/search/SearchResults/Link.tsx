import Link from "next/link";
import instance from "@/services/interceptor";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { MdErrorOutline } from "react-icons/md";
import { ParamValue } from "next/dist/server/request/params";
import { cn } from "@/lib/utils";

interface IProps {
  name: string;
  text: string;
  url: string;
  slug: ParamValue | undefined;
}

export default function MyLink({ name, text, url, slug }: IProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: [`myLink${text}`],
    queryFn: () => instance.get(url),
    refetchOnWindowFocus: false,
  });

  return (
    <li
      className={cn(
        "hover:bg-[#F5F5F5] group cursor-pointer",
        slug == name && "bg-[#e4e4e4]"
      )}
    >
      <Link className="flex justify-between px-4 py-3" href={url}>
        <p>{text}</p>
        {error ? (
          <MdErrorOutline />
        ) : (
          <>
            {isLoading ? (
              <Spinner color="primary" />
            ) : (
              <span className="bg-[#F5F5F5] group-hover:bg-white flex items-center justify-center px-2 rounded-lg font-extralight text-[12.8px]">
                {data?.data.total_results.toLocaleString()}
              </span>
            )}
          </>
        )}
      </Link>
    </li>
  );
}
