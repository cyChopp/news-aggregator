import { TArticle, TPagination } from "@/Types/TShared";

export const extractPagination = (values: TArticle[]): TPagination => {
  const pagination: any = {};
  values.forEach(({ meta }) => {
    if (meta?.origin && meta.currentPage && meta.pages) {
      if (meta.currentPage < meta.pages) {
        pagination[meta.origin] = meta;
      }
    }
  });
  return pagination;
};
