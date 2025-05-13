import MyLink from "./Link";
import { RiInformation2Fill } from "react-icons/ri";

interface Iprops {
  query: string | null;
}

export default function SearchResultsNumbers({ query }: Iprops) {
  const searchResultsLinks: { text: string; url: string }[] = [
    {
      text: "Movies",
      url: `/search/movie?query=${query}`,
    },
    {
      text: "TV Shows",
      url: `/search/tv?query=${query}`,
    },
    {
      text: "Keywords",
      url: `/search/keyword?query=${query}`,
    },
    {
      text: "Collections",
      url: `/search/collection?query=${query}`,
    },
    {
      text: "People",
      url: `/search/person?query=${query}`,
    },
    {
      text: "Companies",
      url: `/search/company?query=${query}`,
    },
  ];

  return (
    <div className="hidden md:flex flex-col gap-6 w-[22%]">
      <div className="rounded-lg overflow-hidden border">
        <h3 className="bg-[#01B4E4] text-white text-[20px] px-5 py-4">
          Search Results
        </h3>
        <div>
          <ul className="bg-white py-2">
            {searchResultsLinks.map((item, index) => (
              <MyLink key={index} text={item.text} url={item.url} />
            ))}
          </ul>
        </div>
      </div>
      <p className="text-base text-gray-500 text-pretty">
        <RiInformation2Fill className="inline-block mr-1" color="black" size={20} />
        Tip: You can use the 'y:' filter to narrow your results by year.
        Example: 'star wars y:1977'.
      </p>
    </div>
  );
}
