export interface PlanItemType {
  title: string;
  details: string;
}

export interface HealthPlan {
  id: string;
  title: string;
  description: string;
  recipes: PlanItemType[];
  aerobics: PlanItemType[];
  acupoints: PlanItemType[];
}