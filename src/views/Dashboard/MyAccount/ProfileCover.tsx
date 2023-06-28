import { FC } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Card,
  Avatar,
  IconButton,
  styled,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import UploadTwoToneIcon from "@mui/icons-material/UploadTwoTone";
import { useUser } from "@core/contexts/UserContext";
import { User } from "ecommersys/dist/Entities";

interface ProfileCoverProps {
  user: User;
}

const ProfileCover: FC<ProfileCoverProps> = ({ user }) => {
  const { t }: { t: any } = useTranslation();

  const { handleUpdateUserImage } = useUser();

  const handleChangeImg = (e: any) => handleUpdateUserImage(e.target.files);

  return (
    <>
      <Box display="flex" mb={3}>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {t("Profile for")} {user.userInfo.name}
          </Typography>
          <Typography variant="subtitle2">
            {t("Here you can see and edit data related to your profile.")}
          </Typography>
        </Box>
      </Box>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.userInfo.name} src={user.img} />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
            onChange={handleChangeImg}
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired,
};

export default ProfileCover;

const Input = styled("input")({
  display: "none",
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
    position: relative;
    overflow: visible;
    display: inline-block;
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
