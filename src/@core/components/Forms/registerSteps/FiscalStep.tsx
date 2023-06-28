import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRegister } from "@core/contexts/RegisterContext";
import { api } from "@/services/axiosInstance";
import { toast } from "react-toastify";

import SearchIcon from "@mui/icons-material/Search";

export const FiscalStep = () => {
  const { UpdateAuthData, refs, AuthData, setAuthData } = useRegister();
  const [loading, setLoading] = useState(false);
  const cnpjRef = useRef<any>();

  useEffect(() => {
    if (
      refs.dateMaskRef.current &&
      refs.cepMaskRef.current &&
      refs.cpfMaskRef.current
    ) {
      refs.dateMaskRef.current.placeholder = "Data de Nascimento *";
      refs.cepMaskRef.current.placeholder = "CEP *";
      refs.cpfMaskRef.current.placeholder = "CPF *";
    }
  }, [refs]);

  useEffect(() => {
    if (cnpjRef.current) {
      cnpjRef.current.placeholder = "CNPJ *";
    }
  }, [cnpjRef]);

  const GetCNPJ = async (value) => {
    setLoading(true);
    try {
      const cnpjReajust = value
        .split("")
        .filter((item) => {
          if (!item.includes(".") && !item.includes("-") && !item.includes("/"))
            return true;
        })
        .join("")
        .toString();

      const cnpjData = await api.get(
        `https://publica.cnpj.ws/cnpj/${cnpjReajust}`
      );

      console.log(cnpjData);

      const rsocialValue = cnpjData.data.razao_social;
      const cnaeValue = `${cnpjData.data.estabelecimento.atividade_principal.subclasse}. ${cnpjData.data.estabelecimento.atividade_principal.descricao}`;

      const data = cnpjData.data.estabelecimento;

      setAuthData((state) => ({
        ...state,
        userInfo: {
          ...state.userInfo,
          address: data.logradouro,
          zipCode: data.cep,
          city: data.cidade.nome,
          cnpj: data.cnpj,
          cnae: cnaeValue,
          country: data.pais.nome,
          district: data.bairro || "",
          enterpriseName: data.nome_fantasia,
          enterpriseSocial: rsocialValue,
          complement: data.complemento,
          state: data.estado.sigla,
          number: data.numero,
        },
      }));

      setLoading(false);
    } catch (err) {
      setLoading(false);

      toast(
        "Não foi possível achar o CNPJ informado, verifique e tente novamente",
        { type: "error" }
      );
    }
  };

  const getCep = async (value) => {
    setLoading(true);

    console.log(value);

    const cpfReajust = value
      .split("")
      .filter((item) => {
        if (!item.includes(".") && !item.includes("-") && !item.includes("/"))
          return true;
      })
      .join("")
      .toString();

    console.log(cpfReajust);

    try {
      const getMycep = await axios
        .get(`https://viacep.com.br/ws/${cpfReajust}/json/`)
        .then((res) => {
          if (res.data) {
            return res.data;
          } else {
            toast(
              "Não foi possível encontrar seu endereço, digite de forma manual.",
              { type: "error", autoClose: 3000 }
            );
          }
        })
        .catch((err) => {
          toast(
            "Não foi possível encontrar seu endereço, digite de forma manual.",
            { type: "error", autoClose: 3000 }
          );
          setLoading(false);
        });

      setAuthData((state) => ({
        ...state,
        userInfo: {
          ...state.userInfo,
          address: getMycep.logradouro,
          zipCode: getMycep.cep,
          city: getMycep.localidade,
          district: getMycep.bairro || "",
          complement: getMycep.complemento,
          state: getMycep.uf,
          number: getMycep.numero,
        },
      }));

      setLoading(false);
    } catch (error) {}
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

  const cep = (cepFormat: string) => {
    cepFormat = cepFormat.replace(/\D/g, "");
    cepFormat = cepFormat.replace(/(\d{5})(\d)/, "$1-$2");
    cepFormat = cepFormat.replace(/(-\d{3})\d+?$/, "$1");

    return cepFormat;
  };
  function handleChangeMask(event) {
    const { value } = event.target;

    UpdateAuthData({ target: { value: mask(value), name: "cpf" } });
    // console.log(mask(value));
  }

  function handleChangeCnpj(event) {
    const { value } = event.target;

    UpdateAuthData({ target: { value: mask(value), name: "cnpj" } });
    // console.log(ask(value));
  }

  function handleChangeCep(event) {
    const { value } = event.target;

    UpdateAuthData({ target: { value: cep(value), name: "zipCode" } });
    // console.log(mask(value));
  }
  const handleClickCnpj = (cnpj) => {
    GetCNPJ(cnpj);
  };
  const handleClickCep = (cep) => {
    getCep(cep);
  };

  return (
    <Grid container spacing={2} position="relative">
      {loading && (
        <Box
          position="absolute"
          sx={{
            width: "100%",
            height: "100%",
            zIndex: 1000,
            background: "white",
            opacity: "0.4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {AuthData.userInfo.personType !== "fisica" && (
        <Grid item xs={12} sm={12}>
          <TextField
            required
            fullWidth
            disabled={loading}
            name="enterpriseName"
            label="Nome da Empresa"
            type="text"
            value={AuthData.userInfo.enterpriseSocial}
            id="address"
            onChange={(e) => UpdateAuthData(e)}
            autoComplete="street-address"
            sx={{ fontFamily: "Inter" }}
          />
        </Grid>
      )}

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="fisica"
            value={AuthData.userInfo.personType}
            label="Tipo"
            name="personType"
            sx={{ fontFamily: "Inter" }}
            onChange={UpdateAuthData}
          >
            <MenuItem value="fisica" sx={{ fontFamily: "Inter" }}>
              Pessoa Fisica
            </MenuItem>
            <MenuItem value="juridica" sx={{ fontFamily: "Inter" }}>
              Pessoa Juridica
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {AuthData.userInfo.personType !== "fisica" ? (
        <Grid item xs={12} sm={6}>
          {/* <div className="likeMuiIMask register">
            <IMaskInput
              inputRef={cnpjRef}
              placeholderChar="CNPJ *"
              mask="00.000.000/0000-00"
              value={AuthData.userInfo.cnpj}
              onComplete={GetCNPJ}
              overwrite
            />
          </div> */}

          <FormControl sx={{ width: "100%" }} variant="outlined">
            <InputLabel
              required
              htmlFor="outlined-adornment-password"
              sx={{ fontFamily: "Inter" }}
            >
              CNPJ
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              inputProps={{ maxLength: 18 }}
              onChange={handleChangeCnpj}
              sx={{ fontFamily: "Inter" }}
              value={AuthData.userInfo.cnpj}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={(e) => handleClickCnpj(AuthData.userInfo.cnpj)}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              label="Cnpj"
            />
          </FormControl>
        </Grid>
      ) : (
        <Grid item xs={12} sm={6}>
          {/* <div className="likeMuiIMask register">
            <IMaskInput
              inputRef={cnpjRef}
              placeholderChar="CPF *"
              mask="000.000.000-00"
              value={AuthData.userInfo.cpf}
              onComplete={(e) =>
                UpdateAuthData({ target: { value: e, name: "cpf" } })
              }
              overwrite
            />
          </div> */}

          <TextField
            required
            fullWidth
            id="outlined-basic"
            label="CPF"
            sx={{ fontFamily: "Inter" }}
            variant="outlined"
            value={AuthData.userInfo.cpf}
            inputProps={{ maxLength: 14 }}
            onChange={handleChangeMask}
          />
        </Grid>
      )}

      <Grid item xs={12} sm={4}>
        {/* <div className="likeMuiIMask register">
          <IMaskInput
            inputRef={refs.cepMaskRef}
            mask="00000-000"
            placeholderChar="CEP *"
            value={AuthData.userInfo.zipCode}
            onComplete={getCep}
            overwrite
          />
        </div> */}

        <FormControl sx={{ width: "100%" }} variant="outlined">
          <InputLabel
            required
            htmlFor="outlined-adornment-password"
            sx={{ fontFamily: "Inter" }}
          >
            CEP
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            inputProps={{ maxLength: 18 }}
            sx={{ fontFamily: "Inter" }}
            onChange={handleChangeCep}
            value={AuthData.userInfo.zipCode}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={(e) => handleClickCep(AuthData.userInfo.zipCode)}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Cnpj"
          />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={8}>
        <TextField
          required
          sx={{ fontFamily: "Inter" }}
          fullWidth
          name="address"
          disabled={loading}
          label="Endereço"
          type="text"
          value={AuthData.userInfo.address}
          id="address"
          onChange={(e) => UpdateAuthData(e)}
          autoComplete="street-address"
        />
      </Grid>

      <Grid item xs={12} sm={2}>
        <TextField
          fullWidth
          name="number"
          sx={{ fontFamily: "Inter" }}
          disabled={loading}
          label="Número"
          type="text"
          value={AuthData.userInfo.number}
          id="number"
          onChange={(e) => UpdateAuthData(e)}
          autoComplete=""
        />
      </Grid>

      <Grid item xs={12} sm={10}>
        <TextField
          fullWidth
          name="complement"
          label="Complemento"
          sx={{ fontFamily: "Inter" }}
          disabled={loading}
          value={AuthData.userInfo.complement}
          type="text"
          onChange={(e) => UpdateAuthData(e)}
          id="complement"
          autoComplete=""
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          name="city"
          sx={{ fontFamily: "Inter" }}
          disabled={loading}
          label="Cidade"
          type="text"
          value={AuthData.userInfo.city}
          id="city"
          autoComplete=""
          onChange={(e) => UpdateAuthData(e)}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          sx={{ fontFamily: "Inter" }}
          fullWidth
          name="state"
          disabled={loading}
          label="Estado"
          value={AuthData.userInfo.state}
          type="text"
          onChange={(e) => UpdateAuthData(e)}
          id="state"
          autoComplete=""
        />
      </Grid>
    </Grid>
  );
};
