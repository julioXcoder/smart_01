import { Button } from "@/components/ui/button";
import OffCampus from "./accommodation/offCampus";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaUniversity, FaHome, FaLock } from "react-icons/fa";
import { Tab } from "@/types";

const Accommodation = () => {
  const [show, setShow] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < scrollPos) {
        setShow(true);
      } else {
        setShow(false);
      }
      setScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPos]);

  const tabs: Tab[] = [
    { label: "On-Campus", Icon: FaUniversity, content: <>On-Campus</> },
    { label: "Off-Campus", Icon: FaHome, content: <OffCampus /> },
    { label: "Already Secured", Icon: FaLock, content: <>Already Secured</> },
  ];

  return (
    <Tabs defaultValue="On-Campus">
      <TabsList>
        {/* <TabsList
        className={`sticky z-20 md:top-20 ${show ? "top-16" : "top-2"}`}
      > */}
        {tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}>
            <tab.Icon className="size-5 shrink-0 lg:size-[1.1rem] xl:mr-2" />
            <span className="hidden xl:block">{tab.label}</span>
          </TabsTrigger>
        ))}
        <TabsTrigger disabled value="test">
          <span className="hidden xl:block">test</span>
        </TabsTrigger>
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label}>
          {tab.content}
        </TabsContent>
      ))}
      <TabsContent value="test">Test</TabsContent>
    </Tabs>
  );
};

export default Accommodation;
