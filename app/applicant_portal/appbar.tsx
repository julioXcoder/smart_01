import Logo from "@/components/logo";
import Badge from "@/components/badge";
import { ModeToggle } from "@/components/themeChanger";
import { BellIcon } from "@radix-ui/react-icons";
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

interface Props {
  name: string;
  value?: number;
}

const Appbar = ({ name, value }: Props) => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Logo />
          </div>
          <div className="flex items-center">
            <div className="ml-3 flex items-center">
              <div className="flex items-center gap-3">
                <h3 className="capitalize block text-sm text-gray-900 dark:text-white">
                  {name}
                </h3>
                <Sheet>
                  <SheetTrigger asChild>
                    <Badge value={value}>
                      <BellIcon />
                    </Badge>
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

                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
