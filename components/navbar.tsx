import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useRouter } from "next/router";

import { siteConfig } from "@/config/site";
import { TwitterIcon, GithubIcon, Logo } from "@/components/icons";

export const Navbar = (props: any) => {
  let isBackAble = false;

  const r = useRouter();

  if (
    // props?.name == "wallet" ||
    // props?.name == "dapp" ||
    // props?.name == "setting" ||
    // props?.name == "action" ||
    // props?.name == "index" ||
    props?.name == "wallet_details"
  ) {
    isBackAble = true;
  }

  function goBack() {
    r.back();
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          {isBackAble ? (
            <RiArrowGoBackFill
              color="white"
              size="75"
              onClick={() => goBack()}
            />
          ) : null}
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            {/* <p className="font-bold text-inherit">Tonspack</p> */}
          </NextLink>
        </NavbarBrand>
        {/* <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div> */}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          {/* <ThemeSwitch /> */}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        {/* <ThemeSwitch /> */}
        {/* <NavbarMenuToggle /> */}
      </NavbarContent>
    </NextUINavbar>
  );
};
