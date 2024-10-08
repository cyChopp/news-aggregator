export type TFilter = {
  author?: string;
  category: string;
  date?: Date | undefined;
  sources: string[];
};

export type TPersonalize = {
  author: string;
  category: string;
  sources: string[];
};

export type TSearch = {
  value: string;
  isFetching: boolean;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  setSearch: (v: string) => void;
};

export type TArticle = {
  meta?: { origin: string; currentPage?: number; pages?: number };
  response: {
    url: string | undefined;
    imgUrl: string | undefined;
    title: string | undefined;
    description?: string | undefined;
    category?: string | undefined;
    publishedAt: Date | undefined;
    source?: string | undefined;
    author?: string | undefined;
  };
};

export type TArticleResponse = {
  url: string | undefined;
  imgUrl: string | undefined;
  title: string | undefined;
  description?: string | undefined;
  category?: string | undefined;
  publishedAt: Date | undefined;
  source?: string | undefined;
  author?: string | undefined;
  origin?: string;
};

export type TPagination = {
  nyTimes?: {
    currentPage: number;
    pages: number;
    origin: string;
  };
  theGuardian?: {
    currentPage: number;
    pages: number;
    origin: string;
  };
  theNewsApi?: {
    currentPage: number;
    pages: number;
    origin: string;
  };
};

// API params
export type TParams = {
  nyTimes: {
    q: string;
    sort: string;
    page?: string | undefined;
    fq?: string | undefined;
    end_date?: string | undefined;
    begin_date?: string | undefined;
    "api-key": string;
  };
  guardian: {
    q: string;
    "show-elements": string;
    "show-tags": string;
    "order-by": string;
    page?: string;
    "from-date"?: string;
    "to-date"?: string;
    section?: string;
    "api-key": string;
  };
  theNews: {
    search: string;
    language: string;
    published_on?: string;
    categories?: string;
    api_token: string;
  };
};
