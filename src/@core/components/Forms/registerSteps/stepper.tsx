import { AccountStep } from "./AccountStep";
import { FinishStep } from "./FinishStep";
import { FiscalStep } from "./FiscalStep";
import { ConfirmEmail } from "./ConfirmEmail";

export const Steppers = [
  {
    component: <AccountStep />,
    title: "Informações Pessoais",
  },
  {
    component: <ConfirmEmail />,
    title: "Confirma Email",
  },
  {
    component: <FiscalStep />,
    title: "Detalhes da Empresa",
  },
  {
    component: <FinishStep />,
    title: "Registro Completo",
  },
];
