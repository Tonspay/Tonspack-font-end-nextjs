import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

import { deving, address_readable } from "../../core/utils/utils";

import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

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
  const router = useRouter();
  const query = router.query;

  let list: walletCard[];

  list = [];
  list.push(router.query as walletCard);
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  useEffect(() => {
    const onload = async () => {
      setIsMainPageLoading(false);
    };

    onload().catch(console.error);
  }, []);

  // return returnFont()
  return (
    <DefaultLayout name="wallet_details">
      {isMainPageLoading ? <Loading /> : null}
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Toaster />
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>{query.name}</h1>
        </div>

        {list.map((item, index) => (
          <Card
            key={index}
            isPressable
            radius="lg"
            shadow="sm"
            style={{ maxWidth: "400px", width: "100%" }}
            onPress={() => {
              // console.log("Card details router");
              // Router.push({pathname: '/wallet_details', query: item})
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
            <CardBody
              style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
            >
              <div className="flex gap-1">
                <div
                  className=" text-default-400 text-small"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  {address_readable(12, 12, item.full_address)}
                </div>
              </div>
              <div className="flex gap-1">
                <div
                  className="text-big"
                  style={{ textAlign: "center", width: "100%" }}
                >
                  {item.bal}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}

        <div style={{ maxWidth: "400px", width: "100%" }}>
          <Card className="max-w-[400px]">
            <CardHeader
              className="flex gap-3"
              style={{ textAlign: "center", maxWidth: "400px", width: "100%" }}
            >
              <div style={{ textAlign: "center", width: "100%" }}>
                <p className="text-md">Setting</p>
              </div>
            </CardHeader>
            <Divider style={{ maxWidth: "400px", width: "100%" }} />
            <CardBody>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="primary"
                  style={{ width: "50%" }}
                  variant="bordered"
                  onClick={deving}
                >
                  Send
                </Button>

                <Button
                  color="secondary"
                  style={{ width: "50%" }}
                  variant="bordered"
                  onClick={deving}
                >
                  Recive
                </Button>
              </div>

              <br />
              <Button color="success" onClick={deving}>
                Buy/Sell
              </Button>
              <br />
              <Button
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                radius="full"
                onClick={deving}
              >
                Swap
              </Button>
              <br />
              <Button color="danger" onClick={deving}>
                Scan QR
              </Button>
            </CardBody>
            <Divider />
            <CardFooter />
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
