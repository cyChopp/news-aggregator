import { useEffect, useState } from "react";
import "@/App.css";
import Header from "@/components/Header";
import SubHeader from "@/containers/SubHeader";
import {
  TArticle,
  TArticleResponse,
  TPagination,
  TParams,
} from "@/Types/TShared";
import {
  fetchGuardianArticles,
  fetchNyTimesArticles,
  fetchTheNewsApiArticles,
} from "@/utils/api";
import { format } from "date-fns";
import { loadKey } from "@/utils/loadKey";
import { FilterForm } from "@/components/FilterForm";
import { z } from "zod";
import { formSchema } from "@/Schemas/schemas";
import Article from "./components/Article";
import Seperator from "./components/Seperator";
import { Button } from "./components/ui/button";
import { Loader2 } from "lucide-react";
import { extractPagination } from "./utils/extractPagination";

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
  //Retrieve session data for filter & personalize if available, if not, set default values
  const [filter, setFilter] = useState<z.infer<typeof formSchema>>(() =>
    loadKey("filter", filterDefaultValues)
  );
  const [personalize, setPersonalize] = useState(() =>
    loadKey("personalize", personalizeDefaultValues)
  );

  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<TArticleResponse[]>([]);
  const [personalizedData, setPersonalizedData] = useState<TArticleResponse[]>(
    []
  );
  const [showPersonalizedData, setShowPersonalizedData] =
    useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TPagination>({});
  const [loadMore, setLoadMore] = useState<boolean>(false);

  const showLoadButton =
    data.length > 0 && Object.keys(pagination).length > 0 && search.length > 0;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    setIsFetching(true);
  };

  const personalizeData = (filterData: TArticleResponse[]) => {
    if (showPersonalizedData) {
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

      setPersonalizedData(personalizedData);

      /* 
      This will help us to show the fetched data in case 
      the user searched for articles while having some
      personalized filters on and clears them after that.
      */
      setData(filterData);
    } else {
      setData(filterData);
    }
  };

  const loadMorePages = () => {
    let loadMore = false;
    const temporaryObj = { ...pagination };

    const checkAndUpdate = (source: "theGuardian" | "nyTimes") => {
      const sourceData = temporaryObj[source];
      if (sourceData?.currentPage && sourceData.pages) {
        if (sourceData.currentPage < sourceData.pages) {
          sourceData.currentPage += 1;
          setPagination(temporaryObj);
          setIsFetching(true);
          loadMore = true;
        }
      }
    };
    checkAndUpdate("theGuardian");
    checkAndUpdate("nyTimes");

    //Show load more button if at least one source has more articles
    setLoadMore(loadMore);
  };

  // API filter parameters
  const apiParams: TParams = {
    nyTimes: {
      q: search,
      sort: "relevance",
      ...(pagination.nyTimes && {
        page: pagination.nyTimes.currentPage.toString(),
      }),
      ...(filter.category && { fq: `section_name: ${filter.category}` }),
      ...(filter.date && { begin_date: dateParser(filter.date) }),
      ...(filter.date && { end_date: dateParser(filter.date) }),
      "api-key": import.meta.env.VITE_NYTIMES_API_KEY,
    },
    guardian: {
      q: search,
      "show-elements": "image",
      "show-tags": "contributor",
      "order-by": "relevance",
      ...(pagination.theGuardian && {
        page: pagination.theGuardian.currentPage.toString(),
      }),
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

  useEffect(() => {
    personalizeData(data);
  }, [personalize]);

  useEffect(() => {
    let isMounted = true;

    if (isFetching && isMounted) {
      let sources: Array<() => Promise<TArticle>> = [];

      // checks for !loadMore because the api's free plan doesn't provide pagination
      filter.sources.includes("theNewsApi") &&
        !loadMore &&
        sources.push(() =>
          fetchTheNewsApiArticles({
            params: apiParams.theNews,
          })
        );
      filter.sources.includes("nyTimes") &&
        sources.push(() =>
          fetchNyTimesArticles({
            params: apiParams.nyTimes,
          })
        );
      filter.sources.includes("theGuardian") &&
        sources.push(() =>
          fetchGuardianArticles({
            params: apiParams.guardian,
          })
        );

      //FETCH ARTICLES
      (async () => {
        try {
          const values = await Promise.all([...sources.map((f) => f())]);

          //add pagination based on the response's meta
          const pagination: TPagination = extractPagination(values);
          setPagination(pagination);

          //structure data
          let dataResponse = values.map((item) => item.response).flat();

          //If user user loads more articles, they are being stacked on top of the previous ones
          if (loadMore) {
            personalizeData([...data, ...dataResponse]);
          } else {
            personalizeData([...dataResponse]);
          }
        } catch (error) {
          console.log(error, "ERROR");
        } finally {
          setIsFetching(false);
        }
      })();
    }
    return () => {
      // Clean up on unmount
      isMounted = false;
    };
  }, [isFetching, loadMore]);

  return (
    <>
      <Header />
      <SubHeader
        value={search}
        handleSearch={handleSearch}
        handleSubmit={handleSubmit}
        setSearch={setSearch}
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
          setShowPersonalizedData={setShowPersonalizedData}
        />
      </div>

      <Seperator />

      <div className="mt-[40px] grid grid-cols-1 md:grid-cols-2 gap-8">
        {(showPersonalizedData ? personalizedData : data).map(
          (article: TArticleResponse, idx: number) => (
            <Article key={idx} article={article} />
          )
        )}
      </div>

      {showLoadButton && (
        <div className="w-full flex justify-center my-12">
          <Button
            disabled={isFetching}
            className="rounded-full"
            onClick={loadMorePages}
          >
            {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isFetching ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </>
  );
}

export default App;
