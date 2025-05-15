import { Cast } from "@/types";
import { Image } from "@heroui/image";
import { FC } from "react";

const CastCard: FC<Cast> = ({ name, profile_path, character }) => {
  return (
    <div className="min-w-[140px] border flex flex-col gap-1 rounded-lg shadow-lg pb-2">
      <Image
        className="rounded-none rounded-t-lg"
        height={180}
        width={140}
        src={
          profile_path == null
            ? "/images/notFound/no-avatar.png"
            : `https://image.tmdb.org/t/p/w154${profile_path}`
        }
      />
      <div className="ps-2">
        <strong className="text-[15px]">{name}</strong>
        <p className="text-[14px]">{character}</p>
      </div>
    </div>
  );
};

export default CastCard;
