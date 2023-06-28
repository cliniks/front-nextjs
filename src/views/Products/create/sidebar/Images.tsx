import {
  CheckTwoTone,
  Close,
  CloseTwoTone,
  CloudUploadTwoTone,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSellerProducts } from "@core/contexts/SellerProductsContext";
import { L } from "@core/types/languageType";
import { Pagination } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

export const ImageBox = () => {
  const {
    product,
    handleDeleteImg,
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useSellerProducts();
  const { t }: L = useTranslation();

  return (
    <Card
      sx={{
        m: 2,
      }}
    >
      <CardHeader title={t("Product Images")} />
      <Divider />
      <Box p={2}>
        <BoxUploadWrapper sx={{ cursor: "pointer" }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragAccept && (
            <>
              <AvatarSuccess variant="rounded">
                <CheckTwoTone />
              </AvatarSuccess>
              <Typography
                sx={{
                  mt: 2,
                }}
              >
                {t("Drop the files to start uploading")}
              </Typography>
            </>
          )}
          {isDragReject && (
            <>
              <AvatarDanger variant="rounded">
                <CloseTwoTone />
              </AvatarDanger>
              <Typography
                sx={{
                  mt: 2,
                }}
              >
                {t("You cannot upload these file types")}
              </Typography>
            </>
          )}
          {!isDragActive && (
            <>
              <AvatarWrapper variant="rounded">
                <CloudUploadTwoTone />
              </AvatarWrapper>
              <Typography
                sx={{
                  mt: 2,
                }}
              >
                {t("Drag & drop files here")}
              </Typography>
            </>
          )}
        </BoxUploadWrapper>
      </Box>

      {product.imgs?.length > 0 && (
        <>
          <Divider />
          <Grid item p={2} sm={12}>
            <Box sx={{ width: "100%" }}>
              <Alert
                sx={{
                  py: 0,
                }}
                severity="success"
              >
                {t("You have uploaded")} <b>{product.imgs?.length}</b>{" "}
                {t("files")}!
              </Alert>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Swiper
                slidesPerView={4}
                spaceBetween={1}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {product.imgs.map((item, index) => (
                  <SwiperSlide key={item}>
                    <div style={{ position: "relative" }}>
                      <img
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          objectPosition: "center",
                          borderRadius: "5px",
                        }}
                        src={item}
                        alt="uploadedImg"
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: 0,
                          right: "1rem",
                          color: "white",
                          borderRadius: "50%",
                          background: "rgba(255,100,100)",
                          height: "20px",
                          width: "20px",
                          display: "grid",
                          placeItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <Close
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                          onClick={() => handleDeleteImg(index)}
                        />
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Grid>
        </>
      )}
    </Card>
  );
};

const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    padding: ${theme.spacing(2)};
    background: ${theme.colors.alpha.black[5]};
    border: 1px dashed ${theme.colors.alpha.black[30]};
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.create(["border", "background"])};

    &:hover {
      background: ${theme.colors.alpha.white[50]};
      border-color: ${theme.colors.primary.main};
    }
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: transparent;
    color: ${theme.colors.primary.main};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarDanger = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.error.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);
