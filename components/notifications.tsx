import { FaBell } from "react-icons/fa";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface Props {
  value?: number;
}

const Notifications = ({ value }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <FaBell className="h-4 w-4" />

          {value && (
            <span className="absolute end-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
              {value >= 9 ? "9+" : value}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Get alerts and updates for your application.
          </SheetDescription>
        </SheetHeader>
        <div></div>
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Notifications;
