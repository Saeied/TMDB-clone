import TopBilledCast from "./Cast";
import Social from "./Social";

export default function LeftColumn() {
  return (
    <div className="w-full lg:w-[77%] flex flex-col">
      <TopBilledCast />
      <hr className="my-3" />
      <Social />
    </div>
  );
}
