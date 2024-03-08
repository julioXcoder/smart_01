import HeadingThree from "@/components/typography/headingThree";
import Muted from "@/components/typography/muted";
import Paragraph from "@/components/typography/paragraph";

const Arrive = () => {
  return (
    <div>
      <HeadingThree>
        Prepare for your arrival at the MUST campus with these instructions
      </HeadingThree>
      <div className="mt-5 ps-5">
        <Paragraph>
          📅 Report to Campus: Mark your calendar for September 21, 2023, and
          plan your journey to the campus for orientation and registration.
        </Paragraph>
        <Paragraph>
          📍 Campus Arrival: On the specified date, make your way to the campus.
          Look out for signage and campus maps to guide you to the orientation
          and registration venues.
        </Paragraph>
        <Paragraph>
          👋 Orientation Welcome: Upon arrival, expect a warm welcome from our
          staff and student volunteers who will assist you throughout the
          orientation process.
        </Paragraph>
        <Paragraph>
          📝 Registration: Register for your classes and complete any necessary
          paperwork to ensure a smooth transition into university life
        </Paragraph>
      </div>
    </div>
  );
};

export default Arrive;
