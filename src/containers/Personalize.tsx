import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

function Personalize() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [category, setCategory] = useState<string>("");

  const handleSave = () => {
    if (date) {
      let filterBy = {
        date: format(date, "yyyy-MM-dd"),
      };
      sessionStorage.setItem("filterBy", JSON.stringify(filterBy));
    } else {
      sessionStorage.setItem("filterBy", JSON.stringify({ filterBy: {} }));
      //   console.log(sessionStorage.getItem("filterBy"));
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger className={`border rounded-full px-4 py-2`}>
          Filter by
        </SheetTrigger>
        <SheetContent className="w-full md:w-[380px]">
          <SheetHeader>
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
            <Input
              type="text"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
            <Input
              type="text"
              placeholder="Authors"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
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

export default Personalize;
