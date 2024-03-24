import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ApplicantImageData } from "@/types/application";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import { IoMdTrash } from "react-icons/io";
import z from "zod";
import {
  FormSchema,
  genders,
  nationalities,
  maritalStatusOptions,
} from "./data";

interface Props {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  onImageUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageDelete: () => void;
  imagePreview: string | null;
  imageErrorMessage: string;
  applicantImageData: ApplicantImageData;
  uploadingImage: boolean;
  draftSaving: boolean;
  isSubmitting: boolean;
}

const Profile = ({
  form,
  onImageUpdate,
  onImageDelete,
  imagePreview,
  imageErrorMessage,
  applicantImageData,
  uploadingImage,
  draftSaving,
  isSubmitting,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
        Build Your Profile
      </h1>
      <p className="my-3 text-gray-800 dark:text-gray-400">
        Let&rsquo;s get personal! Share your details to begin crafting your
        unique academic profile.
      </p>
      <form className="my-6 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || draftSaving}
                    placeholder="Enter your first name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Middle Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || draftSaving}
                    placeholder="Enter your middle name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || draftSaving}
                    placeholder="Enter your last name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={isSubmitting || draftSaving}>
                      <SelectValue placeholder="Select your Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date Of Birth</FormLabel>
                <FormControl>
                  <Input type="date" id="Date Of Birth" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="citizenship"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Nationality</FormLabel>
                <Popover>
                  <PopoverTrigger
                    disabled={isSubmitting || draftSaving}
                    asChild
                  >
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? nationalities.find(
                              (nationality) =>
                                nationality.value === field.value,
                            )?.label
                          : "Select nationality"}
                        <BiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search nationality..." />
                      <CommandList>
                        <CommandEmpty>No nationality found.</CommandEmpty>
                        <CommandGroup>
                          {nationalities.map((nationality) => (
                            <CommandItem
                              value={nationality.label}
                              key={nationality.value}
                              onSelect={() => {
                                form.setValue("citizenship", nationality.value);
                              }}
                            >
                              <BiCheck
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  nationality.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {nationality.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="placeOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Place Of birth</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || draftSaving}
                    placeholder="Place of birth"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maritalStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marital Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger disabled={isSubmitting || draftSaving}>
                      <SelectValue placeholder="Select your marital status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {maritalStatusOptions.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="disability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Disability</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || draftSaving}
                    placeholder="Enter any disabilities (optional)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nida"
            render={({ field }) => (
              <FormItem>
                <FormLabel>NIDA</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting || draftSaving}
                    placeholder="Enter your NIDA number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your NIDA number is a unique identifier assigned to you by
                  Tanzania’s National Identification Authority (NIDA). If you
                  don’t have one, you can apply for it on the{" "}
                  <Link
                    target="_blank"
                    href="https://services.nida.go.tz/nidportal/"
                    className="font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    official NIDA website
                  </Link>
                  .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
      <Separator className="my-4 h-1.5" />
      <div className="my-6 grid gap-6 md:grid-cols-2">
        <div>
          <h1 className="text-lg font-bold text-green-700">Formal Image</h1>
          <div className="mt-1 space-y-3 text-xs">
            <p>
              Your application requires a formal photo. It should be a clear
              head-shot with you in professional attire, facing the camera
              against a neutral background. This photo is a representation of
              you, so make it impactful!
            </p>
            <p>
              Remember, your application isn’t complete without your photo! Make
              sure to upload it for acceptance.
            </p>
            <p>
              Need details on photo requirements? Check out our{" "}
              <Link
                target="_blank"
                href="#"
                className="font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                photo guidelines
              </Link>{" "}
              for all the information you need.
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col-reverse items-center gap-3 md:flex-row">
          <input
            ref={fileInputRef}
            type="file"
            id="image"
            name="image"
            accept="image/jpeg, image/jpg, image/gif ,image/png, image/webp"
            onChange={onImageUpdate}
            className="hidden"
          />

          {imagePreview ? (
            <div className="relative h-48 w-36">
              <Image
                alt="Applicant Image"
                fill
                quality={100}
                className="inline-block rounded-lg object-cover"
                src={imagePreview}
              />
            </div>
          ) : (
            <div className="dark:hover:bg-bray-800 flex h-48 w-36 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"></div>
          )}

          {!uploadingImage && (
            <div className="flex flex-col gap-2">
              <Button
                disabled={isSubmitting || draftSaving}
                variant={"secondary"}
                onClick={handleButtonClick}
              >
                <AiOutlineCloudUpload className="mr-2 h-4 w-4 shrink-0" />
                {applicantImageData.imageUrl ? "Change" : "Upload"} image
              </Button>
              {applicantImageData.name && (
                <span className="text-small flex items-center gap-x-2">
                  {applicantImageData.name}{" "}
                  <Button
                    onClick={onImageDelete}
                    variant={"ghost"}
                    disabled={isSubmitting || draftSaving}
                    size={"icon"}
                  >
                    <IoMdTrash className="h-6 w-6 shrink-0 cursor-pointer text-red-600" />
                  </Button>
                </span>
              )}
              {imageErrorMessage && (
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" />
                  {imageErrorMessage}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
