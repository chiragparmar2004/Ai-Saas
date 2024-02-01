"use client";

import * as z from "zod";
import { Heading } from "@/components/heading";
import {   Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { amountOptions, formSchema, resolutionOptions } from "./constant";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
const ImagePage = () => {
  const router = useRouter();
  const proModal=useProModal();
  const [images, setImages] = useState<String[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
  setImages([]);
  const response = await axios.post("/api/image", values);

  const urls = response.data.map((image: { url: string }) => image.url);
  setImages(urls);
  form.reset();
} catch (error:any) {
  if (error?.response?.status === 403) {
    proModal.onOpen();
  } else {
    toast.error("Something went wrong.");
  }
  // Example: Display an error message to the user
  // setErrorModalMessage("An error occurred during image generation");
} finally {
  router.refresh();
}
  };
  return (
    <div>
      <Heading
        title="Image Generator"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/20"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-md grid grid-cols-12 gap-2 bg-white"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                        disabled={isLoading}
                        placeholder="A picture of a horse in Swiss alps"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white rounded-lg   p-3 ">
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resolution"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white rounded-lg p-1">
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}  >
                            {option.label}
                            
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button className="col-span-12 lg:col-span-2">Generate</Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-transparent ">
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && (
            <Empty label="No Images Generated." />
          )}
        <div className="grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {
            images.map((src)=>(
              <Card key={String(src)} className="rounded-lg overflow-hidden">
              
              <div className="relative aspect-square">
                <Image src={String(src)} alt="image" fill/>
               </div>
              <CardFooter className="p-2">
                <Button onClick={()=>window.open(String(src))} variant="secondary" className="w-full">
                <Download className="h-4 w-4 mr-2"/>
                </Button>
              </CardFooter>
              </Card>
            ))
          }
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
