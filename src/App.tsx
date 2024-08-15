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

function App() {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<TArticle[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    setIsFetching(true);
  };

  const apiParams: TParams = {
    nyTimes: {
      q: search,
      // begin_date: sessionStorage.getItem("dateFilter")?.replace(/-/g, ""),
      // end_date: sessionStorage.getItem("dateFilter")?.replace(/-/g, ""),
      fq: 'document_type:("multimedia")',
      section_name: "sport", //category
      "api-key": import.meta.env.VITE_NYTIMES_API_KEY,
    },
    guardian: {
      q: search,
      // "from-date": sessionStorage.getItem("dateFilter"),
      // "to-date": sessionStorage.getItem("dateFilter"),
      "show-elements": "image",
      "show-tags": "contributor",
      // section: "sport",//category
      "api-key": import.meta.env.VITE_GUARDIAN_API_KEY,
    },
    theNews: {
      search: search,
      // published_on: sessionStorage.getItem("dateFilter"),
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
    </>
  );
}

export default App;
