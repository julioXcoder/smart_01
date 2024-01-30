import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";
import { IoWarning } from "react-icons/io5";

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

const Priorities = () => {
  const [items, setItems] = useState<string[]>([
    "Diploma In Computer Science",
    "Bachelor's Degree In Mechanical Engineering With Industrial Safety AndOccupational Health",
    "Master's Degree In Technical Education in Civil Engineering",
  ]);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setItems(newItems);
  };

  const handleMoveDown = (index: number) => {
    if (index === items.length - 1) return;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setItems(newItems);
  };

  const handleDelete = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
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

      {items.map((item, index) => (
        // max-w-xl
        <Card key={index} className="my-3 w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="shrink-0"># {index + 1}</Badge>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleMoveUp(index)}
                  variant="outline"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleMoveDown(index)}
                  variant="outline"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiArrowDown className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
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
                          {item}
                        </span>{" "}
                        from your priorities?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-700"
                        onClick={() => handleDelete(index)}
                      >
                        Yes, Remove
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <CardTitle>{item}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <FaUniversity className="mr-2 mt-0.5 h-4 w-4 shrink-0" /> MBEYA
              UNIVERSITY OF SCIENCE AND TECHNOLOGY
            </div>
            <div className="flex">
              <IoWarning className="mr-2 mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
              Deadline: 31 Aug 2024
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Priorities;
