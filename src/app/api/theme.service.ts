import { createReducer, on, createAction } from '@ngrx/store';

export const toggleDarkMode = createAction('[Theme] Toggle');
export const setDarkMode = createAction('[Theme] Set', (value: boolean) => ({ value }));

export interface ThemeState {
  darkMode: boolean;
}

export const initialState: ThemeState = {
  darkMode: false
};

export const themeReducer = createReducer(
  initialState,
  on(toggleDarkMode, state => ({ ...state, darkMode: !state.darkMode })),
  on(setDarkMode, (state, { value }) => ({ ...state, darkMode: value }))
);
