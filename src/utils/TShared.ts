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
};

export type TArticle = {
  url: string | undefined;
  imgUrl: string | undefined;
  title: string | undefined;
  description?: string | undefined;
  category?: string | undefined;
  publishedAt: Date | undefined;
  source?: string | undefined;
  author?: string | undefined;
};

export type TSource = {
  nyTime: boolean;
  theGuardian: boolean;
  theNewsApi: boolean;
};

// API params
export type TParams = {
  nyTimes: {
    q: string | null;
    begin_date?: string | null;
    end_date?: string | null;
    fq?: string;
    section_name?: string | null;
    "api-key": string;
  };
  guardian: {
    q: string | null;
    "from-date"?: string | null;
    "to-date"?: string | null;
    "show-elements": string;
    "show-tags": string;
    section?: string;
    "api-key": string;
  };
  theNews: {
    search: string | null;
    published_on?: string | null;
    language: string;
    categories?: string;
    api_token: string;
  };
};

//API
export type TTheNewsApi = {
  uuid: string;
  title: string;
  description: string;
  keywords: string;
  snippet: string;
  url: string;
  image_url: string;
  language: string;
  published_at: string;
  source: string;
  categories: string[];
  relevance_score: number;
};
