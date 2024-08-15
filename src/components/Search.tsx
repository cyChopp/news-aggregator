import { TSearch } from "@/utils/TShared";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

function Search({
  value = "",
  isFetching,
  handleSearch,
  handleSubmit,
}: TSearch) {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <div className="order-last md:order-first mt-8 md:mt-0">
      <div className="flex justify-start mb-[20px] text-xl font-bold align-left">
        Search Articles
      </div>
      <div
        className={`h-[40px] w-full md:w-[350px] border rounded relative flex flex-row rounded-[20px] ${
          isFocused && "border-black"
        }`}
      >
        <input
          className="absolute h-full w-full left-0 pl-4 outline-none rounded-[20px]"
          value={value}
          onChange={handleSearch}
          placeholder="Type your subject..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {/* <button
          className="absolute h-full bg-black border-black-200 right-0 text-white rounded-[20px] px-[15px]"
          type="submit"
        >
          Search
        </button> */}
        <Button
          disabled={isFetching}
          className="absolute h-full bg-black border-black-200 right-0 text-white rounded-[20px] px-[15px]"
          type="submit"
          onClick={handleSubmit}
        >
          {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Search
        </Button>
      </div>
    </div>
  );
}

export default Search;
