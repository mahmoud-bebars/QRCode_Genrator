import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import QRGenerate from "../components/QRGenerate";
import QrReader from "../components/QRReader";

const tabs = [
  {
    name: "Generate",
    comp: <QRGenerate />,
  },
  {
    name: "Scan",
    comp: <QrReader />,
  },
];

const Home = () => {
  return (
    <main className="p-3 my-5">
      <TabGroup className="w-full h-full">
        <TabList className="flex items-center justify-center gap-4 bg-blue-400 rounded-md p-2">
          {tabs.map(({ name }) => (
            <Tab
              key={name}
              className="w-full rounded-md py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white data-[selected]:text-black data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white data-[focus]:outline-1 data-[focus]:outline-white"
            >
              {name}
            </Tab>
          ))}
        </TabList>
        <TabPanels className="mt-3">
          {tabs.map(({ name, comp }) => (
            <TabPanel key={name} className="rounded-xl bg-white/5 p-3">
              {comp}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </main>
  );
};

export default Home;
