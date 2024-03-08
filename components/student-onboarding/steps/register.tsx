import HeadingThree from "@/components/typography/headingThree";
import Muted from "@/components/typography/muted";
import Paragraph from "@/components/typography/paragraph";

const Register = () => {
  return (
    <div>
      <HeadingThree>
        Complete your registration process seamlessly with these guidelines
      </HeadingThree>
      <div className="mt-5 ps-5">
        <Paragraph>
          📝 Registration Process: Ensure all required documents, including
          acceptance letter, academic certificates, and payment slips, are
          organized and ready for submission.
        </Paragraph>
        <Paragraph>
          💼 Document Submission: Present your documents at the designated
          registration area. Our staff will guide you through the registration
          process and answer any questions you may have.
        </Paragraph>
        <Paragraph>
          💳 Fee Payment: Make sure to settle any outstanding fees according to
          the chosen payment option. Financial advisors will be available to
          assist you with payment inquiries and arrangements.
        </Paragraph>
        <Paragraph>
          🎓 Academic Guidance: Seek guidance from academic advisors to select
          your courses and plan your academic journey effectively.
        </Paragraph>
        <Paragraph>
          ✅ Final Confirmation: After completing the registration process, you
          will receive a confirmation of your enrollment status. Welcome to the
          MUST community
        </Paragraph>
      </div>
    </div>
  );
};

export default Register;
