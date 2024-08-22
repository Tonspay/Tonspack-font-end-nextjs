import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {Loading} from "@/components/loading";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Avatar} from "@nextui-org/avatar"
import {Image }from "@nextui-org/image";
import {Chip} from "@nextui-org/chip"
import {Divider} from"@nextui-org/divider"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/modal";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import  { Toaster } from 'react-hot-toast';
import { deving , address_readable} from "../../core/utils/utils"

type walletCard = {
  title: string,
  full_address:string,
  address:string,
  scan:string,
  img: string,
  name:string,
  bal:string,
}
export default function DocsPage() {
  const router = useRouter()
  const query = router.query

  let list : walletCard[];
  list = [];
  list.push(router.query as walletCard)
  const [isMainPageLoading, setIsMainPageLoading] = useState(true);
  useEffect(() => {
    const onload =async ()=>{
      setIsMainPageLoading(false)
    }
    onload().catch(console.error);;
  }, [])
  // return returnFont()
  return (
    <DefaultLayout name="">
      
      {
        isMainPageLoading ? <Loading /> : null
      }
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Toaster />
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>{query.name}</h1>
        </div>

    { list.map((item, index) => (
      <Card style={{maxWidth:"400px",width:"100%"}} key={index} shadow="sm" radius="lg"
      isPressable onPress={() => {
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
            <h4 className="text-small font-semibold leading-none text-default-600">{item.name}</h4>
          </div>
        </div>
        <Link
        isExternal
        href={item.scan}
        >
        <Chip className="text-tiny text-white" variant="flat" color="default" radius="lg" size="sm" >Copy</Chip>
        </Link>
        
      </CardHeader>
      <CardBody style={{maxWidth:"400px",width:"100%" ,textAlign:"center"}}>
        <div className="flex gap-1">
          <div className=" text-default-400 text-small" style={{textAlign:"center" ,width:'100%'}}>{address_readable(12,12,item.full_address)}</div>
        </div>
        <div className="flex gap-1">
          <div className="text-big" style={{textAlign:"center" ,width:'100%'}}>{item.bal}</div>
        </div>
      </CardBody>
    </Card>
      ))
      
    }

      <div style={{maxWidth:"400px",width:"100%"}}>
      <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3" style={{textAlign:"center",maxWidth:"400px",width:"100%"}}>
        <div style={{textAlign:"center",width:"100%"}}>
          <p className="text-md" >Setting</p>
        </div>
      </CardHeader>
      <Divider  style={{maxWidth:"400px",width:"100%"}} />
      <CardBody>
      <div style={{display:"flex",justifyContent:"center"}}>
        <Button color="primary" variant="bordered" style={{width:"50%"}}  onClick={deving}>
          Send
        </Button>  
      
        <Button color="secondary" variant="bordered" style={{width:"50%"}}  onClick={deving}>
          Recive
        </Button> 
      </div>
      
 
      <br/>
      <Button color="success"  onClick={deving}>
        Buy/Sell
      </Button>
      <br/>
      <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"  onClick={deving}>
        Swap
      </Button>
      <br/>
      <Button color="danger"  onClick={deving}>
        Scan QR
      </Button>

      </CardBody>
      <Divider/>
      <CardFooter>
      </CardFooter>
    </Card>
      </div>
      </section>
    </DefaultLayout>
  );
}
