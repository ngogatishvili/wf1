import { SHOW_ALERT, HIDE_ALERT } from './alertTypes';

export const showAlert = () => ({
  type: SHOW_ALERT,
});

export const hideAlert = () => ({
  type: HIDE_ALERT,
});
