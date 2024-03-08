import HeadingThree from "@/components/typography/headingThree";
import Paragraph from "@/components/typography/paragraph";
import Link from "next/link";

const Verify = () => {
  return (
    <div>
      <HeadingThree>
        🎉 Welcome to Mbeya University of Science and Technology (MUST)! 🎓
      </HeadingThree>
      <Paragraph>
        Congratulations on your admission to MUST for the academic year
        2023/2024! We&rsquo;re thrilled to welcome you to our vibrant community
        of scholars, innovators, and leaders. Your journey toward academic
        excellence begins here, and we&rsquo;re here to support you every step
        of the way.
      </Paragraph>
      <Paragraph>
        📜 Your official acceptance letter is now ready for download. It
        contains vital information about your admission status, enrollment
        procedures, and next steps. Click{" "}
        <Link
          href="#"
          className="inline-flex items-center gap-x-1 text-sm font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          [here]
        </Link>{" "}
        to download and start your exciting journey with MUST.
      </Paragraph>
      <Paragraph>
        We can&rsquo;t wait to see you thrive and make meaningful contributions
        to our community. Warm regards,
      </Paragraph>
      MUST
    </div>
  );
};

export default Verify;
