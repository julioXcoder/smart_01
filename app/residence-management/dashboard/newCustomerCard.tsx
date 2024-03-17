import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import HeadingOne from "@/components/typography/headingOne";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import HeadingThree from "@/components/typography/headingThree";

const users = [
  {
    name: "sdasass adasdsa",
    userName: "user1@gmail.com",
    imageUrl: "https://github.com/shadcn.png",
  },
  {
    name: "tggrd geg d",
    userName: "user1@gmail.com",
    imageUrl: "https://github.com/shadcn.png",
  },
  {
    name: "geger reere",
    userName: "user1@gmail.com",
    imageUrl: "https://github.com/shadcn.png",
  },
  {
    name: "rer retere",
    userName: "user1@gmail.com",
    imageUrl: "https://github.com/shadcn.p",
  },
  {
    name: "reet retee",
    userName: "user1@gmail.com",
    imageUrl: "https://github.com/shadcn.png",
  },
];

const NewCustomerCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <HeadingThree>New Customers</HeadingThree>
          <Button variant="link">View all</Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="list-none divide-y divide-gray-200 dark:divide-gray-700">
        {users.map((user, index) => (
          <li key={index} className="py-3 last:pb-0 sm:py-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <Avatar>
                  <AvatarImage src={user.imageUrl} alt="@shadcn" />
                  <AvatarFallback>JN</AvatarFallback>
                </Avatar>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {user.userName}
                </p>
              </div>
              {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                ...
              </div> */}
            </div>
          </li>
        ))}
      </CardContent>
    </Card>
  );
};

export default NewCustomerCard;
