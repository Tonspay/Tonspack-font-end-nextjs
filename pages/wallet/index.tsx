import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Avatar} from "@nextui-org/avatar"
import {Image }from "@nextui-org/image";
import {Chip} from "@nextui-org/chip"
import {Divider} from"@nextui-org/divider"

import {wallet_connect,wallet_list_generate} from "../../core/wallet/index";

import type { InferGetStaticPropsType, GetStaticProps } from 'next'


type walletCard = {
  title: string,
  address:string,
  scan:string,
  img: string,
  name:string,
  bal:string,
}
  export const getStaticProps = async () => {
    let ret = []
    const connect = await wallet_connect();
    console.log("🚧 connect :: ",connect)
    if(connect)
    {
      const ws = await wallet_list_generate(connect.wallets)
      console.log("🚧 Wallets :: ",ws)
      ret.push(
        ws[0]
      )
    }

    ret.push(
        {
          title: "TON",
          address:"EQCZBjHI...NNt_yPIP",
          scan:"https://tonviewer.com/EQCZBjHIQsKYDo4xob7C3IbHL8X4hUz1Q4A7BgzXNNt_yPIP",
          img: "/images/chains/ton.svg",
          name:"TON",
          bal:"1.32 TON"
        },
    )
    return { props: { ret } }
};



  export default function GetStaticProps({ ret }: { ret: walletCard[] }) {
  let list = ret;
  let temp = [
    {
      title: "TON",
      address:"EQCZBjHI...NNt_yPIP",
      scan:"https://tonviewer.com/EQCZBjHIQsKYDo4xob7C3IbHL8X4hUz1Q4A7BgzXNNt_yPIP",
      img: "/images/chains/ton.svg",
      name:"TON",
      bal:"1.32 TON"
    },
  ];
  
  // return returnFont()
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Wallets</h1>
        </div>

    {list.map((item, index) => (
        <Card style={{maxWidth:"400px",width:"100%"}} key={index} shadow="sm" radius="lg"
          isPressable onPress={() => console.log("Card details")}
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
                <h4 className="text-small font-semibold leading-none text-default-600">{item.address}</h4>
              </div>
            </div>
            <Link
            isExternal
            href={item.scan}
            >
            <Chip className="text-tiny text-white" variant="flat" color="default" radius="lg" size="sm" >Copy</Chip>
            </Link>
            
          </CardHeader>
          <CardFooter className="gap-3" style={{maxWidth:"400px",width:"100%" ,textAlign:"center"}}>
          <div className="flex gap-1">
              <div className="font-semibold text-default-400 text-small">Chain : </div>
              <div className=" text-default-400 text-small">{item.name}</div>
            </div>
            <div className="flex gap-1">
              <div className="font-semibold text-default-400 text-small">Balance : </div>
              <div className=" text-default-400 text-small">{item.bal}</div>
            </div>
          </CardFooter>
        </Card>
      ))}

      <div style={{maxWidth:"400px",width:"100%" ,textAlign:"center"}}>
      <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg" style={{maxWidth:"400px",width:"100%" ,textAlign:"center"}}>
        Manage
      </Button>
      </div>

      <div style={{maxWidth:"400px",width:"100%"}}>
      <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3" style={{textAlign:"center",maxWidth:"400px",width:"100%"}}>
        <div style={{textAlign:"center",width:"100%"}}>
          <p className="text-md" >Setting</p>
          
        </div>
      </CardHeader>
      <Divider  style={{maxWidth:"400px",width:"100%"}} />
      <CardBody>
      <br/>
      <Button color="primary" variant="bordered">
        Export privateKey
      </Button>  
      <br/>
      <Button color="secondary" variant="bordered">
        Share to friend
      </Button>  
      <br/>
      <Button color="danger" variant="bordered">
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
      </div>
      </section>
    </DefaultLayout>
  );
}
