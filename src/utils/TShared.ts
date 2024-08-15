export type TSearch = {
  value: string;
  isFetching: boolean;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};
