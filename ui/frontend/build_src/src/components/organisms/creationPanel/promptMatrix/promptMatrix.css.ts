import { style } from '@vanilla-extract/css';

import {
  card
} from '../../../_recipes/card.css';

export const PromptMatrixMain = style([card({
  level: 1,
  backing: 'normal'
}), {
  display: 'flex',
  flexDirection: 'column',
}]);
