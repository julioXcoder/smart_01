"use client";

import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

const Page = () => {
  const pathname = usePathname();

  // Create a ref to store the previous pathname
  const ref = useRef(pathname);

  useEffect(() => {
    // Check if the pathname has changed and if the previous pathname was '/about'
    if (ref.current !== pathname) {
      // Do something before the page changes
      // For example, you could show a confirmation dialog or save some data
      console.log("Changed!");
    }

    // Update the ref to store the current pathname
    ref.current = pathname;
  }, [pathname]);

  return (
    <div>
      {/* <DraftTabs /> */}
      <button>Do something</button>
    </div>
  );
};

export default Page;
