import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  styled,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import { useUser } from "@core/contexts/UserContext";
import { sdk } from "@core/sdkProvider";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { pathCurrentOrNextNavigate } from "@core/utils/functions";
import { useRouter } from "next/router";
import Link from "next/link";

const HeaderProduct = ({ store, setStore }) => {
  const { t }: { t: any } = useTranslation();
  const { user } = useUser();
  const { id } = useRouter().query;

  const isOwner = id === user?.storeId || store?._id === user?.storeId;

  const handleFile = (type, e) => {
    const file = e.target.files[0];
    const form = new FormData();
    form.append("img", file);

    if (type === "banner") {
      sdk.Seller.store.updateStoreBanner(form, (res) => {
        setStore(res);
      });
    }
    if (type === "profile") {
      sdk.Seller.store.updateStoreImage(form, (res) => {
        setStore(res);
      });
    }
  };

  // if (!user) return <></>;

  return (
    <Box style={{ position: "relative" }}>
      <CardCover>
        <CardMedia image={store?.banner} />
        {isOwner ? (
          <CardCoverAction>
            <Input
              accept="image/*"
              id="change-cover"
              onChange={(e) => handleFile("banner", e)}
              multiple={false}
              type="file"
            />
            <label htmlFor="change-cover">
              <Button
                startIcon={<UploadTwoToneIcon />}
                variant="contained"
                component="span"
              >
                {t("Change cover")}
              </Button>
            </label>
          </CardCoverAction>
        ) : null}
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={store?.name} src={store?.img} />
        {isOwner ? (
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
              onChange={(e) => handleFile("profile", e)}
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        ) : null}
      </AvatarWrapper>
      <Box py={2} pl={2}>
        {/* <Typography gutterBottom variant="h4">
          {store?.name}
        </Typography> */}
        {/* <Typography variant="subtitle2">{store?.segments}</Typography> */}
      </Box>
      <Grid container display={"flex"} justifyContent={"right"} mb={3}>
        <Grid item>
          {store?._id === user?.storeId ? (
            <Box>
              <Button
                sx={{
                  mx: 2,
                }}
                component={Link}
                href="/dashboard/seller/myStore/edit"
                variant="contained"
                startIcon={<EditTwoToneIcon />}
              >
                {t("Edit info store")}
              </Button>

              <Button
                sx={{
                  mt: { xs: 2, sm: 0 },
                }}
                component={Link}
                startIcon={<EditTwoToneIcon />}
                href={`${pathCurrentOrNextNavigate()}/products`}
                variant="contained"
              >
                {t("Manage products")}
              </Button>
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

HeaderProduct.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired,
};

export default HeaderProduct;
const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: absolute;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(30)};
    
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const Input = styled("input")({
  display: "none",
});
