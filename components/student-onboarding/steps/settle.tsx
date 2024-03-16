import HeadingThree from "@/components/typography/headingThree";

const Settle = () => {
  const instructions = [
    {
      title: "On-Campus",
      description:
        "Select this tab if you prefer to reside within the university campus. Our on-campus facilities offer convenience and a vibrant community atmosphere.",
    },
    {
      title: "Off-Campus",
      description:
        "Choose this tab if you plan to arrange accommodation independently outside of the university campus. You'll have more flexibility in choosing your living arrangements.",
    },
    {
      title: "Already Secured",
      description:
        "If you have already arranged accommodation independently or have special arrangements in place, select this tab.",
    },
  ];

  return (
    <div>
      <HeadingThree>
        Click the Continue button below to proceed to the Accommodation section.
        Once there, you&apos;ll find three tabs:
      </HeadingThree>
      <div className="mt-7 ps-8">
        <ul className="max-w-2xl list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
          {instructions.map((item, index) => (
            <li key={index}>
              <span className="font-bold">{item.title}:</span>
              {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Settle;
