import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Router from "next/router";

import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import {
  api_dapp_indexer_chains,
  api_dapp_indexer_dapp,
  api_dapp_indexer_baseurl,
} from "@/core/request/index";
import Footer from "@/components/footer";

type walletCard = {
  title: string;
  address: string;
  scan: string;
  img: string;
  name: string;
  bal: string;
};

export default function DocsPage() {
  // let list : walletCard[];
  const [data, setData] = useState([
    {
      title: "pending",
      address: "",
      full_address: "",
      scan: "",
      img: "",
      name: "",
      bal: "",
    },
  ]);

  let chains;

  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  const [isNav, setIsNav] = useState("");

  const [chainBtn, setChainBtn] = useState([
    {
      id: "sol",
      icon: "/images/chains/sol.svg",
      name: "Solana",
      symbol: "SOL",
      decimal: 9,
      scan: {
        address: "https://solscan.io/account/",
        tx: "https://solscan.io/tx/",
      },
    },
  ]);

  const [chainDropdown, setChainDropdown] = useState([]);

  const [allDappList, setAllDappList] = useState([]);
  const [dappList, setDappList] = useState([]);

  useEffect(() => {
    const onload = async () => {
      chains = await api_dapp_indexer_chains();

      setChainBtn(JSON.parse(JSON.stringify(chains.slice(0, 3))));
      setChainDropdown(chains.slice(3, chains.length));
      const dapp = await api_dapp_indexer_dapp();

      setAllDappList(dapp);

      const child = dappListGenerate(dapp, chains[0].id);

      // console.log(
      //   "🚧 Request test :: ",chainBtn,chainDropdown,dappList
      // )
      // console.log("🚧 chains.slice(0,3) :: ",chains.slice(0,3))
      // console.log("🚧 dapp[chains[0].id] :: ",child)
      setIsMainPageLoading(false);
      setIsNav("dapp");
    };

    onload().catch(console.error);
  }, []);

  function dappListGenerate(dapp: any, id: any) {
    const child = dapp[id];

    for (var i = 0; i < child.length; i++) {
      if ("icon" in child[i]) {
        const p = child[i].icon.split("https://");

        if (p.length > 1) {
        } else {
          child[i].icon = api_dapp_indexer_baseurl + child[i].icon;
        }
      }
    }
    setDappList(child);

    return child;
  }

  let selectItem = {
    key: "",
    label: "",
  };

  // return returnFont()
  return (
    <DefaultLayout name={isNav}>
      {isMainPageLoading ? <Loading /> : null}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Toaster />
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Welcome to</h1>
          <h1 className={title({ color: "violet" })}>&nbsp;Web3</h1>
        </div>
        <ButtonGroup>
          {chainBtn.map((item, index) => (
            <Button
              onClick={() => {
                dappListGenerate(allDappList, item.id);
              }}
            >
              {item.name}
            </Button>
          ))}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered">
                {selectItem.label == "" ? "More" : selectItem.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Dynamic Actions"
              items={chainDropdown}
              onAction={(key) => {
                dappListGenerate(allDappList, chainDropdown[Number(key)]["id"]);
              }}
            >
              {chainDropdown.map((item, index) => (
                <DropdownItem key={index}>{item["name"]}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>

        <div className="gap-1 grid grid-cols-3 sm:grid-cols-4">
          {dappList.map((item, index) => (
            <Card
              key={index}
              isPressable
              shadow="sm"
              onPress={() => Router.push(item["url"])}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  alt={item["name"]}
                  className="w-full object-cover h-[100px]"
                  radius="lg"
                  shadow="sm"
                  src={item["icon"]}
                  width="100%"
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item["name"]}</b>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </DefaultLayout>
  );
}
