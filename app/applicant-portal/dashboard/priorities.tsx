import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GiWhiteBook } from "react-icons/gi";
import { FaUniversity } from "react-icons/fa";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { IoWarning, IoChatbubblesSharp } from "react-icons/io5";
import { ProgramPriority } from "./data";
import { getEducationLevel } from "@/utils/programme";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoSearch } from "react-icons/io5";

interface Props {
  applicantProgrammes: ProgramPriority[];
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onDelete: (index: number) => void;
  programmePrioritiesErrorMessage: string;
  draftSaving: boolean;
  isSubmitting: boolean;
  openListing: () => void;
}

const Priorities = ({
  applicantProgrammes,
  onMoveUp,
  onMoveDown,
  onDelete,
  programmePrioritiesErrorMessage,
  draftSaving,
  isSubmitting,
  openListing,
}: Props) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
        Choose Your Programs
      </h1>
      <p className="my-3 text-gray-800 dark:text-gray-400">
        Kickstart your application adventure by selecting your preferred
        programs. The order you set influences your academic journey, so pick
        wisely!
      </p>

      {applicantProgrammes.length === 0 ? (
        <div className="my-20 flex w-full items-center justify-center">
          <div className="flex flex-col gap-3">
            <p>
              You currently have no programmes. Click the &quot;search
              programmes&quot; button below to add them.
            </p>
          </div>
        </div>
      ) : (
        applicantProgrammes.map((item, index) => (
          // max-w-xl
          <Card key={index} className="my-3 w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className="shrink-0"># {index + 1}</Badge>

                <div className="flex items-center space-x-2">
                  <Button
                    disabled={index === 0 || isSubmitting || draftSaving}
                    onClick={() => onMoveUp(index)}
                    variant="outline"
                    size="icon"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    disabled={
                      index === applicantProgrammes.length - 1 ||
                      isSubmitting ||
                      draftSaving
                    }
                    onClick={() => onMoveDown(index)}
                    variant="outline"
                    size="icon"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiArrowDown className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={isSubmitting || draftSaving}
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:bg-red-600 hover:text-white "
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Confirm Priority Removal
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove{" "}
                          <span className="text-orange-500 underline underline-offset-2">
                            {item.programme.name}
                          </span>{" "}
                          from your priorities?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-700"
                          onClick={() => onDelete(index)}
                        >
                          Yes, Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
              <CardTitle>
                {getEducationLevel(item.programme.level)} {item.programme.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex">
                <FaUniversity className="mr-2 mt-0.5 h-4 w-4 shrink-0" /> MBEYA
                UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </div>
              <div className="flex items-center gap-4">
                <div className="flex">
                  <GiWhiteBook className="mr-2 mt-0.5 h-4 w-4 shrink-0" />
                  {item.programme.level}
                </div>
                <div className="flex">
                  <IoChatbubblesSharp className="mr-2 mt-0.5 h-4 w-4 shrink-0" />
                  {item.programme.language}
                </div>
              </div>
              <div className="flex">
                <IoWarning className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                Deadline: 31 Aug 2024
              </div>
            </CardContent>
          </Card>
        ))
      )}
      <div className="my-6 flex w-full flex-col items-center justify-center gap-y-4">
        {programmePrioritiesErrorMessage && (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" />
            {programmePrioritiesErrorMessage}
          </div>
        )}
        <Button
          disabled={isSubmitting || draftSaving}
          className="bg-green-500 hover:bg-green-600"
          onClick={openListing}
        >
          <IoSearch className="mr-2 h-4 w-4 shrink-0" /> search{" "}
          <span
            className={`mx-1 ${
              applicantProgrammes.length === 0 && "mx-0 hidden"
            }`}
          >
            more
          </span>{" "}
          programmes
        </Button>
      </div>
    </div>
  );
};

export default Priorities;
