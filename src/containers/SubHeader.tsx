import Search from "@/components/Search";
import SideInfo from "@/components/SideInfo";
import { TSearch } from "@/Types/TShared";

function SubHeader({
  value,
  isFetching,
  handleSearch,
  handleSubmit,
  setSearch,
}: TSearch) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-4 md:mt-[70px]">
      <Search
        value={value}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        setSearch={setSearch}
        isFetching={isFetching}
      />
      <SideInfo />
    </div>
  );
}

export default SubHeader;
