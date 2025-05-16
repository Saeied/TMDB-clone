import instance from "@/services/interceptor";
import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Spinner,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

const categories = [
  {
    id: 1,
    title: "Popularity Descending",
    value: "popularity.desc",
  },
  {
    id: 2,
    title: "Popularity Ascending",
    value: "popularity.asc",
  },
  {
    id: 3,
    title: "Release Date Descending",
    value: "release_date.desc",
  },
  {
    id: 4,
    title: "Release Date Ascending",
    value: "release_date.asc",
  },
  {
    id: 5,
    title: "Rating Descending",
    value: "vote_average.desc",
  },
  {
    id: 6,
    title: "Rating Ascending",
    value: "vote_average.asc",
  },
];

export default function MoviesFilteringCol({
  categoryValue,
  setCategoryValue,
  genresArray,
  setGenresArray,
  setPage,
  setShouldRefetch,
}: {
  categoryValue: string;
  genresArray: number[];
  setCategoryValue: Dispatch<SetStateAction<string>>;
  setGenresArray: Dispatch<SetStateAction<number[]>>;
  setPage: Dispatch<SetStateAction<number>>;
  setShouldRefetch: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, isFetching } = useQuery<{
    data: { genres: { name: string; id: number }[] };
  }>({
    queryKey: ["genres"],
    queryFn: () => instance.get("/genre/movie/list"),
  });

  return (
    <div className="w-[300px] pt-2 hidden md:flex flex-col gap-4">
      {isFetching ? (
        <Spinner />
      ) : (
        <Accordion className="rounded-lg shadow-xl">
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Categories"
            className="ps-2"
          >
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <Checkbox
                  key={category.id}
                  value={category.value}
                  isSelected={categoryValue == category.value}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setCategoryValue(e.target.value);
                    } else {
                      setCategoryValue("");
                    }
                  }}
                >
                  {category.title}
                </Checkbox>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Genres"
            className="ps-2"
          >
            <div className="flex flex-wrap gap-1">
              {data?.data.genres.map((genre) => (
                <Button
                  key={genre.id}
                  id={genre.id.toString()}
                  variant={
                    genresArray.includes(genre.id) ? "solid" : "bordered"
                  }
                  onPress={() => {
                    if (!genresArray.some((item) => item == genre.id)) {
                      setGenresArray((prev) => [...prev, genre.id]);
                    } else {
                      const newArray = genresArray.filter(
                        (item) => item != genre.id
                      );
                      setGenresArray(newArray);
                    }
                  }}
                >
                  {genre.name}
                </Button>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      )}
      <Button
        className="bg-[#01B4E4] text-white w-full text-[20px] rounded-2xl"
        onPress={() => {
          setPage(1);
          setShouldRefetch(true);
        }}
      >
        search
      </Button>
    </div>
  );
}
