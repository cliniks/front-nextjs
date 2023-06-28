import {
  MailOutline,
  QuestionMark,
  SearchOutlined,
  Star,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { sdk } from "@core/sdkProvider";
// import { Link } from "react-router-dom";
import { Store } from "ecommersys/dist/Entities";
import { useSDK } from "@core/contexts/sdkContext";
import { formatReal } from "@core/utils/functions";
import { imgs } from "@core/assets/imgs";
import { toast } from "react-toastify";
import Link from "next/link";

const Lojas = () => {
  const [stores, setStores] = useState([]);
  const { connected } = useSDK();
  const [name, setName] = useState("");
  const fetchStores = () =>
    sdk.Global.getAllSellers(
      { page: 0, filter: { fields: "", key: "", value: "" }, size: 20 },
      (data) => {
        setStores(data.result);
      }
    );

  const searchStore = () =>
    sdk.Global.getAllSellers(
      { page: 0, filter: { fields: "", key: "name", value: name }, size: 20 },
      (data) => {
        if (!data.result?.length) {
          toast("Nenhuma loja Encontrada");
        }
        if (data.result?.length) {
          setStores(data.result);
        }
      }
    );

  useEffect(() => {
    if (connected) {
      fetchStores();
    }
  }, [connected]);

  return (
    <Box className="LojasPage">
      <Box className="searchBarBox">
        <TextField
          fullWidth
          className="textFieldSearch"
          name="procurar"
          id="procurar"
          placeholder="Procurar por loja"
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={searchStore}>
          <SearchOutlined style={{ height: "50px" }} />
        </Button>
      </Box>
      <Grid container className="LojasCards">
        {stores?.length > 0
          ? stores.map((item) => {
              return (
                <Grid
                  component={Link}
                  href={`/store/${item._id}`}
                  item
                  key={item.name + item.storeInfo.email}
                >
                  <LojaCard
                    name={item.name}
                    item={item}
                    email={item.storeInfo.email}
                    store={item}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
    </Box>
  );
};
export default Lojas;

const LojaCard = ({
  name,
  email,
  item,
  store,
}: {
  name?: string;
  email?: string;
  item: Store;
  store: any;
}) => {
  return (
    <Box className="LojaCard">
      {store?.freeShippingMinPrice?.hasFreeShipping &&
        parseFloat(store?.freeShippingMinPrice?.value) > 0 && (
          <Box
            style={{
              backgroundColor: "#ffc107",
              textAlign: "center",
              padding: "10px 10px",
              height: "40px",
            }}
          >
            <Typography fontSize="13px" variant="body1">
              <Box component="span" sx={{ fontWeight: "bold" }}>
                FRETE GRÁTIS
              </Box>{" "}
              compras acima de {formatReal(store?.freeShippingMinPrice?.value)}
            </Typography>
          </Box>
        )}
      <div
        className="image"
        style={{
          backgroundImage: !item.banner?.split("/").includes("avatar.jpg")
            ? `url("${item.banner}")`
            : `url(${imgs.backgorundDefaultStores.src}`,
          backgroundPosition: "center",
          height: store?.freeShippingMinPrice?.hasFreeShipping
            ? "150px"
            : "190px",
        }}
      />
      <div className="line" />

      <div className="description">
        <div style={{ display: "flex" }}>
          <Avatar
            src={
              item.banner.indexOf("avatar") === -1
                ? item.img
                : imgs.logoRedondo.src
            }
            sx={{
              width: 50,
              height: 50,
              marginRight: 2,
              backgroundPosition: "center",
              backgroundSize: "contain",
              border: "1px solid #F7F7F7",
              boxShadow: "0.5px 0.5px 5px 0.5px #ECECEC",
            }}
          >
            {" "}
            <div />
          </Avatar>

          <div>
            <Typography component="h1" sx={{ color: "#aa53fc" }}>
              {name.toUpperCase()}
            </Typography>
            <div className="stars">
              <Star style={{ color: "#ddd" }} />
              <Star style={{ color: "#ddd" }} />
              <Star style={{ color: "#ddd" }} />
              <Star style={{ color: "#ddd" }} />
              <Star style={{ color: "#ddd" }} />
            </div>
          </div>
        </div>

        <div className="contact">
          <MailOutline style={{ color: "rgb(200, 200, 200)" }} />
          <p>{email}</p>
        </div>
        <Button>
          <QuestionMark />
          Perguntar
        </Button>
      </div>
    </Box>
  );
};
