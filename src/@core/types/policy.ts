import { PolicyType } from "ecommersys/dist/Entities";

export interface Policy {
  _id?: string;
  name: string;
  body: string;
  type: PolicyType;
  status: PolicyStatus;
  owner?: String;
}

export type PolicyStatus = "draf" | "public" | "inactive";
