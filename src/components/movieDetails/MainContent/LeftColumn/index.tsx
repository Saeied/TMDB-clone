import TopBilledCast from "./Cast";
import Media from "./Media";
import Social from "./Social";

export default function LeftColumn() {
  return (
    <div className="w-full lg:w-[77%] flex flex-col">
      <TopBilledCast />
      <hr className="my-3" />
      <Social />
      <hr className="my-4" />
      <Media />
      <hr className="my-6" />
    </div>
  );
}
