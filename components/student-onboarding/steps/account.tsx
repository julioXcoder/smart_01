import HeadingThree from "@/components/typography/headingThree";
import Muted from "@/components/typography/muted";
import Paragraph from "@/components/typography/paragraph";

const Account = () => {
  return (
    <div>
      <HeadingThree>
        Get ready to access your student portal by setting up your account:
      </HeadingThree>
      <div className="mt-5 ps-5">
        <Paragraph>
          🔑 Create Login Credentials: Generate your login credentials for the
          student portal. Your registration number will serve as your username.
          Set a secure password that meets the specified criteria for logging
          in.
        </Paragraph>
        <Paragraph>
          📝 Registration Number: Your unique registration number will be used
          as your username to access various university services and platforms.
        </Paragraph>
        <Paragraph>
          💻 Access Student Portal: Once your account is set up, you&rsquo;ll be
          able to log in to the student portal to access important information,
          course materials, and university resources.
        </Paragraph>
        <Paragraph>
          🔒 Secure Access: Ensure your password is kept confidential and not
          shared with others to maintain the security of your account and
          personal information.
        </Paragraph>
        <Paragraph>
          🎉 Welcome to Student Portal: Congratulations! You&rsquo;re now ready
          to explore the student portal and make the most of your university
          experience
        </Paragraph>
      </div>
    </div>
  );
};

export default Account;
