"use client";
import instance from "@/services/interceptor";
import { MovieProps } from "@/types";
import { Button, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FaLink, FaPlay } from "react-icons/fa";

function CustomLi({ title, text }: { title: string; text: String }) {
  return (
    <li className="flex flex-col">
      <strong>{title}</strong>
      <p className="font-thin">{text}</p>
    </li>
  );
}

export default function RightColumn({ movie }: { movie: MovieProps }) {
  const { id } = useParams();

  const {
    data: keywords,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["keywords"],
    queryFn: () => instance.get(`/movie/${id}/keywords`),
  });

  return (
    <div className="hidden lg:flex w-[23%] flex-col pt-10">
      <ul className="flex flex-col gap-5">
        <li>
          <div className="bg-[#F0F0F0] flex justify-between p-2 rounded-lg">
            <Button className="bg-[#57AFD5] text-white rounded-lg">
              <FaPlay className="animate-pulse" />
              Watch Now
            </Button>
            <div>
              <p className="text-[14px]">Dope Thief</p>
              <p className="text-[12px]">on Apple TV+</p>
            </div>
          </div>
        </li>
        <li className="my-4">
          <FaLink size={25} />
        </li>
        <CustomLi title="Status" text={movie.status} />
        <CustomLi
          title="Original Language"
          text={movie.original_language.toUpperCase()}
        />
        <CustomLi title="Budget" text={`$${movie.budget.toLocaleString()}`} />
        <CustomLi title="Revenue" text={`$${movie.revenue.toLocaleString()}`} />

        <li className="flex flex-col gap-2">
          <strong>Keywords</strong>
          <div className="flex flex-wrap gap-x-1 gap-y-2">
            {error ? null : (
              <>
                {isFetching ? (
                  <Spinner variant="wave" />
                ) : (
                  keywords?.data.keywords.map(
                    (item: { id: string; name: string }) => (
                      <span
                        key={item.id}
                        className="bg-[#E5E5E5] text-[14px] font-thin px-2 py-1 rounded-[4px]"
                      >
                        {item.name}
                      </span>
                    )
                  )
                )}
              </>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}
