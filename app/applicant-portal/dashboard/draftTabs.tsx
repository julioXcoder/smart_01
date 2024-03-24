import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Tab } from "@/types";

interface Props {
  tabs: Tab[];
}

const DraftTabs = ({ tabs }: Props) => {
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

  return (
    <Tabs defaultValue="priorities">
      <TabsList className={`sticky md:top-20 ${show ? "top-16" : "top-2"}`}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.label}>
            <tab.Icon className="size-5 shrink-0 lg:size-[1.1rem] xl:mr-2" />
            <span className="hidden xl:block">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.label} value={tab.label}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DraftTabs;
