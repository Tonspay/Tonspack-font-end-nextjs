import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { DatePicker } from "@nextui-org/date-picker";
import { parseAbsolute } from "@internationalized/date";
import { useState, useEffect } from "react";
import Router from "next/router";

import { address_readable } from "../../core/utils/utils";
import { tryCloseWebappWindows } from "../../core/utils/tg";
import {
  wallet_list_generate_action,
  wallet_action_decode,
  wallet_action_details,
  wallet_mpc_try_get_kp,
  mpc,
  action_router,
} from "../../core/wallet/index";

import { storage_get_raw_init_data } from "@/core/storage/index";
import { Loading } from "@/components/loading";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
type colorType =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

export default function DocsPage() {
  const permissionsList = [
    {
      color: "default" as colorType,
      title: "Bal",
      data: "Access to address balance",
    },
    {
      color: "default" as colorType,
      title: "Txns",
      data: "Access to address history transactions",
    },
    {
      color: "default" as colorType,
      title: "Activies",
      data: "Access to address history activites",
    },
    {
      color: "default" as colorType,
      title: "Signature",
      data: "Aable to sign message",
    },
    {
      color: "default" as colorType,
      title: "Send",
      data: "Able to send transaction",
    },
  ];
  const [permissions, setPermissions] = useState([permissionsList[0]]);
  const [data, setData] = useState({
    title: "pending",
    full_address: "",
    address: "",
    scan: "",
    img: "",
    name: "",
    bal: "",
  });

  const [isMainPageLoading, setIsMainPageLoading] = useState(true);

  // const [isLoading, setIsLoading] = useState(false);

  const [action, setAction] = useState({
    t: 0,
    i: "",
    d: "",
    c: {
      t: 0,
      i: 0,
    },
    r: "",
  });

  useEffect(() => {
    const onload = async () => {
      const mpc_kp = await wallet_mpc_try_get_kp();

      console.log("🚧 mpc_kp", mpc_kp);
      const init = storage_get_raw_init_data();

      console.log("🚧 init", init);
      if (init && init.starData) {
        //&& init?.isTelegram)
        const a = await wallet_action_details(
          wallet_action_decode(init.starData),
        );

        console.log("🚧 wallet_action_details", a);
        setAction(a);
        if (a && mpc_kp) {
          const wallets = mpc.getAddress(mpc_kp, false);
          const ws = await wallet_list_generate_action(wallets, a);

          setData(ws);
          setIsMainPageLoading(false);
          // console.log("🚧 Disable setIsMainPageLoading(false)")
        }

        if (action.t == 0) {
          setPermissions([permissionsList[0], permissionsList[2]]);
        }
        if (action.t == 1) {
          setPermissions([permissionsList[0], permissionsList[3]]);
        }

        if (action.t == 2) {
          setPermissions([permissionsList[0], permissionsList[4]]);
        }
      }
    };

    onload().catch(console.error);
  }, []);

  async function button_confirm() {
    console.log("🚧 confirm button", action);
    const ret = await action_router(action);

    console.log("🚧 action_router", ret);
    // const ret = await api_action(action);
    // console.log("🚧 submit action ret",ret)
    if (action.r && action.r.length > 5) {
      console.log("🚧 auto redirect ");
      Router.push(action.r);
    } else {
      console.log("🚧 auto close ");
      tryCloseWebappWindows();
    }
  }
  //Permission part

  const permission = (
    <PopoverContent>
      <div className="px-1 py-2">
        <div className="text-small font-bold">Popover Content</div>
        <div className="text-tiny">This is the popover content</div>
      </div>
    </PopoverContent>
  );

  return (
    <DefaultLayout name="action">
      {isMainPageLoading ? <Loading /> : null}

      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <div className={title()}>
            {action && action?.t == 0 ? "Connect Wallet " : null}
            {action && action?.t == 1 ? "Sign Message " : null}
            {action && action?.t == 2 ? "Send Txn " : null}
          </div>
        </div>

        {
          <Card
            isPressable
            radius="lg"
            shadow="sm"
            style={{ maxWidth: "400px", width: "100%" }}
            onPress={() => {
              console.log("Card details router");
              Router.push({ pathname: "/wallet_details", query: data });
            }}
          >
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Image
                  alt="chain logo"
                  height={40}
                  radius="sm"
                  src={data.img}
                  width={40}
                />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small font-semibold leading-none text-default-600">
                    {data.address}
                  </h4>
                </div>
              </div>
              <Link isExternal href={data.scan}>
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
                <div className=" text-default-400 text-small">{data.name}</div>
              </div>
              <div className="flex gap-1">
                <div className="font-semibold text-default-400 text-small">
                  Balance :{" "}
                </div>
                <div className=" text-default-400 text-small">{data.bal}</div>
              </div>
            </CardFooter>
          </Card>
        }

        <div style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}>
          <Button
            color="success"
            radius="full"
            style={{ maxWidth: "400px", width: "100%", textAlign: "center" }}
            onClick={button_confirm}
          >
            {action && action?.t == 0 ? "Connect " : null}
            {action && action?.t == 1 ? "Sign " : null}
            {action && action?.t == 2 ? "Confirm " : null}
          </Button>
        </div>

        <div style={{ maxWidth: "400px", width: "100%" }}>
          <Card className="max-w-[400px]">
            <CardHeader
              className="flex gap-3"
              style={{ textAlign: "center", maxWidth: "400px", width: "100%" }}
            >
              <div style={{ textAlign: "center", width: "100%" }}>
                <h1 className="text-md">Details</h1>
              </div>
            </CardHeader>
            <Divider style={{ maxWidth: "400px", width: "100%" }} />

            <div>
              <CardBody>
                {action && action?.t == 0 ? (
                  <div style={{ width: "100%", lineHeight: "350%" }}>
                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Wallet
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">Wallet</div>
                              <div className="text-tiny">
                                Which wallet you use ?
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div style={{ maxWidth: "70%" }}>
                        {address_readable(8, 8, data.full_address)}
                      </div>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Chain
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">Chain</div>
                              <div className="text-tiny">
                                What chain you act with ?
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :<h3>{data.name}</h3>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Active
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">Active</div>
                              <div className="text-tiny">
                                What kind of action it is ?
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div>
                        Connect to
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger>
                            <Button className="capitalize" color="default">
                              Dapp
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                Connect to Dapp
                              </div>
                              <div className="text-tiny">
                                Connect wallet to Dapp :{" "}
                                <a href={action.d}>{action.d}</a>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Permission
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                Permission
                              </div>
                              <div className="text-tiny">
                                The active permissions for Dapp
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div>
                        {permissions.map((d) => (
                          <Popover
                            key={d.title}
                            showArrow
                            color={d.color}
                            placement="top"
                          >
                            <PopoverTrigger>
                              <Button
                                className="capitalize"
                                color={d.color ? d.color : "default"}
                              >
                                {d.title}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="px-1 py-2">
                                <div className="text-small font-bold">
                                  {d.title}
                                </div>
                                <div className="text-tiny">{d.data}</div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        ))}
                      </div>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              CreateTime
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                CreateTime
                              </div>
                              <div className="text-tiny">
                                When this active created
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div>
                        <DatePicker
                          className="max-w-xs"
                          defaultValue={parseAbsolute(
                            new Date(action.t).toISOString(),
                            "UTC",
                          )}
                          isDisabled={true}
                          label={"This active create at"}
                          labelPlacement={"inside"}
                        />
                      </div>
                    </div>
                    <Divider />
                  </div>
                ) : null}
                {action && action?.t == 1 ? (
                  <div style={{ width: "100%", lineHeight: "350%" }}>
                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Wallet
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">Wallet</div>
                              <div className="text-tiny">
                                Which wallet you use ?
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div style={{ maxWidth: "70%" }}>
                        {address_readable(8, 8, data.full_address)}
                      </div>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Chain
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">Chain</div>
                              <div className="text-tiny">
                                What chain you act with ?
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :<h3>{data.name}</h3>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Active
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">Active</div>
                              <div className="text-tiny">
                                What kind of action it is ?
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div>
                        Sign
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger>
                            <Button className="capitalize" color="default">
                              Message
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                Sign Message
                              </div>
                              <div className="text-tiny">Sign : {action.d}</div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Permission
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                Permission
                              </div>
                              <div className="text-tiny">
                                The active permissions for Dapp
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div>
                        {permissions.map((d) => (
                          <Popover
                            key={d.title}
                            showArrow
                            color={d.color}
                            placement="top"
                          >
                            <PopoverTrigger>
                              <Button
                                className="capitalize"
                                color={d.color ? d.color : "default"}
                              >
                                {d.title}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="px-1 py-2">
                                <div className="text-small font-bold">
                                  {d.title}
                                </div>
                                <div className="text-tiny">{d.data}</div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        ))}
                      </div>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              CreateTime
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                CreateTime
                              </div>
                              <div className="text-tiny">
                                When this active created
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div>
                        <DatePicker
                          className="max-w-xs"
                          defaultValue={parseAbsolute(
                            new Date(action.t).toISOString(),
                            "UTC",
                          )}
                          isDisabled={true}
                          label={"This active create at"}
                          labelPlacement={"inside"}
                        />
                      </div>
                    </div>
                    <Divider />
                  </div>
                ) : null}
                {action && action?.t == 2 ? (
                  <div style={{ width: "100%", lineHeight: "350%" }}>
                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Wallet
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">Wallet</div>
                              <div className="text-tiny">
                                Which wallet you use ?
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div style={{ maxWidth: "70%" }}>
                        {address_readable(8, 8, data.full_address)}
                      </div>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Chain
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">Chain</div>
                              <div className="text-tiny">
                                What chain you act with ?
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :<h3>{data.name}</h3>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Active
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">Active</div>
                              <div className="text-tiny">
                                What kind of action it is ?
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div>
                        Send Transaction
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger>
                            <Button className="capitalize" color="default">
                              Dapp
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                Send Transaction
                              </div>
                              <div className="text-tiny">
                                Send :{" "}
                                {Buffer.from(action.d).toString("base64")}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              Permission
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                Permission
                              </div>
                              <div className="text-tiny">
                                The active permissions for Dapp
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div>
                        {permissions.map((d) => (
                          <Popover
                            key={d.title}
                            showArrow
                            color={d.color}
                            placement="top"
                          >
                            <PopoverTrigger>
                              <Button
                                className="capitalize"
                                color={d.color ? d.color : "default"}
                              >
                                {d.title}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <div className="px-1 py-2">
                                <div className="text-small font-bold">
                                  {d.title}
                                </div>
                                <div className="text-tiny">{d.data}</div>
                              </div>
                            </PopoverContent>
                          </Popover>
                        ))}
                      </div>
                    </div>
                    <Divider />

                    <div style={{ display: "flex", width: "100%", gap: "3%" }}>
                      <div style={{ width: "20%" }}>
                        <Popover
                          key="permission"
                          showArrow
                          color="default"
                          placement="top"
                        >
                          <PopoverTrigger style={{ width: "100%" }}>
                            <Button className="capitalize" color="default">
                              CreateTime
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="px-1 py-2">
                              <div className="text-small font-bold">
                                CreateTime
                              </div>
                              <div className="text-tiny">
                                When this active created
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      :
                      <div>
                        <DatePicker
                          className="max-w-xs"
                          defaultValue={parseAbsolute(
                            new Date(action.t).toISOString(),
                            "UTC",
                          )}
                          isDisabled={true}
                          label={"This active create at"}
                          labelPlacement={"inside"}
                        />
                      </div>
                    </div>
                    <Divider />
                  </div>
                ) : null}
              </CardBody>
            </div>
            <CardFooter>
              <Link isExternal showAnchorIcon href="https://t.me/Tonspackdev">
                Meet any issues ?
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
    </DefaultLayout>
  );
}
