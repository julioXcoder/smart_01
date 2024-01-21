import { FiArrowUp, FiArrowDown, FiTrash2 } from "react-icons/fi";
import {
  AiFillApple,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineDelete,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { FaClipboardList, FaRegListAlt } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Priorities = () => {
  return (
    <div>
      <div className="mx-auto max-w-lg overflow-hidden rounded-md bg-white shadow-lg">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              <Badge># 1</Badge>{" "}
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="text-blue-500 hover:text-blue-700"
              >
                <AiOutlineArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-blue-500 hover:text-blue-700"
              >
                <AiOutlineArrowDown className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-red-500 hover:text-red-700"
              >
                <AiOutlineDelete className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <h2 className="text-lg font-semibold text-gray-800">
              Bachelor's Degree In Mechanical Engineering With Industrial Safety
              AndOccupational Health
            </h2>
            <MdAssignment />
            <p className="mt-1 text-sm text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reiciendis, earum?
            </p>
            <p className="mt-1 text-sm text-gray-600">Vistula, 23 agust 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Priorities;
