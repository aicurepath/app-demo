import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { HealthPlan, PlanItemType } from '../types';

const DEFAULT_PLAN: HealthPlan = {
  id: '1',
  title: 'Your Health Plan',
  description: 'Personalized TCM recommendations for your well-being',
  recipes: [],
  aerobics: [],
  acupoints: []
};

interface HealthPlanStore {
  plan: HealthPlan;
  addRecipe: (recipe: PlanItemType) => void;
  removeRecipe: (index: number) => void;
  addAerobic: (aerobic: PlanItemType) => void;
  removeAerobic: (index: number) => void;
  addAcupoint: (acupoint: PlanItemType) => void;
  removeAcupoint: (index: number) => void;
}

export const useHealthPlan = create<HealthPlanStore>()(
  persist(
    (set) => ({
      plan: DEFAULT_PLAN,
      addRecipe: (recipe) =>
        set((state) => ({
          plan: {
            ...state.plan,
            recipes: [...(state.plan.recipes || []), recipe]
          }
        })),
      removeRecipe: (index) =>
        set((state) => ({
          plan: {
            ...state.plan,
            recipes: (state.plan.recipes || []).filter((_, i) => i !== index)
          }
        })),
      addAerobic: (aerobic) =>
        set((state) => ({
          plan: {
            ...state.plan,
            aerobics: [...(state.plan.aerobics || []), aerobic]
          }
        })),
      removeAerobic: (index) =>
        set((state) => ({
          plan: {
            ...state.plan,
            aerobics: (state.plan.aerobics || []).filter((_, i) => i !== index)
          }
        })),
      addAcupoint: (acupoint) =>
        set((state) => ({
          plan: {
            ...state.plan,
            acupoints: [...(state.plan.acupoints || []), acupoint]
          }
        })),
      removeAcupoint: (index) =>
        set((state) => ({
          plan: {
            ...state.plan,
            acupoints: (state.plan.acupoints || []).filter((_, i) => i !== index)
          }
        }))
    }),
    {
      name: 'health-plan-storage'
    }
  )
);