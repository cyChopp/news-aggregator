import { TSearch } from "@/Types/TShared";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import cross from "@/assets/cross.svg";

function Search({
  value = "",
  isFetching,
  handleSearch,
  handleSubmit,
  setSearch,
}: TSearch) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <div className="order-last md:order-first mt-8 md:mt-0">
      <div className="flex justify-start mb-[20px] text-xl font-bold align-left">
        Search Articles
      </div>
      <div
        className={`h-[40px] w-full justify-between md:w-[400px] border rounded relative flex flex-row rounded-[20px] ${
          isFocused && "border-black"
        }`}
      >
        <input
          disabled={isFetching}
          className=" h-full w-3/5 left-0 pl-4 outline-none rounded-[20px]"
          value={value}
          onChange={handleSearch}
          placeholder="e.g news"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="flex flex-row items-center">
          {value.length && !isFetching ? (
            <img
              className="h-6 w-6 mr-4"
              src={cross}
              onClick={() => setSearch("")}
            />
          ) : null}
          <Button
            disabled={isFetching}
            className=" h-full bg-black border-black-200 right-0 text-white rounded-[20px] px-[15px]"
            type="submit"
            onClick={handleSubmit}
          >
            {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isFetching ? "Searching" : "Search"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Search;
