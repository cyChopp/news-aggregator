import { TArticle, TParams } from "./TShared";
import { guardianApi, theNewsApi, nytimesApi } from "./baseApi";

// Fetch articles from the API
export const fetchNyTimesArticles = async (
  params: any
): Promise<TArticle[]> => {
  try {
    const response = await nytimesApi.get("/articlesearch.json", {
      ...params,
    });

    return response.data.response.docs.map((item: any) => {
      return {
        url: item.web_url,
        imgUrl: item.multimedia[0]?.url
          ? `https://www.nytimes.com/${item.multimedia[0]?.url}`
          : null,
        title: item.headline.main,
        description: item.lead_paragraph,
        category: item.section_name,
        publishedAt: item.pub_date,
        author: item.byline.original,
      };
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchTheNewsApiArticles = async (
  params: any
): Promise<TArticle[]> => {
  try {
    const response = await theNewsApi.get("/all", { ...params });

    return response.data.data.map((item: any) => {
      return {
        url: item.url,
        imgUrl: item.image_url,
        title: item.title,
        description: item.description,
        category: item.categories[0],
        publishedAt: item.published_at,
        author: "unknown",
      };
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchGuardianArticles = async (
  params: any
): Promise<TArticle[]> => {
  try {
    const response = await guardianApi.get("/search", { ...params });

    return response.data.response.results.map((item: any) => {
      return {
        url: item.webUrl,
        imgUrl: item.elements[0]?.assets[1]?.file,
        title: item.webTitle,
        category: item.sectionName,
        publishedAt: item.webPublicationDate,
        author: item.tags[0]?.webTitle ?? "unknown",
      };
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
