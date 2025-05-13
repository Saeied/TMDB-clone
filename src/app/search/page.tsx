"use client";
import { useSearchParams } from "next/navigation";
import SearchResultsNumbers from "@/components/search/SearchResults";
import SearchResultsList from "@/components/search/List";

export default function Search() {
  const query = useSearchParams().get("query");

  return (
    <div className="flex items-start gap-8 py-8 px-7 lg:px-20 xl:px-52">
      <SearchResultsNumbers query={query} />
      <SearchResultsList query={query} />
    </div>
  );
}
