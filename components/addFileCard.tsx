import { Button } from "@/components/ui/button";
import { MdAdd } from "react-icons/md";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { uploadFile } from "@/app/actions";

const AddFileCard = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>();

  const handleImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      //FIXME: set file error to null
      // setImageErrorMessage("");

      if (file) {
        //FIXME: Validate file
        // const imageValidation = ImageSchema.safeParse({ image: file });

        // if (!imageValidation.success) {
        //   toast.error(imageValidation.error.errors[0].message, {
        //     duration: 6000,
        //   });
        //   return;
        // }

        const url = URL.createObjectURL(file);
        setImagePreview(url);

        const formData = new FormData();
        formData.append("file", file);
        await uploadFile(formData);
      }

      event.target.value = "";
    },
    [],
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-[450px]">
      <input
        ref={fileInputRef}
        type="file"
        id="image"
        name="image"
        accept="image/jpeg, image/jpg, image/gif ,image/png, image/webp"
        onChange={handleImageChange}
        className="hidden"
      />
      <Button
        className="flex w-full items-center justify-center gap-x-2 py-5"
        variant="outline"
        size="lg"
        onClick={handleButtonClick}
      >
        <MdAdd className="size-6 flex-shrink-0" />
        <p>Click to add file</p>
      </Button>
    </div>
  );
};

export default AddFileCard;
