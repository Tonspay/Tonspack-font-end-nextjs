import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Image }from "@nextui-org/image";

export default function DocsPage() {
  const list = [
    {
      title: "TON",
      address:"EQCZBjHIQsKYDo4xob7C3IbHL8X4hUz1Q4A7BgzXNNt_yPIP",
      img: "/images/chains/ton.jpg",
    },
    {
      title: "ETH",
      address:"0xF1a4db7963afB51ef0465BaA805914A2ACF951f9",
      img: "/images/chains/eth.jpg",
    },
    {
      title: "Solana",
      address:"1YF4hSrqRqSKwnLDwkR1df5chDEnAV67aBL2EKYXzXS",
      img: "/images/chains/solana.jpg",
    },
  ];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Walet Page</h1>
        </div>

    {list.map((item, index) => (
        // <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
        //   <CardBody className="overflow-visible p-0">
        //     <Image
        //       shadow="sm"
        //       radius="lg"
        //       width="100%"
        //       alt={item.title}
        //       className="w-full object-cover h-[140px]"
        //       src={item.img}
        //     />
        //   </CardBody>
        //   <CardFooter className="text-small justify-between">
        //     <b>{item.title}</b>
        //     <p className="text-default-500">{item.price}</p>
        //   </CardFooter>
        // </Card>



    <Card
      key={index}
      isFooterBlurred
      radius="lg"
      className="border-none"
      isPressable onPress={() => console.log("item pressed")}
    >
      
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={250}
        src={item.img}
        width={500}
      />

      
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">{item.address}</p>
        <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
          Copy
        </Button>
      </CardFooter>
    </Card>

      ))}
      </section>
    </DefaultLayout>
  );
}
