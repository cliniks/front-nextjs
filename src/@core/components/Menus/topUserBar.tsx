import { PersonOutline, ShoppingCart } from "@mui/icons-material";
import Link from "next/link";
import { useCart } from "@core/contexts/CartContext";
import { useUser } from "@core/hooks/contexstHooks";

const TopUserBar = (props: TopUserBarProps) => {
  // const { user } = useUser();
  const { setOpen } = useCart();
  return (
    <div {...props}>
      <div>
        {/* <section>
          <Link href="/">
            <img width="150px" src={imgs.logo} alt="logo" />
          </Link>
        </section> */}
      </div>
      <div className="UserArea">
        <section className="-icons">
          {links.map((item: any) => {
            // if (item.authRequired === true && !user) return null;
            if (item.name === "cart")
              return (
                <Link
                  href={item.href}
                  key={item.name}
                  onClick={() => setOpen(true)}
                >
                  {item.icon}
                </Link>
              );
            return (
              <Link href={item.href} key={item.name}>
                {item.icon}
              </Link>
            );
          })}
        </section>
        <section className="UserIconArea">
          {/* {!user ? (
            <Link href="/login" className="-menuLogin">
              ENTRAR
            </Link>
          ) : (
            <UserLink user={user} />
          )} */}
        </section>
      </div>
    </div>
  );
};

TopUserBar.defaultProps = {
  className: "home_menuUser",
};

type TopUserBarProps = {
  className: string;
};

const links = [
  // { name: "search", href: "#", icon: <Search />, authRequired: false },
  {
    name: "dashboard",
    href: "dashboard",
    icon: <PersonOutline />,
    authRequired: true,
  },
  // {
  //   name: "favorite",
  //   href: "#",
  //   icon: <FavoriteBorderOutlined />,
  //   authRequired: true,
  // },
  {
    name: "cart",
    href: "#",
    icon: <ShoppingCart />,
    authRequired: true,
  },
];

export { TopUserBar };
