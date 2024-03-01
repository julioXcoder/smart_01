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
import { MdFormatListBulleted } from "react-icons/md";

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
            <tab.icon className="size-5 shrink-0 lg:size-[1.1rem] xl:mr-2" />
            <span className="hidden xl:block">{tab.value}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          viewing {tab.value} component Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Labore, ipsam impedit! Cum voluptates error maiores
          est! Voluptate quasi porro repellendus ex corporis a fugiat inventore
          earum voluptatum odit rerum eveniet molestiae, incidunt reprehenderit
          blanditiis saepe in corrupti reiciendis, delectus accusantium
          necessitatibus sapiente voluptatibus deserunt quidem. Labore incidunt
          tenetur mollitia, ad tempora modi dolorum quasi asperiores qui odit ab
          dolores unde possimus accusantium voluptatem sequi cumque fugiat
          reiciendis repudiandae perferendis eos laboriosam non corporis!
          Perspiciatis, beatae magnam. Possimus eius, ut in enim consectetur,
          reprehenderit earum nobis, a tenetur sapiente est veritatis inventore
          alias blanditiis facilis? Repellendus adipisci, aperiam molestias
          repudiandae dolorum fuga unde voluptates nostrum? Provident quo
          architecto nemo neque quasi! Neque maiores quasi odio provident
          veniam. Doloribus similique quam magnam ad quod quis vel, nostrum
          omnis perspiciatis hic nesciunt mollitia aspernatur, sequi dolorum
          maxime. Atque, consequuntur doloribus! Tempore accusamus nihil iure
          deleniti consequatur rerum culpa eveniet dolore odio reiciendis iste
          corrupti quas sed eligendi cum consequuntur dolores, eaque id ut
          illum, neque esse. Veniam in deserunt quae et inventore ad! Corporis
          consequuntur dolore minima at rem. Laborum esse libero, dolorem
          voluptates fugit saepe veniam accusamus! Nam nihil distinctio impedit
          dolore doloribus atque. Nam inventore consectetur mollitia labore rem
          quisquam magnam porro voluptas delectus nulla vero asperiores, optio
          ab? Beatae accusantium voluptatem ipsum dignissimos, labore odit!
          Incidunt animi consectetur minima, soluta quasi recusandae velit!
          Accusamus quasi nobis blanditiis officia ipsam id dolorum ut eligendi
          sunt praesentium, eum, rem quod sit facere enim necessitatibus.
          Possimus, doloremque! Voluptatum, quam atque aliquid modi alias velit
          hic maiores rem impedit, ad expedita assumenda repudiandae
          consectetur, nesciunt iste? Repellat eum suscipit doloremque corrupti
          natus impedit amet quod rem id dolores similique dolor aut modi
          nostrum esse tempore vel eaque provident, ratione, iusto hic veritatis
          debitis autem ab! Optio autem atque tempore totam non nobis aperiam
          asperiores obcaecati facilis? Ea perferendis hic doloribus placeat
          cumque culpa rerum vitae delectus. Pariatur, dolores explicabo. Esse,
          ad? Voluptate, iure ipsam assumenda porro eos officiis nam quod odit
          esse veniam, deleniti vero consequuntur. Iste quia quidem distinctio,
          quod molestias odio a laborum dignissimos, asperiores sint voluptate
          assumenda harum perferendis quae quam! Itaque ducimus eos minus ipsa
          accusantium nulla repellendus nostrum sint accusamus laboriosam
          corporis incidunt voluptatum amet dignissimos, rerum aspernatur neque
          qui necessitatibus sit reiciendis pariatur velit possimus fugit odio?
          Quasi dolor sint tempore explicabo eum saepe earum. Saepe eos nemo
          itaque nisi vero. Sequi autem aliquam nisi in, vero officiis hic
          exercitationem totam numquam rem, repellat mollitia doloribus dolorem
          asperiores aliquid dicta eaque ab ipsa libero, molestiae est
          voluptate. Laudantium ullam molestiae excepturi. Sint quidem expedita
          quasi molestiae id. Libero quasi, ad id et eveniet maiores velit
          tempore magnam natus error impedit ab modi explicabo quo molestiae,
          eum aliquid. Officia, eveniet voluptatibus non architecto dolore
          molestias dicta minus inventore adipisci commodi a est voluptatum ut!
          Quisquam consequuntur nam magnam, dolores mollitia itaque minima
          possimus totam incidunt beatae recusandae quidem autem eaque maxime
          ipsum officiis debitis ab illo expedita facere. Fugiat ab corporis
          doloribus accusantium dolore impedit cupiditate id velit a dolores
          perspiciatis mollitia quam sequi, facilis laborum tempora nemo
          nesciunt quod esse non! Accusantium incidunt dolorum, dolor commodi
          vero, sed laborum esse deleniti quod consequuntur quo sunt voluptate
          doloremque! Eligendi, accusantium fugit at obcaecati sunt officia,
          quasi iusto facere quisquam sequi facilis alias magnam voluptate
          sapiente eos voluptatum ipsam officiis velit similique itaque. Dicta
          voluptates ullam vel. Delectus aperiam labore iure consequuntur saepe.
          Fugiat veniam aperiam unde. Numquam dicta corrupti, animi libero
          veniam possimus sit, ducimus accusamus quo maiores nihil? Vero quos
          culpa, eveniet id, provident molestiae illo esse sed dignissimos dicta
          vel! Totam officia, illo ea nemo corrupti iusto maxime perspiciatis
          doloremque perferendis maiores dolorum voluptatum quam omnis odit quia
          molestiae eos suscipit! Minima explicabo obcaecati deserunt vel
          ducimus nam, amet hic beatae incidunt vitae, error itaque veniam qui
          officia odio consequuntur cupiditate doloremque sapiente dignissimos?
          Dolor odio nobis aliquid dolorum labore deleniti itaque perspiciatis
          consequuntur qui repellat tempore vero doloremque aperiam a
          praesentium nesciunt officiis, quia vitae sed delectus iusto? Ipsum
          iure, facere iusto possimus ratione dignissimos libero iste aut nulla
          laboriosam assumenda dicta soluta consectetur veniam. Nemo iusto dicta
          aspernatur quam odio voluptatem ad sed sunt. Hic unde sit aliquid,
          vero quisquam expedita dicta omnis architecto magnam nam placeat.
          Consequuntur doloremque provident ea officiis doloribus impedit
          ratione nobis totam harum cum, porro quas similique cupiditate,
          architecto tempora iusto fugit nemo consequatur quasi alias ipsum.
          Reiciendis pariatur eveniet incidunt, laboriosam, corrupti dolore odio
          ipsa porro nesciunt officiis eos vitae quo! Nam, omnis. Deleniti,
          reiciendis a. Quidem quis odit ipsam dolorem placeat ab praesentium
          natus eos id provident saepe iure suscipit aspernatur quaerat
          consectetur voluptatum rerum laboriosam, debitis voluptate esse soluta
          earum animi officia enim. Illo nostrum aliquam dolores placeat sit
          recusandae expedita beatae officia esse quo dicta omnis voluptates
          animi, consequuntur eaque repudiandae fugiat quos doloribus magni
          voluptate. Harum voluptatibus quasi necessitatibus. Ducimus quibusdam
          vero accusamus facere eveniet repudiandae nemo. Sunt impedit provident
          aliquid deleniti animi consequuntur reiciendis vero obcaecati labore
          maxime. Omnis, quaerat. Dolore pariatur quibusdam officiis porro
          doloremque maxime magnam sequi, ab unde aperiam quidem delectus
          ducimus omnis nostrum obcaecati quasi adipisci molestias quisquam eos
          harum velit laboriosam facilis debitis fugiat. Odio, a! Libero numquam
          vero expedita dolore. Sapiente beatae voluptates, nulla tenetur
          repellat, officiis deleniti tempore eum ratione, facere eveniet?
          Quidem facilis quis eveniet beatae aut, et voluptas quibusdam
          molestias perspiciatis at nisi, reiciendis corporis dolores
          dignissimos ducimus perferendis veniam! Itaque, nostrum non,
          consectetur et laborum, deleniti eius totam sapiente sit nam
          dignissimos natus illo quibusdam beatae aliquid perspiciatis qui
          eveniet quam maiores consequatur nulla ea at fugiat. Ipsa sequi rem
          tenetur magni non ea eos ut consequuntur itaque earum, mollitia sunt
          architecto distinctio reprehenderit unde ad enim fugiat impedit velit
          officiis! Facere, explicabo sint consequuntur a neque nulla, numquam
          corporis itaque optio eaque mollitia temporibus laborum doloribus
          quos. Vitae minima placeat, quas error nostrum dolores! Optio numquam
          unde, totam quia repudiandae molestiae odio corrupti sapiente? Maiores
          facere tenetur repellendus itaque illo eum? Nisi quasi deserunt
          aliquid est soluta possimus tenetur velit quod voluptas dignissimos?
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DraftTabs;
