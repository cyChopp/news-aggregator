import { TPagination, TParams } from "@/Types/TShared";
import { dateParser } from "./dateParser";
import { formSchema } from "@/Schemas/schemas";
import { z } from "zod";

export const apiParams = ({
  search,
  pagination,
  filter,
}: {
  search: string;
  pagination: TPagination;
  filter: z.infer<typeof formSchema>;
}) => {
  // API filter parameters
  const params: TParams = {
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
  return params;
};
