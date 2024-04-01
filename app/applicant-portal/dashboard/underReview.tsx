import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ProgrammeLevel } from "@prisma/client";
import { AiOutlineSearch } from "react-icons/ai";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { ProgramPriority } from "./data";

interface Props {
  programmes: ProgramPriority[];
  applicationType: ProgrammeLevel;
}

const UnderReview = ({ programmes, applicationType }: Props) => {
  return (
    <div>
      <Card className="w-full">
        <CardHeader>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <AiOutlineSearch className="h-12 w-12 shrink-0 text-blue-400" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  Your Application is Under Review
                </p>
                <p className="text-sm text-gray-500">{applicationType}</p>
              </div>
            </div>
            <Link href="/applicant-portal/view">
              <Button variant={"secondary"}>View application</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4 h-1.5" />
          <div className="flex w-full flex-col gap-1 px-4">
            {programmes.map((programme) => (
              <div key={programme.programmeCode}>
                <div className="flex w-full items-center gap-2">
                  <div className="shrink-0 text-3xl">{programme.priority}</div>
                  <div className="ms-3 sm:ms-4">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 sm:mb-1">
                      {programme.programme.name}
                    </p>
                  </div>
                </div>
                <Separator className="my-5 h-0.5 last:hidden" />
              </div>
            ))}
          </div>
        </CardContent>
        <CardDescription className="flex items-center p-1">
          <LiaHandPointRightSolid className="mx-2 h-4 w-4 shrink-0" />
          Your application is currently being reviewed by our team. We
          appreciate your patience during this process.
        </CardDescription>
      </Card>
    </div>
  );
};

export default UnderReview;
