import {
  Button,
  Card,
  Grid,
  Avatar,
  TextField,
  Typography,
  IconButton,
  Box,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useEditProfile } from "@core/contexts/EditProfileContext";
import { useUser } from "@core/contexts/UserContext";
import { UploadTwoTone } from "@mui/icons-material";
import Link from "next/link";

const EditProfilePage = ({ handleClose }: { handleClose?: () => void }) => {
  const { refs, handleSubmit } = useEditProfile();
  const { handleUpdateUserImage, user } = useUser();

  const handleChangeImg = (e: any) => handleUpdateUserImage(e.target.files);

  const cep = (cepFormat: string) => {
    cepFormat = cepFormat.replace(/\D/g, "");
    cepFormat = cepFormat.replace(/(\d{5})(\d)/, "$1-$2");
    cepFormat = cepFormat.replace(/(-\d{3})\d+?$/, "$1");

    return cepFormat;
  };

  const mask = (v: string) => {
    v = v.replace(/\D/g, "");

    if (v?.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      v = v.replace(/^(\d{2})(\d)/, "$1.$2");
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
      v = v.replace(/(\d{4})(\d)/, "$1-$2");
    }

    return v;
  };

  return (
    <Grid
      container
      spacing={1}
      // width="97%"
      component={Card}
      p={3}
      // m={2}
      sx={{ overflow: "auto" }}
      display="flex"
      justifyContent="center"
      position="relative"
    >
      <Grid position="absolute" top="1rem" left="1rem">
        <Button
          component={Link}
          href="/dashboard/user/myAccount"
          startIcon={<ArrowBackIcon />}
        ></Button>
      </Grid>
      <Grid>
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
                <UploadTwoTone />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Informações Pessoais:
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Nome"
          inputRef={refs.nome}
          defaultValue={user.userInfo.name}
        >
          Nome
        </TextField>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Sobrenome"
          inputRef={refs.sobrenome}
          defaultValue={user.userInfo.lastName}
        >
          Sobrenome
        </TextField>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Telefone pra contato"
          inputRef={refs.whatsapp}
          defaultValue={user.userInfo.phone}
        >
          whatsapp
        </TextField>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="E-mail de contato"
          inputRef={refs.email}
          defaultValue={user.userInfo.email}
        >
          E-mail de contato
        </TextField>{" "}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h3" align="center">
          Informações Fiscais:
        </Typography>
      </Grid>

      {user.userInfo.cpf === "" || user.userInfo.cpf === null ? (
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            disabled
            label="CNPJ"
            inputRef={refs.cnpj}
            defaultValue={mask(user.userInfo.cnpj)}
          >
            cnpj
          </TextField>
        </Grid>
      ) : (
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            disabled
            label="CPF"
            inputRef={refs.cpf}
            defaultValue={mask(user.userInfo.cpf)}
          >
            CPF
          </TextField>
        </Grid>
      )}

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="CEP"
          inputRef={refs.cep}
          defaultValue={cep(user.userInfo.zipCode)}
        >
          CEP
        </TextField>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Endereço"
          inputRef={refs.endereco}
          defaultValue={user.userInfo.address}
        >
          Endereço
        </TextField>{" "}
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Número"
          inputRef={refs.numero}
          defaultValue={user.userInfo.number}
        >
          Número
        </TextField>{" "}
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Complemento"
          inputRef={refs.complemento}
          defaultValue={user.userInfo.complement}
        >
          Complemento
        </TextField>{" "}
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Bairro"
          inputRef={refs.bairro}
          defaultValue={user.userInfo.district}
        >
          Cidade
        </TextField>{" "}
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Cidade"
          inputRef={refs.cidade}
          defaultValue={user.userInfo.city}
        >
          Cidade
        </TextField>{" "}
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="Estado"
          inputRef={refs.estado}
          defaultValue={user.userInfo.state}
        >
          Estado
        </TextField>{" "}
      </Grid>
      <Grid item xs={12} md={6} display="flex" justifyContent="center">
        <Button
          style={{ paddingLeft: "80px", paddingRight: "80px" }}
          size="large"
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => {
            handleSubmit(handleClose);
          }}
        >
          Salvar
        </Button>
      </Grid>
    </Grid>
  );
};

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

export default EditProfilePage;
