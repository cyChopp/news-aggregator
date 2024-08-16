import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "./ui/checkbox";
import { Calendar } from "./ui/calendar";
import { formSchema } from "@/utils/schemas";

export function FilterForm({
  formInfo,
  isFilterBy = true,
  onFilterSubmit,
}: {
  formInfo: z.infer<typeof formSchema>;
  isFilterBy: boolean;
  onFilterSubmit: (data: z.infer<typeof formSchema>) => void;
}) {
  const sources = [
    { id: "nyTimes", label: "New York Times" },
    { id: "theGuardian", label: "The Guardian" },
    { id: "theNewsApi", label: "The News Api" },
  ] as const;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sources: ["nyTimes", "theGuardian", "theNewsApi"],
      category: "",
      ...(isFilterBy && { date: new Date() }),
      ...(!isFilterBy && { author: "" }),
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data, "DATA SUBMITED");
    if (isFilterBy) {
      sessionStorage.setItem("filter", JSON.stringify(data));
    } else {
      sessionStorage.setItem("personalize", JSON.stringify(data));
    }

    onFilterSubmit(data);
  }

  function onClear() {
    console.log(form, "DATA CLEARED");

    let clearData = {
      sources: ["nyTimes", "theGuardian", "theNewsApi"],
      category: "",
      ...(isFilterBy && { date: new Date() }),
      ...(!isFilterBy && { author: "" }),
    };

    form.reset(clearData);

    if (isFilterBy) {
      sessionStorage.setItem("filter", JSON.stringify(clearData));
      onFilterSubmit(clearData);
    } else {
      sessionStorage.setItem("personalize", JSON.stringify(clearData));
      onFilterSubmit(clearData);
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="border rounded-full px-4 py-2">
        {isFilterBy ? "Filter by" : "Personalize by"}
      </SheetTrigger>
      <SheetContent className="w-full md:w-[380px]">
        <SheetHeader className="h-full w-full">
          <div className="h-full flex flex-col justify-between overflow-y-scroll p-2">
            <div>
              <SheetTitle className=" font-bold text-xl flex justify-start">
                {isFilterBy ? "Filter by:" : "Personalize by:"}
              </SheetTitle>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  {/* Date Picker */}
                  {isFilterBy && (
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex justify-start  text-black font-bold text-xl">
                            Date:
                          </FormLabel>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {/*Sources */}
                  <FormField
                    control={form.control}
                    name="sources"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="flex justify-start text-black font-bold text-xl">
                            Sources:
                          </FormLabel>
                        </div>
                        {sources.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="sources"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Input Category*/}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-start  text-black font-bold text-xl">
                          Category:
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="e.g News" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {/*Input Author */}
                  {!isFilterBy && (
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex justify-start  text-black font-bold text-xl">
                            Author:
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g Alex Louttchenko"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  <SheetFooter className="!flex !flex-row !justify-between mt-8">
                    <SheetClose asChild>
                      <Button variant="secondary" onClick={onClear}>
                        Clear
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button type="submit">Save</Button>
                    </SheetClose>
                  </SheetFooter>
                </form>
              </Form>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
