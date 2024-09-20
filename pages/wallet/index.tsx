import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Divider } from "@nextui-org/divider";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Router from "next/router";

import { deving, address_readable } from "../../core/utils/utils";
import {
  wallet_list_generate,
  wallet_mpc_try_get_kp,
  mpc,
} from "../../core/wallet/index";

import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";
import Footer from "@/components/footer";

type walletCard = {
  title: string;
  full_address: string;
  address: string;
  scan: string;
  img: string;
  name: string;
  bal: string;
};

export default function DocsPage() {
  // let list : walletCard[];
  let list: walletCard[];

  list = [];
  const [data, setData] = useState([
    {
      title: "pending",
      address: "",
      full_address: "",
      scan: "",
      img: "",
      name: "",
      bal: "",
      tokens:[
        {
          icon: "",
          name: "",
          symbol:"",
          decimal: 8,
          address:"",
          bal: "",
        }
      ],
    },
  ]);

  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  const [isNav, setIsNav] = useState("");

  useEffect(() => {
    const onload = async () => {
      const mpc_kp = await wallet_mpc_try_get_kp();

      if (mpc_kp) {
        // console.log("🚧 mpc_kp :: ",mpc_kp)
        const kps = mpc.getKp(mpc_kp);
        // console.log("🚧 kps :: ",kps)
        const wallets = mpc.getAddress(mpc_kp, false);
        // console.log("🚧 wallets :: ",wallets)
        const ws = await wallet_list_generate(wallets);

        console.log("🚧 Wallets :: ", ws);
        setData(ws);
        // setData([])
        setIsMainPageLoading(false);
        setIsNav("wallet");
      }
      // console.log("🚧 hook test")
    };

    onload().catch(console.error);
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function CoinBar(props: any) {
    return (
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            alt="chain logo"
            height={40}
            src={props.img || ""}
            width={40}
          />
          <div className="ml-2 text-default-600">
            <p className="text-left font-semibold ">
              <span className="text-lg">{props.title}</span>
              <span className="text-small ml-1 text-default-400">
                {props.desc}
              </span>
            </p>
            <p className="text-left text-sm">
              <span>${props.value}</span>
              <span className="ml-1">{props.unit}</span>
              <span className="ml-1">{props.change}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center grow">
          <p className="text-right font-semibold w-full">{props.owns}</p>
          <p className="ml-1 text-right w-full text-default-400">
            ${props.ownsvalue}
          </p>
        </div>
      </div>
    );
  }

  return (
    <DefaultLayout name={isNav}>
      {isMainPageLoading ? <Loading /> : null}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Toaster />
        {/* <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Wallets</h1>
        </div> */}

        {data.map((item, index) => (
          <Card
            key={index}
            isPressable
            radius="lg"
            shadow="sm"
            style={{ maxWidth: "400px", width: "100%" }}
            onPress={() => {
              console.log("Card details router");
              Router.push({ pathname: "/wallet_details", query: item });
            }}
          >
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Image
                  alt="chain logo"
                  height={40}
                  radius="sm"
                  src={item.img}
                  width={40}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-lg font-semibold leading-none text-default-600">
                    {item.name}
                  </h4>
                </div>
              </div>
              <Link isExternal href={item.scan}>
                <Chip
                  className="text-tiny text-white"
                  color="default"
                  radius="lg"
                  size="sm"
                  variant="flat"
                >
                  Copy
                </Chip>
              </Link>
            </CardHeader>
            <Divider className="w-[90%] m-auto" />

            <CardBody
              style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
            >
              {/* TODO: fetch data from blockchain */}
              {
                // <Accordion isCompact defaultExpandedKeys={["1"]}>
                //   <AccordionItem
                //     key="1"
                //     classNames={{
                //       subtitle: "text-xs",
                //     }}
                //     subtitle={address_readable(12, 12, item.full_address)}
                //     textValue="Wallet Details"
                //   >
                     
                //   </AccordionItem>
                // </Accordion>
              }
              {
              isClient && (
                <Accordion isCompact defaultExpandedKeys={["1"]}>
                  <AccordionItem
                    key="1"
                    classNames={{
                      subtitle: "text-xs",
                    }}
                    subtitle={address_readable(12, 12, item.full_address)}
                    textValue="Wallet Details"
                  >
                   {/* <div style={{padding:"10px"}}>
                    <CoinBar
                        change={-0.2}
                        desc="Binance Coin"
                        img={item.img}
                        owns={0}
                        ownsvalue={0.0}
                        title="BNB"
                        unit="USD"
                        value={512.2}
                      />
                    </div> */}
                    {
                                      item.tokens.map(
                                        (tk, tki) => (
                                          <div style={{padding:"10px"}}>
                                          <CoinBar
                                              change={""}
                                              desc={tk.name}
                                              img={tk.icon}
                                              owns={tk.bal}
                                              ownsvalue={tk.bal}
                                              title={tk.symbol}
                                              unit={""}
                                              value={tk.price}
                                            />
                                          </div>  
                                        )
                                      )
                    }
                  </AccordionItem>
                </Accordion>
              )
              }
            </CardBody>
          </Card>
        ))}

        <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <Button
            color="primary"
            style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
            onClick={deving}
          >
            Managment
          </Button>

          {/* <Button color="primary" onClick={()=>{Router.push("test")}} style={{maxWidth:"400px",width:"100%" ,textAlign:"center"}}>Test</Button> */}
        </div>
      </section>
      <Footer />
    </DefaultLayout>
  );
}
