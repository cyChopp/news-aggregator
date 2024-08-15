import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";

import "@/App.css";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

function Filter({ date, setDate }: any) {
  const [hasFilters, setHasFilters] = useState(false);
  const [category, setCategory] = useState("");

  //   useEffect(() => {
  //     let obj = sessionStorage.getItem("filterBy");

  //     console.log(obj, "Object.values(JSON.parse(obj))");
  //   }, [date]);

  const handleSave = () => {
    if (date) {
      let filterBy = {
        date: format(date, "yyyy-MM-dd"),
      };
      sessionStorage.setItem("filterBy", JSON.stringify(filterBy));

      let obj = sessionStorage.getItem("filterBy");
      if (obj) {
        // console.log(JSON.parse(obj));
      }
    } else {
      sessionStorage.setItem("filterBy", JSON.stringify({ filterBy: null }));
      //   console.log(sessionStorage.getItem("filterBy"));
    }
  };
  return (
    <div>
      <Sheet>
        <SheetTrigger
          className={`border rounded-full px-4 py-2 ${
            hasFilters && "bg-black text-white"
          }`}
        >
          Filter by
        </SheetTrigger>
        <SheetContent className="w-full md:w-[380px]">
          <SheetHeader>
            <SheetTitle>Filter by date:</SheetTitle>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              initialFocus
            />

            <Input
              type="text"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
            <div className="flex items- space-x-2">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                NY Times News
              </label>
            </div>
            <div className="flex items- space-x-2">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                The Guardian
              </label>
            </div>
            <div className="flex items- space-x-2">
              <Checkbox id="terms2" />
              <label
                htmlFor="terms2"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                The News API
              </label>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <button type="submit" onClick={handleSave}>
                  Save
                </button>
              </SheetClose>
            </SheetFooter>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Filter;
