import Search from "@/components/Search";
import SideInfo from "@/components/SideInfo";
import { TSearch } from "@/utils/TShared";

function SubHeader({ value, isFetching, handleSearch, handleSubmit }: TSearch) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-4 md:mt-[70px]">
      <Search
        value={value}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        isFetching={isFetching}
      />
      <SideInfo />
    </div>
  );
}

export default SubHeader;
