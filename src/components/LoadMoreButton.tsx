import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import arrow from "@/assets/arrow.svg";
import "../App.css";
const LoadMoreButton = ({
  isFetching,
  loadMorePages,
}: {
  isFetching: boolean;
  loadMorePages: () => void;
}) => {
  return (
    <Button
      disabled={isFetching}
      className="rounded-full"
      onClick={loadMorePages}
    >
      {/* svgColor is for changing the svg color to white - tailwind or inline styling don't work */}
      {!isFetching && <img className="mr-1 svgColor" src={arrow} />}
      {isFetching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {isFetching ? "Loading..." : "Load more"}
    </Button>
  );
};

export default LoadMoreButton;
