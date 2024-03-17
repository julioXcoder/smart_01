import HeadingOne from "@/components/typography/headingOne";
import Muted from "@/components/typography/muted";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <HeadingOne>Room List</HeadingOne>
          <Muted>
            View a comprehensive list of rooms and their current occupants.
          </Muted>
        </div>
        <Button variant="default" size="icon">
          <IoMdAdd className="size-6 flex-shrink-0" />
        </Button>
      </div>
    </div>
  );
};

export default Page;
