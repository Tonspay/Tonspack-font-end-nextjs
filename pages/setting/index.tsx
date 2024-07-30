import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Avatar} from "@nextui-org/avatar"
import {Image }from "@nextui-org/image";
import {Chip} from "@nextui-org/chip"
import {Divider} from"@nextui-org/divider"

import {Loading} from "@/components/loading";

import {wallet_connect,wallet_list_generate,wallet_init_data_set} from "../../core/wallet/index";

import { useState, useEffect } from 'react'

import  { Toaster } from 'react-hot-toast';
import { deving , exportPrivateKey} from "../../core/utils/utils"

import {telegramShareApp} from "../../core/utils/tg"

import Router from "next/router"

type walletCard = {
  title: string,
  address:string,
  scan:string,
  img: string,
  name:string,
  bal:string,
}

export default function DocsPage() {
  // let list : walletCard[];
  let list : walletCard[];
  list = [];
  const [data, setData] = useState([
    {
      title: "pending",
      address:"",
      scan:"",
      img: "",
      name:"",
      bal:"",
    }
  ])

  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  const [isNav, setIsNav] = useState("");
  useEffect(() => {
    const onload =async ()=>{
      setIsMainPageLoading(false)
      setIsNav('setting')
    }
    onload().catch(console.error);;
  }, [])
  // return returnFont()
  return (
    <DefaultLayout name={isNav}>
      {
        isMainPageLoading ? <Loading /> : null
      }
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Toaster />

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
      <Button color="primary" variant="bordered" onClick={exportPrivateKey}>
        Export privateKey
      </Button>  
      <br/>
      <Button color="secondary" variant="bordered" onClick={telegramShareApp}>
        Share Tonspack
      </Button>  
      <br/>
      <Button color="danger" variant="bordered" onClick={deving}>
        Close
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
