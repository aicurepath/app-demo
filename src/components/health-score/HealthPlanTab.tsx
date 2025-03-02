import { useState } from 'react';
import { useHealthPlan } from '../../hooks/useHealthPlan';
import PlanSection from '../health-plan/PlanSection';
import AddItemDialog from '../health-plan/AddItemDialog';
import { PlanItemType } from '../../types';

type ItemType = 'recipe' | 'aerobic' | 'acupoint';

export default function HealthPlanTab() {
  const { 
    plan, 
    addRecipe, 
    removeRecipe, 
    addAerobic, 
    removeAerobic,
    addAcupoint,
    removeAcupoint
  } = useHealthPlan();

  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    type: ItemType | null;
    title: string;
    emoji: string;
  }>({
    isOpen: false,
    type: null,
    title: '',
    emoji: ''
  });

  const handleAdd = (item: PlanItemType) => {
    switch (dialogConfig.type) {
      case 'recipe':
        addRecipe(item);
        break;
      case 'aerobic':
        addAerobic(item);
        break;
      case 'acupoint':
        addAcupoint(item);
        break;
    }
  };

  return (
    <div className="space-y-6">
      <PlanSection
        title="Recommended Recipes"
        items={plan.recipes}
        emoji="🫖"
        onAddItem={() => setDialogConfig({
          isOpen: true,
          type: 'recipe',
          title: 'Recipe',
          emoji: '🫖'
        })}
        onRemoveItem={removeRecipe}
      />

      <PlanSection
        title="Aerobics Exercises"
        items={plan.aerobics}
        emoji="🏃"
        onAddItem={() => setDialogConfig({
          isOpen: true,
          type: 'aerobic',
          title: 'Exercise',
          emoji: '🏃'
        })}
        onRemoveItem={removeAerobic}
      />

      <PlanSection
        title="Acupoint Therapy"
        items={plan.acupoints}
        emoji="👆"
        onAddItem={() => setDialogConfig({
          isOpen: true,
          type: 'acupoint',
          title: 'Acupoint',
          emoji: '👆'
        })}
        onRemoveItem={removeAcupoint}
      />

      <AddItemDialog
        isOpen={dialogConfig.isOpen}
        onClose={() => setDialogConfig(prev => ({ ...prev, isOpen: false }))}
        onAdd={handleAdd}
        title={dialogConfig.title}
        emoji={dialogConfig.emoji}
      />
    </div>
  );
}