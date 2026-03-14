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


export interface HealthInput {
  age: number;
  heightCm: number;
  weightKg: number;
  sleepHoursPerNight: number;
  exerciseMinutesPerWeek: number;
  smoking: number;
  drinkingUnitsPerWeek: number;
  screenHoursPerDay: number;
}

export interface HealthOutput {
  overall_score: number;
  organs: {
    organ: "heart" | "lungs" | "brain" | "eyes" | "liver";
    biological_age: number;
    risk_level: number;
    reasoning_short: string;
  }[];
  primary_risks: {
    risk_factor: string;
    severity: "low" | "medium" | "high";
    description: string;
  }[];
  positive_traits: {
    trait: string;
    impact: string;
  }[];
  areas_for_improvement: {
    trait: string;
    impact: string;
  }[];
  recommendations: {
    category: string;
    action: string;
    expected_benefit: string;
  }[];
  motivational_message: string;
}