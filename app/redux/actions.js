import { ext } from '../const';

export const SET_NAVIGATION_INITIALIZED = ext('SET_NAVIGATION_INITIALIZED');
export const REFRESH_NAV = 'REFRESH_NAV';

export const setNavigationInitialized = () => ({
  type: SET_NAVIGATION_INITIALIZED,
});

export const refreshNav = () => {
  return { type: REFRESH_NAV };
};
