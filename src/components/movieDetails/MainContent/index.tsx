import { MovieProps } from "@/types";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";

export default function MainContent({ movie }: { movie: MovieProps }) {
  return (
    <div className="flex px-7 lg:px-20 xl:px-52">
      <LeftColumn />
      <RightColumn movie={movie} />
    </div>
  );
}
