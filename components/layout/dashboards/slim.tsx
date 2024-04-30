import { ScrollArea } from "@/components/ui/scroll-area";
import { Path } from "@/types";
import { ReactNode } from "react";
import SlimAppbar from "../slimAppbar";
import SlimSidebar from "../slimeSidebar";

interface Props {
  children: ReactNode;
  links: Path[];
}

const Slim = ({ children, links }: Props) => {
  return (
    <main className="flex h-screen w-screen gap-6 sm:p-6">
      <SlimSidebar links={links} />

      <div className="flex-1 rounded-md border-dashed border-gray-700 dark:border-gray-500">
        <ScrollArea className="relative h-full w-full">
          <SlimAppbar />
          <div className="mt-1 px-2 sm:px-4">{children}</div>
        </ScrollArea>
      </div>
    </main>
  );
};

export default Slim;
