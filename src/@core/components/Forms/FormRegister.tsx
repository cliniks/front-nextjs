/* eslint-disable */
import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  Grid,
  Link,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
// import { Stepper } from "./registerSteps/stepper";
import { useRegister } from "@core/contexts/RegisterContext";
import { Steppers } from "./registerSteps/stepper";

export const FormRegister = () => {
  const {
    handleSubmit,
    AuthData,
    handleCreateCodigo,
    step,
    lastStep,
    confirmEmail,
    setStep,
    loading,
    refs,
    handleSubmitCodigo,
    confirmUserEmailExist,
  } = useRegister();

  const confirmStepRegister = async () => {
    if (step === 0) {
      if (AuthData.password !== AuthData.confirmPassword) {
        return toast("Senhas não conferem, digite novamente para continuar", {
          type: "warning",
        });
      }
      if (
        !AuthData.userInfo.name ||
        !AuthData.username ||
        !AuthData.userInfo.lastName
      ) {
        return toast("Preencha todos os dados para continuar", {
          type: "warning",
        });
      }

      const confirmExistEmail = await confirmUserEmailExist();
      if (!confirmExistEmail) {
        if (!confirmEmail) {
          handleCreateCodigo();
        }
        return setStep((step) => step + 1);
      }
      return toast("Email existente!", {
        type: "warning",
      });
    }
    if (step === 1) {
      if (!confirmEmail) {
        handleSubmitCodigo();
      }
      setStep((step) => step + 1);
    }

    if (step === 2) {
      if (
        // !AuthData.userInfo.enterpriseName ||
        !AuthData.userInfo.address ||
        !AuthData.userInfo.zipCode ||
        !AuthData.userInfo.city ||
        !AuthData.userInfo.state
      ) {
        console.log(AuthData);
        return toast("Preencha todos os dados para continuar", {
          type: "warning",
        });
      }
      setStep((step) => step + 1);
    }
  };

  return (
    <Box
      style={{
        maxWidth: "650px",
        minWidth: "400px",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        style={{
          width: "100%",
          background: "rgba(230,230,230,0.1)",
          height: "120px",
          marginTop: "1rem",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Stepper sx={{ width: "100%" }} activeStep={step} alternativeLabel>
          {Steppers.map((step) => {
            return (
              <Step
                sx={{
                  display: "flex",
                  fontFamily: "Inter",
                  flexDirection: "column",
                  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active":
                    {
                      color: "#7F00FA",
                      opacity: 0.5,
                    },
                  "& .css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed":
                    {
                      color: "rgba(120,230,120)",
                    },
                }}
                key={step.title}
              >
                <StepLabel>
                  <Typography sx={{ fontFamily: "Inter", fontSize: 13 }}>
                    {step.title}{" "}
                  </Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div></div>
      </Box>

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 0 }}>
        <Box
          sx={{
            overflow: "auto",
            maxHeight: "40vh",
            pt: 2,
          }}
        >
          {Steppers[step].component}
        </Box>

        {step < lastStep ? (
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="button"
              variant={step === 0 ? "contained" : "outlined"}
              onClick={() => setStep((step) => step - 1)}
              sx={{
                mt: 3,
                mb: 2,
                border: step !== 0 && "rgba(127,0,250,0.7) solid 1px",
                color: step !== 0 && "rgba(127,0,250,0.7)",
                "&:hover": { color: "rgba(127,0,250,0.6)" },
                fontFamily: "Inter",
              }}
              disabled={step === 0 ? true : false}
            >
              Voltar
            </Button>
            <Button
              type="button"
              variant="contained"
              onClick={confirmStepRegister}
              sx={{
                mt: 3,
                mb: 2,
                background: "rgba(127,0,250,0.7)",
                "&:hover": { background: "rgba(127,0,250,0.6)" },
                fontFamily: "Inter",
              }}
              color="success"
            >
              Próxima Etapa
            </Button>
          </Box>
        ) : (
          <div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                sx={{
                  mt: 3,
                  mb: 2,
                  border: step !== 0 && "rgba(127,0,250,0.7) solid 1px",
                  color: step !== 0 && "rgba(127,0,250,0.7)",
                  "&:hover": { color: "rgba(127,0,250,0.6)" },
                  fontFamily: "Inter",
                }}
                onClick={() => setStep((step) => step - 1)}
                disabled={step === 0 ? true : false}
              >
                Voltar
              </Button>
              {loading ? (
                <Button
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2, maxHeight: "36.5px" }}
                >
                  <CircularProgress />
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: "rgba(127,0,250,0.7)",
                    "&:hover": { background: "rgba(127,0,250,0.6)" },
                  }}
                >
                  Criar conta
                </Button>
              )}
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
};
