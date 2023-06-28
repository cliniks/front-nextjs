import { Check } from "@mui/icons-material";
import { Box, Divider, FormLabel, Grid, Typography } from "@mui/material";
import { useRegister } from "@core/contexts/RegisterContext";

export const FinishStep = () => {
  const { AuthData, UpdateAuthData } = useRegister();

  const confirmName = (name: string) => {
    const names = {
      name: "Nome",
      lastName: "Sobrenome",
      email: "Email",
      cpf: "CPF",
      cnpj: "CNPJ",
      cnae: "CNAE",
      enterpriseName: "Nome Fantasia",
      enterpriseSocial: "Razão Social",
      personType: "Tipo",
      birthDate: "Data de Nascimento",
      phone: "Telefone",
      zipCode: "CEP",
      address: "Endereço",
      number: "Número",
      district: "Bairro",
      complement: "Complemento",
      city: "Cidade",
      state: "Estado",
      country: "País",
    };
    return names[name];
  };

  return (
    <Grid item xs={12}>
      <div
        style={{
          minWidth: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "1rem 5rem",
        }}
      >
        <FormLabel
          sx={{
            fontSize: 19,
            fontWeight: 800,
            color: "black",
            fontFamily: "Inter",
          }}
        >
          Confirmando Dados:
        </FormLabel>
        <div style={{ minWidth: "400px" }}>
          {Object.keys(AuthData).map((item, index) => {
            if (
              item !== "password" &&
              item !== "confirmPassword" &&
              item !== "check" &&
              item !== "username" &&
              item !== "img"
            ) {
              if (item !== "userInfo") {
                return (
                  <Box>
                    <Box>
                      <Typography sx={{ fontFamily: "Inter" }}>
                        UserINfo
                      </Typography>
                      {confirmName(item)}
                      {AuthData[item]}
                    </Box>

                    <Box>
                      <Typography sx={{ fontFamily: "Inter" }}>
                        UserAdress
                      </Typography>
                    </Box>
                  </Box>
                );
              }
              if (AuthData.userInfo.personType === "fisica") {
                return (
                  <Box sx={{ mt: 2 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 900,
                          mb: 1,
                          textTransform: "uppercase",
                          fontFamily: "Inter",
                        }}
                        variant="h4"
                      >
                        Usuário:
                      </Typography>
                      <Divider sx={{ my: 1 }}></Divider>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Nome:{" "}
                        </Typography>{" "}
                        {AuthData.userInfo.name}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          email:
                        </Typography>{" "}
                        {AuthData.userInfo.email}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          cpf:
                        </Typography>{" "}
                        {AuthData.userInfo.cpf}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Tipo:
                        </Typography>{" "}
                        {AuthData.userInfo.personType}
                      </Typography>
                    </Box>

                    <Box mt={1}>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 900,
                          mt: 4,
                          mb: 1,
                          textTransform: "uppercase",
                          fontFamily: "Inter",
                        }}
                        variant="h4"
                      >
                        Endereço:
                      </Typography>
                      <Divider sx={{ my: 1 }}></Divider>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Rua:
                        </Typography>
                        {AuthData.userInfo.address}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Número:
                        </Typography>{" "}
                        {AuthData.userInfo.number}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Complemento:
                        </Typography>{" "}
                        {AuthData.userInfo.complement}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          CEP:
                        </Typography>{" "}
                        {AuthData.userInfo.zipCode}
                      </Typography>
                    </Box>
                  </Box>
                );
              }
              if (AuthData.userInfo.personType === "juridica") {
                return (
                  <Box sx={{ mt: 2 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 900,
                          mb: 1,
                          textTransform: "uppercase",
                          fontFamily: "Inter",
                        }}
                        variant="h4"
                      >
                        usuário
                      </Typography>
                      <Divider sx={{ my: 1 }}></Divider>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Nome:{" "}
                        </Typography>{" "}
                        {AuthData.userInfo.name}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Razão Social:
                        </Typography>{" "}
                        {AuthData.userInfo.enterpriseSocial}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Nome Fantasia:
                        </Typography>{" "}
                        {AuthData.userInfo.enterpriseName}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          email:
                        </Typography>{" "}
                        {AuthData.userInfo.email}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          CNPJ:
                        </Typography>{" "}
                        {AuthData.userInfo.cnpj}
                      </Typography>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Tipo:
                        </Typography>{" "}
                        {AuthData.userInfo.personType}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontSize: 15,
                          fontWeight: 900,
                          mb: 1,
                          mt: 4,
                          textTransform: "uppercase",
                          fontFamily: "Inter",
                        }}
                        variant="h4"
                      >
                        Endereço:
                      </Typography>
                      <Divider sx={{ my: 1 }}></Divider>
                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Rua:
                        </Typography>
                        {AuthData.userInfo.address}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Número:
                        </Typography>{" "}
                        {AuthData.userInfo.number}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Complemento:
                        </Typography>{" "}
                        {AuthData.userInfo.complement}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          CEP:
                        </Typography>{" "}
                        {AuthData.userInfo.zipCode}
                      </Typography>

                      <Typography
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          fontFamily: "Inter",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 15,
                            fontWeight: 900,
                            mr: 1,
                            textTransform: "uppercase",
                            fontFamily: "Inter",
                          }}
                        >
                          Cidade:
                        </Typography>{" "}
                        {AuthData.userInfo.city}
                      </Typography>
                    </Box>
                  </Box>
                );
              }
            }
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "5px",
          cursor: "pointer",
          padding: "1rem 5rem",
        }}
        onClick={() =>
          UpdateAuthData({ target: { name: "check", value: !AuthData.check } })
        }
      >
        <div
          style={{
            width: "25px",
            height: "25px",
            border: "2px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 5px 0 0",
          }}
        >
          {AuthData.check ? <Check color="success" /> : null}
        </div>
        <FormLabel sx={{ cursor: "pointer", fontFamily: "Inter" }}>
          Concordo com os termos e condições.
        </FormLabel>
      </div>
    </Grid>
  );
};
