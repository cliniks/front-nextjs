export type cnpjType = {
  cnpj_raiz: string;
  razao_social: string;
  capital_social: string;
  responsavel_federativo: string;
  atualizado_em: string;
  porte: idDescription;
  natureza_juridica: idDescription;
  qualificacao_do_responsavel: idDescription;
  socios: socios[];
  simples: simples;
  estabelecimento: estabelecimento;
};

export type socios = {
  cpf_cnpj_socio: string;
  nome: string;
  tipo: string;
  data_entrada: string;
  cpf_representante_legal: string;
  nome_representante: string | null;
  faixa_etaria: string;
  atualizado_em: string;
  pais_id: string;
  qualificacao_socio: { id: number; descricao: string };
  qualificacao_representante: string | null;
};

type idDescription = {
  id: string | number;
  descricao: string;
};

type simples = {
  simples: string;
  data_opcao_simples: string;
  data_exclusao_simples?: string;
  mei: string;
  data_opcao_mei?: string;
  data_exclusao_mei?: string;
  atualizado_em: string;
};

type atividade = {
  id: string;
  secao: string;
  divisao: string;
  grupo: string;
  classe: string;
  subclasse: string;
  descricao: string;
};

type estabelecimento = {
  cnpj: string;
  atividades_secundarias: atividade[];
  cnpj_raiz: string;
  cnpj_ordem: string;
  cnpj_digito_verificador: string;
  tipo: string;
  nome_fantasia: string;
  situacao_cadastral: string;
  data_situacao_cadastral: string;
  data_inicio_atividade: string;
  nome_cidade_exterior: string;
  tipo_logradouro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  ddd1: string;
  telefone1: string;
  ddd2: string;
  telefone2: string;
  ddd_fax: string;
  fax: string;
  email: string;
  situacao_especial: string;
  data_situacao_especial: string;
  atualizado_em: string;
  atividade_principal: atividade;
  pais: {
    id: string;
    iso2: string;
    iso3: string;
    nome: string;
    comex_id: string;
  };
  estado: { id: number; nome: string; sigla: string; ibge_id: number };
  cidade: {
    id: number;
    nome: string;
    ibge_id: number;
    siafi_id: string;
  };
  motivo_situacao_cadastral: string;
  inscricoes_estaduais: [];
};
