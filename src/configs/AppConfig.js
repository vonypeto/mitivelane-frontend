import { SIDE_NAV_DARK, NAV_TYPE_SIDE, DIR_LTR } from "constants/ThemeConstant";
import { env } from "./EnvironmentConfig";

export const APP_NAME = "Organization";
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const APP_PREFIX_PATH = "/app";
export const AUTH_PREFIX_PATH = "/auth";
export const PRE_PREFIX_PATH = "/pre";

export const ORGANIZATION_ID = "100";

export const THEME_CONFIG = {
  navCollapsed: false,
  sideNavTheme: SIDE_NAV_DARK,
  locale: "en",
  navType: NAV_TYPE_SIDE,
  topNavColor: "#FAFBFF",
  headerNavColor: "#fafbffff",
  mobileNav: false,
  currentTheme: "light",
  direction: DIR_LTR,
};
