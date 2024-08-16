import { useEffect, useState } from "react";
import "@/App.css";
import Header from "@/components/Header";
import SubHeader from "@/containers/SubHeader";
import { TParams } from "@/utils/TShared";
import {
  fetchGuardianArticles,
  fetchNyTimesArticles,
  fetchTheNewsApiArticles,
} from "@/utils/api";
import { format } from "date-fns";
import { loadKey } from "@/utils/loadKey";
import { FilterForm } from "@/components/FilterForm";
import { z } from "zod";
import { formSchema } from "@/utils/schemas";
import Article from "./components/Article";
import Seperator from "./components/Seperator";

const dateParser = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

let filterDefaultValues = {
  category: "",
  date: new Date(),
  sources: ["nyTimes", "theGuardian", "theNewsApi"],
};
let personalizeDefaultValues = {
  author: "",
  category: "",
  sources: ["nyTimes", "theGuardian", "theNewsApi"],
};

function App() {
  const [filter, setFilter] = useState<z.infer<typeof formSchema>>(() =>
    loadKey("filter", filterDefaultValues)
  );
  const [personalize, setPersonalize] = useState(() =>
    loadKey("personalize", personalizeDefaultValues)
  );

  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
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
      // fq: 'document_type:("multimedia")',
      fq: `section_name: ${filter.category}`,
      ...(filter.date && { begin_date: dateParser(filter.date) }),
      ...(filter.date && { end_date: dateParser(filter.date) }),
      ...(filter.category !== "" && {}),
      "api-key": import.meta.env.VITE_NYTIMES_API_KEY,
    },
    guardian: {
      q: search,
      "show-elements": "image",
      "show-tags": "contributor",
      ...(filter.date && { "from-date": dateParser(filter.date) }),
      ...(filter.date && { "to-date": dateParser(filter.date) }),
      ...(filter.category !== "" && {
        section: filter.category,
      }),
      "api-key": import.meta.env.VITE_GUARDIAN_API_KEY,
    },
    theNews: {
      search: search,
      language: "en",
      ...(filter.date && { published_on: dateParser(filter.date) }),
      ...(filter.category !== "" && {
        categories: filter.category,
      }),
      api_token: import.meta.env.VITE_THENEWSAPI_API_KEY,
    },
  };

  // Probably can do something like this instread of the if statements, but the api structure should be modified
  /* for(const source in sources){
    if(source){
    api.['nyTimes']({
        params:apiParams['nyTiems']
      })
    }
  }
*/

  const personalizeData = (filterData: any) => {
    if (filterData) {
      let personalizedData = [...filterData];

      if (personalize.category !== "") {
        personalizedData = personalizedData.filter(
          (item: any) => item.category === personalize.category
        );
      }
      if (personalize.author !== "") {
        personalizedData = personalizedData.filter(
          (item) => item.author === personalize.author
        );
      }
      if (personalize.sources.legnth !== 2) {
        personalizedData = personalizedData.filter((item) =>
          personalize.sources.includes(item.origin)
        );
      }
      console.log(personalizedData, "PERSONALIZED DATA");

      setData(personalizedData);
    }
  };

  useEffect(() => {
    personalizeData(data);
  }, [personalize]);

  useEffect(() => {
    let sources = [];
    if (filter.sources.includes("nyTimes")) {
      sources.push(
        fetchNyTimesArticles({
          params: apiParams.nyTimes,
        })
      );
    }
    if (filter.sources.includes("theGuardian")) {
      sources.push(
        fetchGuardianArticles({
          params: apiParams.guardian,
        })
      );
    }
    if (filter.sources.includes("theNewsApi")) {
      sources.push(
        fetchTheNewsApiArticles({
          params: apiParams.theNews,
        })
      );
    }
    if (isFetching === true) {
      (async () => {
        await Promise.all([...sources])
          .then((values) => {
            console.log(values, "VALUES");
            // setData([...data, ...values.flat()]);
            personalizeData([...values.flat()]);
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
        <FilterForm
          isFilterBy={true}
          onFilterSubmit={setFilter}
          formInfo={filter}
        />

        <FilterForm
          isFilterBy={false}
          onFilterSubmit={setPersonalize}
          formInfo={personalize}
        />
      </div>

      <Seperator />

      <div className="mt-[40px] grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((article: any, idx: number) => {
          return <Article key={idx} article={article} />;
        })}
      </div>
    </>
  );
}

export default App;
