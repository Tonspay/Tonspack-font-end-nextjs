export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Tonspack wallet",
  description: "Mobile web3 wallet in one tap",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Wallet",
      href: "/wallet",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Wallet",
      href: "/wallet",
    },
    {
      label: "WalletDetails",
      href: "/wallet_details",
    },
    {
      label: "Action",
      href: "/action",
    },
  ],
  links: {
    github: "https://github.com/tonspay",
    twitter: "https://twitter.com/tonsprotocol",
    docs: "https://docs.tonspack.com/",
    app:'https://t.me/tonspack_bot/app',
    discord: "#",
    sponsor: "#",
  },
};
