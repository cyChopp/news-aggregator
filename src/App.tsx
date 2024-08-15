import { useState } from "react";
import "./App.css";
import Header from "@/components/Header";
import SubHeader from "@/containers/SubHeader";

function App() {
  const [search, setSearch] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    setIsFetching(true);

    const timerId = setTimeout(() => {
      setIsFetching(false);
    }, 5000);

    console.log(search, "SEARCH");
    setSearch("");

    return () => clearTimeout(timerId);
  };

  return (
    <>
      <Header />
      <SubHeader
        value={search}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        isFetching={isFetching}
      />
    </>
  );
}

export default App;
