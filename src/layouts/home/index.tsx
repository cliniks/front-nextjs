import { ArrowUpward } from "@mui/icons-material";
import { PropsWithChildren, useEffect, useState } from "react";
import { Footer } from "@core/components/Footer";
import { TopHomeMenu } from "@core/components/Menus/topHomeMenu";
import { TopUserBar } from "@core/components/Menus/topUserBar";

// import { useUser } from "@core/hooks/useUser";

const HomeLayout = ({ children }: PropsWithChildren) => {
  const [scrolled, setScrolled] = useState(false);
  // const { loading } = useUser();

  // useEffect(() => {
  //   window.scrollTo({ top: 0 });
  // }, [loading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", (e) => {
      window.pageYOffset > 0 ? setScrolled(true) : setScrolled(false);
    });
  }

  return (
    <div className="homeLayout">
      <HomeLayoutComponent.menuUser />
      <HomeLayoutComponent.topMenu />
      {children}
      <HomeLayoutComponent.footer />
      <button
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? "all" : "none",
          cursor: "pointer",
          transition: "opacity ease 0.7s",
          width: "40px",
          height: "40px",
          background: "white",
          border: "rgba(0,0,0,0.5) solid 1px",
          color: "rgba(0,0,0,0.5)",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpward />
      </button>
    </div>
  );
};

let HomeLayoutComponent = {
  menuUser: () => <TopUserBar />,
  topMenu: () => <TopHomeMenu />,
  footer: () => <Footer />,
};

HomeLayout.authGuard = false;

export { HomeLayout };
