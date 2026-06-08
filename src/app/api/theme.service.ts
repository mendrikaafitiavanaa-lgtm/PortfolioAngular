import { createReducer, on, createAction } from '@ngrx/store';

export const toggleDarkMode = createAction('[Theme] Toggle');
export const setDarkMode = createAction('[Theme] Set', (value: boolean) => ({ value }));

export interface ThemeState {
  darkMode: boolean;
}

// 👉 Lire la valeur sauvegardée au démarrage
export const initialState: ThemeState = {
  darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false')
};

export const themeReducer = createReducer(
  initialState,
  on(toggleDarkMode, state => {
    const newState = { ...state, darkMode: !state.darkMode };
    localStorage.setItem('darkMode', JSON.stringify(newState.darkMode)); // 👉 Sauvegarde
    return newState;
  }),
  on(setDarkMode, (state, { value }) => {
    localStorage.setItem('darkMode', JSON.stringify(value)); // 👉 Sauvegarde
    return { ...state, darkMode: value };
  })
);
