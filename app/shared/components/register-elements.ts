import { registerElement } from '@nativescript/core';
import { Card } from './card/card';
import { ActionTile } from './action-tile/action-tile';
import { ScoreDisplay } from '../../features/health-score';
import { PlanSummary } from '../../features/health-plan/components/plan-summary/plan-summary';

// Register UI Components
registerElement('CardView', () => Card);
registerElement('ActionTile', () => ActionTile);
registerElement('ScoreDisplay', () => ScoreDisplay);
registerElement('PlanSummary', () => PlanSummary);