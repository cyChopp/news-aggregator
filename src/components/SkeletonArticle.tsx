import React from "react";
import { Skeleton } from "./ui/skeleton";

function SkeletonArticle() {
  return (
    <div className="flex flex-col space-y-3 mb-8 w-full md:max-w-[470px]">
      <Skeleton className="h-[250px] sm:h-[350px] md:h-[250px]  w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <span className="h-4"></span>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}

export default SkeletonArticle;
