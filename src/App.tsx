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
import { loadKey } from "@/utils/loadKey";
import { FilterForm } from "@/components/FilterForm";
import { z } from "zod";
import { formSchema } from "@/Schemas/schemas";
import Article from "./components/Article";
import Seperator from "./components/Seperator";
import { extractPagination } from "./utils/extractPagination";
import SkeletonArticle from "./components/SkeletonArticle";
import { v4 as uuidv4 } from "uuid";
import LoadMoreButton from "./components/LoadMoreButton";
import { apiParams } from "./utils/apiParams";

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
  const [dataNotFound, setDataNotFound] = useState<boolean>(false);

  const showLoadButton =
    data.length > 0 && Object.keys(pagination).length > 0 && search.length > 0;

  let params = apiParams({ search, filter, pagination });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    setIsFetching(true);
    setDataNotFound(false);
  };

  const personalizeData = (filterData: TArticleResponse[]) => {
    if (showPersonalizedData) {
      let personalizedData = [...filterData];

      if (personalize.category !== "") {
        personalizedData = personalizedData.filter(
          (item) => item.category === personalize.category
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

  useEffect(() => {
    personalizeData(data);
  }, [personalize]);

  useEffect(() => {
    let isMounted = true;

    if (isFetching && isMounted) {
      let sources: Array<() => Promise<TArticle>> = [];

      // Add article sources based on the filter by

      // Checks for !loadMore because the api's free plan doesn't provide pagination (theNewsApi)
      filter.sources.includes("theNewsApi") &&
        !loadMore &&
        sources.push(() =>
          fetchTheNewsApiArticles({
            params: params.theNews,
          })
        );
      filter.sources.includes("nyTimes") &&
        sources.push(() =>
          fetchNyTimesArticles({
            params: params.nyTimes,
          })
        );
      filter.sources.includes("theGuardian") &&
        sources.push(() =>
          fetchGuardianArticles({
            params: params.guardian,
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

          if ([...data, ...dataResponse].length === 0) {
            setDataNotFound(true);
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

      {dataNotFound && (
        <div className="w-full flex justify-center mt-10 text-xl  text-gray-500">
          No articles found. Check again your input, filter or personalization.
        </div>
      )}
      <div className="mt-[40px] grid grid-cols-1 md:grid-cols-2 gap-8">
        {(showPersonalizedData ? personalizedData : data).map(
          (article: TArticleResponse, idx: number) => (
            <Article key={idx} article={article} />
          )
        )}
        {isFetching &&
          [...Array(4)].map(() => {
            return <SkeletonArticle key={uuidv4()} />;
          })}
      </div>

      {showLoadButton && (
        <div className="w-full flex justify-center my-12">
          <LoadMoreButton
            isFetching={isFetching}
            loadMorePages={loadMorePages}
          />
        </div>
      )}
    </>
  );
}

export default App;
