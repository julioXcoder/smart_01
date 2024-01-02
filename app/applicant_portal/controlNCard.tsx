import CopyToClipboard from "./copyToClipboard";

const ControlNCard = () => {
  return (
    <div className="p-3">
      Thank you for advancing in your application process. We’ve generated a
      unique control number for your payment of 10,000 Tanzanian Shillings.
      Please complete the payment within four days. Once your payment is
      successfully processed, you’ll be able to proceed to the next step. We
      appreciate your prompt attention to this matter.
      <span className="mt-2 space-y-2">
        <h1 className="font-bold">My control number</h1>
        <CopyToClipboard />
      </span>
    </div>
  );
};

export default ControlNCard;
