import { Avatar } from "@mui/material";
import Link from "next/link";

const UserLink = ({ user, className, text }: UserLinkProps) => {
  if (!user) return null;

  return (
    <Link
      href="/dashboard"
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ color: "white", fontFamily: "normal", padding: "10px" }}>
        {text ? text : `Olá ${user.userInfo.name}`}
      </h1>
      {user.img ? (
        <img
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectPosition: "center",
            objectFit: "cover",
          }}
          src={user.img}
          alt="userImage"
        />
      ) : (
        <Avatar />
      )}
    </Link>
  );
};

type UserLinkProps = {
  user: any;
  className?: string;
  text?: string;
};

export { UserLink };
