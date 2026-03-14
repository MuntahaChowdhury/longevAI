// lib/types/health.types.ts

export type OrganName =
  | "heart"
  | "lungs"
  | "brain"
  | "metabolic system"
  | "liver";

export type RiskLevel = 1 | 2 | 3 | 4 | 5;

export type OrganResult = {
  organ: OrganName;
  biological_age: number;
  risk_level: RiskLevel;
  reasoning_short: string;
};

export type HealthAnalysisResult = {
  overall_score: number;
  organs: OrganResult[];
};
