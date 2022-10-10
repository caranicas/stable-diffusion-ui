import { style } from '@vanilla-extract/css'
import { card } from '../../../../../_recipes/card.css';

export const matrixListMain = style([card(
  {
    level: 'down'
  }
), {
  ':empty': {
    display: 'none'
  }
}]);