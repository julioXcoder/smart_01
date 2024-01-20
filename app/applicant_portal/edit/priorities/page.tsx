import React from "react";

const Page = () => {
  const priorities = ["Priority 1", "Priority 2", "Priority 3", "Priority 4"];
  return (
    <div className="flex max-w-md flex-col rounded bg-white p-4 shadow dark:bg-gray-700">
      <h2 className="mb-4 text-center text-xl font-bold text-gray-900 dark:text-white">
        Priority List
      </h2>
      <ol className="list-inside list-decimal">
        {priorities.map((priority, index) => (
          <li
            key={index}
            className="mb-2 rounded bg-gray-200 p-2 dark:bg-gray-600"
          >
            {priority}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Page;
