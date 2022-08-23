import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from '../../models';

export const getUi = createFeatureSelector<UiState>('ui');

export const isBtnEnabled = createSelector(getUi, (ui) => ui.button.enabled);
