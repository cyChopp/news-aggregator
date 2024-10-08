import arrow from "@/assets/arrow.svg";

function ReadArticle({ url }: { url: string | undefined }) {
  return (
    <a
      className="flex flex-row items-center font-bold hover:underline"
      href={url}
      target="_blank"
    >
      Read article
      <img className="ml-1 -rotate-[135deg]" src={arrow} />
    </a>
  );
}

export default ReadArticle;
