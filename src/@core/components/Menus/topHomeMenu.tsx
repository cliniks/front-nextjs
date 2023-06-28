import { Box, useMediaQuery } from "@mui/material";
import { imgs } from "@core/assets/imgs";
import Link from "next/link";

const TopHomeMenu = (props: TopHomeMenuProps) => {
  const phone = useMediaQuery(`(max-width:500px)`);
  return (
    <section {...props}>
      <Link href="/" style={{ display: phone ? "none" : "flex" }}>
        <img src={imgs.logo.src} alt="logo" />
      </Link>
      <Box className="-Menus">
        {links.map((item: any) => {
          return (
            <Link
              href={item.to}
              onClick={() => (item.onClick ? item.onClick() : null)}
              key={item.name}
            >
              {item.name}
            </Link>
          );
        })}
      </Box>
    </section>
  );
};

type TopHomeMenuProps = {
  ClassName?: string;
};

TopHomeMenu.defaultProps = {
  className: "home_menuHome",
};

const links = [
  { name: "HOME", to: "/" },
  { name: "QUEM SOMOS", to: "/quem-somos" },
  { name: "LOJAS", to: "/lojas" },
];

export { TopHomeMenu };
