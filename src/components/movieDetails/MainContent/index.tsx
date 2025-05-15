import { MovieProps } from "@/types";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

export default function MainContent({ movie }: { movie: MovieProps }) {
  return (
    <div className="flex gap-5 px-7 lg:px-20 xl:px-36 mt-8">
      <LeftColumn />
      <RightColumn movie={movie} />
    </div>
  );
}
