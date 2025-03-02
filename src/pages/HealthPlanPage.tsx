import { useState } from 'react';
import { useHealthPlan } from '../hooks/useHealthPlan';
import PlanSection from '../components/health-plan/PlanSection';
import { PlanItemType } from '../types';

type PlanCategory = 'recipe' | 'aerobic' | 'acupoint';

export default function HealthPlanPage() {
  const { 
    plan, 
    addRecipe, 
    removeRecipe, 
    addAerobic, 
    removeAerobic,
    addAcupoint,
    removeAcupoint
  } = useHealthPlan();
  
  const [activeCategory, setActiveCategory] = useState<PlanCategory | null>(null);
  const [newItem, setNewItem] = useState<PlanItemType>({ title: '', details: '' });

  const handleAddItem = (category: PlanCategory) => {
    if (newItem.title && newItem.details) {
      switch (category) {
        case 'recipe':
          addRecipe(newItem);
          break;
        case 'aerobic':
          addAerobic(newItem);
          break;
        case 'acupoint':
          addAcupoint(newItem);
          break;
      }
      setNewItem({ title: '', details: '' });
      setActiveCategory(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="p-6 space-y-6">
          <PlanSection
            title="Recommended Recipes"
            items={plan.recipes}
            emoji="🫖"
            onAddItem={() => setActiveCategory('recipe')}
            onRemoveItem={removeRecipe}
          />

          <PlanSection
            title="Aerobics Exercises"
            items={plan.aerobics}
            emoji="🏃"
            onAddItem={() => setActiveCategory('aerobic')}
            onRemoveItem={removeAerobic}
          />

          <PlanSection
            title="Acupoint Therapy"
            items={plan.acupoints}
            emoji="👆"
            onAddItem={() => setActiveCategory('acupoint')}
            onRemoveItem={removeAcupoint}
          />
        </div>
      </div>

      {/* Add Item Dialog */}
      {activeCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Add New {activeCategory === 'recipe' ? 'Recipe' : 
                      activeCategory === 'aerobic' ? 'Exercise' : 'Acupoint'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full border rounded-lg p-2"
                  placeholder={activeCategory === 'recipe' ? "Enter recipe name" :
                             activeCategory === 'aerobic' ? "Enter exercise name" :
                             "Enter acupoint name"}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Details
                </label>
                <textarea
                  value={newItem.details}
                  onChange={(e) => setNewItem({ ...newItem, details: e.target.value })}
                  className="w-full border rounded-lg p-2 h-32"
                  placeholder={activeCategory === 'recipe' ? "Enter ingredients and steps..." :
                             activeCategory === 'aerobic' ? "Enter exercise instructions and duration..." :
                             "Enter location, method and benefits..."}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setActiveCategory(null);
                  setNewItem({ title: '', details: '' });
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddItem(activeCategory)}
                disabled={!newItem.title || !newItem.details}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}