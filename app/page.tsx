import Logo from "@/components/logo";
import Navbar from "@/components/navbar";
import { ModeToggle } from "@/components/themeChanger";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="mt-32">
        SMART is a comprehensive and advanced application designed to
        revolutionize the educational experience by providing an
        all-encompassing platform for students, educators, parents, and
        administrators. It serves as a centralized hub for managing academic
        activities, resources, communication, and progress tracking.
        <ModeToggle />
      </div>
    </main>
  );
}
