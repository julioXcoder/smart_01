import MainContent from "@/components/layout/mainContent";

interface Props {
  params: { applicantApplicationId: string };
}

const Page = ({ params: { applicantApplicationId } }: Props) => {
  return (
    <div className="p-2">
      <MainContent>Page {applicantApplicationId}</MainContent>
    </div>
  );
};

export default Page;
