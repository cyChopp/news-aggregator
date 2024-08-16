import { TArticle } from "@/utils/TShared";
import { format } from "date-fns";
import ReadArticle from "./ReadArticle";

type TProp = {
  article: TArticle;
};

const defaultImageLink =
  "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";

function Article({ article }: TProp) {
  const {
    url = "",
    imgUrl = defaultImageLink,
    title = "",
    description = "",
    category = "",
    publishedAt = undefined,
    author = "unknown",
  } = article;

  const handleBrokenImages = (e: any) => {
    e.target.src = defaultImageLink;
  };
  return (
    <div className="mb-8 w-full md:max-w-[470px]">
      <div className="relative w-full h-[250px] sm:h-[350px] md:h-[250px] rounded-lg overflow-hidden shadow-md">
        <img
          className="w-full h-full absolute object-cover"
          src={imgUrl}
          onError={handleBrokenImages}
        />
        <div className="absolute h-[70px] w-full bottom-0 backdrop-blur-xl bg-white/10 text-white px-4 py-2 border-t border-[#d0d0d029]">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <div>{author}</div>
              <div className="text-sm text-gray-200">
                {publishedAt && format(publishedAt, "MM-dd-yyyy")}
              </div>
            </div>
            <div>{category}</div>
          </div>
        </div>
      </div>
      <div className="pt-4 h-[200px]">
        <div className="h-[200px] flex flex-col justify-between">
          <div>
            <p className="font-bold text-2xl pb-3">{title}</p>
            <p className="pb-4 pr-2">
              {description && description.length > 190
                ? description.slice(0, 190) + "..."
                : description}
            </p>
          </div>
          <ReadArticle url={url} />
        </div>
      </div>
    </div>
  );
}

export default Article;
