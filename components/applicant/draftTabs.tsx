import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import {
  FaAddressBook,
  FaCreditCard,
  FaExclamation,
  FaGraduationCap,
  FaHouse,
  FaPaperclip,
  FaUser,
} from "react-icons/fa6";

interface Tab {
  value: string;
  icon: IconType;
}

const tabs: Tab[] = [
  { value: "priorities", icon: FaHouse },
  { value: "profile", icon: FaUser },
  { value: "contacts", icon: FaAddressBook },
  { value: "emergency", icon: FaExclamation },
  { value: "education", icon: FaGraduationCap },
  { value: "attachment", icon: FaPaperclip },
  { value: "payment", icon: FaCreditCard },
];

const DraftTabs = () => {
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
      <TabsList className={`sticky md:top-16 ${show ? "top-16" : "top-2"}`}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            <tab.icon className="size-[1.1rem] shrink-0 sm:mr-2" />
            <span className="hidden sm:block">{tab.value}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          viewing {tab.value} component
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DraftTabs;
