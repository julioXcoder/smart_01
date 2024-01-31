import { Button } from "@/components/ui/button";

const CreateCNCard = () => {
  return (
    <div className="p-3">
      <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
        To proceed with your application, a fee of 10,000 Tanzanian Shillings is
        required. Please ensure payment within four days to avoid account
        deletion.
      </p>
      <div className="mt-4">
        <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
          Click the button below to create the control number:
        </p>
        <Button className="w-full" type="button">
          Create Control Number
        </Button>
      </div>
    </div>
  );
};

export default CreateCNCard;
