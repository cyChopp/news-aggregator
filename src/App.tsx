import { useEffect, useState } from "react";
import "./App.css";
import Header from "@/components/Header";
import SubHeader from "@/containers/SubHeader";
import { TArticle, TParams } from "./utils/TShared";
import {
  fetchGuardianArticles,
  fetchNyTimesArticles,
  fetchTheNewsApiArticles,
} from "./utils/api";
import Personalize from "./containers/Personalize";
import Filter from "./containers/Filter";
import { format } from "date-fns";

function App() {
  const [date, setDate] = useState(Date.now());
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<TArticle[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    setIsFetching(true);
  };

  useEffect(() => {
    console.log(format(date, "yyyy-MM-dd"), "date!!!");
  }, [date]);
  // if (sessionStorage.getItem("filterBy")) {
  //   console.log(
  //     JSON.parse(sessionStorage.getItem("filterBy") as any),
  //     "!!!!!!±!!"
  //   );
  // }
  const apiParams: TParams = {
    nyTimes: {
      q: search,
      begin_date: format(date as any, "yyyy-MM-dd"),
      end_date: format(date as any, "yyyy-MM-dd"),
      fq: 'document_type:("multimedia")',
      section_name: "sport", //category
      "api-key": import.meta.env.VITE_NYTIMES_API_KEY,
    },
    guardian: {
      q: search,
      "from-date": format(date as any, "yyyy-MM-dd"),
      "to-date": format(date as any, "yyyy-MM-dd"),
      "show-elements": "image",
      "show-tags": "contributor",
      // section: "sport",//category
      "api-key": import.meta.env.VITE_GUARDIAN_API_KEY,
    },
    theNews: {
      search: search,
      published_on: format(date as any, "yyyy-MM-dd"),
      language: "en",
      // categories: "sport",//category
      api_token: import.meta.env.VITE_THENEWSAPI_API_KEY,
    },
  };

  useEffect(() => {
    if (isFetching) {
      (async () => {
        await Promise.all([
          fetchTheNewsApiArticles({
            params: apiParams.theNews,
          }),
          fetchNyTimesArticles({
            params: apiParams.nyTimes,
          }),
          fetchGuardianArticles({
            params: apiParams.guardian,
          }),
        ])
          .then((values) => {
            console.log(values, "VALUES");
            setData([...data, ...values.flat()]);
          })
          .finally(() => {
            setIsFetching(false);
            setSearch("");
          });
      })();
    }
  }, [isFetching]);

  return (
    <>
      <Header />
      <SubHeader
        value={search}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        isFetching={isFetching}
      />
      <div className="flex flex-row gap-4 mt-[40px]">
        <Filter date={date} setDate={setDate} />
        <Personalize />
      </div>
    </>
  );
}

export default App;
