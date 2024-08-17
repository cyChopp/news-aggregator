import { TArticle } from "@/Types/TShared";
import { guardianApi, theNewsApi, nytimesApi } from "./baseApi";

// Fetch articles from the API
export const fetchNyTimesArticles = async (params: any): Promise<TArticle> => {
  try {
    const response = await nytimesApi.get("/articlesearch.json", {
      ...params,
    });

    const data = response.data.response.docs.map((item: any) => {
      return {
        url: item.web_url,
        imgUrl: item.multimedia[0]?.url
          ? `https://www.nytimes.com/${item.multimedia[0]?.url}`
          : null,
        title: item.headline.main,
        description: item.lead_paragraph,
        category: item.section_name.toLowerCase(),
        publishedAt: item.pub_date,
        author: item.byline.original,
        origin: "nyTimes",
      };
    });

    return {
      meta: {
        origin: "nyTimes",
        currentPage: response.data.response.meta?.offset / 10 - 1, //nyTimes pagination starts from page=0
        pages: Math.floor(response.data.response.meta?.offset / 10),
      },
      response: data,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const fetchTheNewsApiArticles = async (
  params: any
): Promise<TArticle> => {
  try {
    const response = await theNewsApi.get("/all", { ...params });

    const data = response.data.data.map((item: any) => {
      return {
        url: item.url,
        imgUrl: item.image_url,
        title: item.title,
        description: item.description,
        category: item.categories[0],
        publishedAt: item.published_at,
        author: "unknown",
        origin: "theNewsApi",
      };
    });

    return {
      response: data,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const fetchGuardianArticles = async (params: any): Promise<TArticle> => {
  try {
    const response = await guardianApi.get("/search", { ...params });

    const data = response.data.response.results.map((item: any) => {
      return {
        url: item.webUrl,
        imgUrl: item.elements[0]?.assets[1]?.file,
        title: item.webTitle,
        category: item.sectionName,
        publishedAt: item.webPublicationDate,
        author: item.tags[0]?.webTitle ?? "unknown",
        origin: "theGuardian",
      };
    });

    return {
      meta: {
        origin: "theGuardian",
        currentPage: response.data.response.currentPage,
        pages: response.data.response.pages,
      },
      response: data,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
