import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useScrollListener from "@/hooks/useScrollListener";
import { Tab } from "@/types";

interface Props {
  tabs: Tab[];
}

const DraftTabs = ({ tabs }: Props) => {
  const showOnScroll = useScrollListener();

  return (
    <Tabs defaultValue="priorities">
      <TabsList
        className={`sticky md:top-20 ${showOnScroll ? "top-16" : "top-2"}`}
      >
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
