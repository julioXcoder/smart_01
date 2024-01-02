import Logo from "@/components/logo";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import StickyFooter from "@/components/layout/stickyFooter";
import { ModeToggle } from "@/components/themeChanger";
import Spinner from "@/components/spinner";

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
      <StickyFooter />
    </main>
  );
}
