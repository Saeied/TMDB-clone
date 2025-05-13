import { cn } from "@/lib/utils";
import { Image } from "@heroui/react";

interface PersonProps {
  name: string;
  known_for_department: string;
  known_for: { title?: string; name?: string }[];
  profile_path: string | null;
}

export default function PersonCard({
  name,
  known_for,
  known_for_department,
  profile_path,
}: PersonProps) {
  return (
    <div className="flex gap-4">
      <Image
        className={cn("object-cover", !profile_path && "border")}
        width={70}
        height={70}
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w92${profile_path}`
            : "/images/notFound/no-avatar.png"
        }
      />
      <div className="flex flex-col justify-center">
        <h3 className="text-[20px]">{name}</h3>
        <div className="text-[16px] flex">
          <p>
            {known_for_department}{` • `}
            <span className="text-gray-500 text-[14px] font-thin">{known_for.map((item) => `${item.title}, `)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
