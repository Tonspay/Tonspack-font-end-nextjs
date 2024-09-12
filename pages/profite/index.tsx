import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Router from "next/router";

import { deving } from "../../core/utils/utils";
import { wallet_connect, wallet_list_generate } from "../../core/wallet/index";

import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

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
  let list: walletCard[];

  list = [];
  const [data, setData] = useState([
    {
      title: "pending",
      address: "",
      scan: "",
      img: "",
      name: "",
      bal: "",
    },
  ]);

  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  useEffect(() => {
    const onload = async () => {
      // const connect = true;
      const connect = await wallet_connect();

      // console.log("🚧 connect :: ",connect)
      if (connect) {
        const ws = await wallet_list_generate(connect.wallets);

        // console.log("🚧 Wallets :: ",ws)
        setData(ws);
        // setData([])
        setIsMainPageLoading(false);
      }
      // console.log("🚧 hook test")
    };

    onload().catch(console.error);
  }, []);

  // return returnFont()
  return (
    <DefaultLayout name="">
      {isMainPageLoading ? <Loading /> : null}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Toaster />
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Profite</h1>
        </div>

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
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {item.address}
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
            <CardFooter
              className="gap-3"
              style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
            >
              <div className="flex gap-1">
                <div className="font-semibold text-default-400 text-small">
                  Chain :{" "}
                </div>
                <div className=" text-default-400 text-small">{item.name}</div>
              </div>
              <div className="flex gap-1">
                <div className="font-semibold text-default-400 text-small">
                  Balance :{" "}
                </div>
                <div className=" text-default-400 text-small">{item.bal}</div>
              </div>
            </CardFooter>
          </Card>
        ))}

        <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <Button
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            radius="full"
            style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
            onClick={deving}
          >
            Manage
          </Button>
        </div>

        {/* <div style={{maxWidth:"400px",width:"100%"}}>
      <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3" style={{textAlign:"center",maxWidth:"400px",width:"100%"}}>
        <div style={{textAlign:"center",width:"100%"}}>
          <p className="text-md" >Setting</p>
          
        </div>
      </CardHeader>
      <Divider  style={{maxWidth:"400px",width:"100%"}} />
      <CardBody>
      <br/>
      <Button color="primary" variant="bordered" onClick={exportPrivateKey}>
        Export privateKey
      </Button>  
      <br/>
      <Button color="secondary" variant="bordered" onClick={telegramShareApp}>
        Share to friend
      </Button>  
      <br/>
      <Button color="danger" variant="bordered" onClick={deving}>
        Delete account
      </Button>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://t.me/Tonspackdev"
        >
          Join tonspack community for support.
        </Link>
      </CardFooter>
    </Card>
      </div> */}
      </section>
    </DefaultLayout>
  );
}
