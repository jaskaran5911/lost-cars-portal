export class AppConfig {
  public static readonly API = 'api/';

  // Account
  public static readonly AUTH_API = 'auth';
  public static readonly SIGN_UP_API = 'sign-up';
  public static readonly ACCOUNT_DETAILS_API = 'account-details';
  public static readonly REFRESH_TOKEN_API = 'refresh-token';
  public static readonly LOGOUT_API = 'logout';
  public static readonly CHANGE_PASSWORD_API = 'change-password';

  // User
  public static readonly USER_API = AppConfig.API + 'user';

  // Role
  public static readonly ROLE_API = AppConfig.API + 'role';

  /* *********************************************************
   Frontend URLs
   ********************************************************* */
  public static readonly HOME = '';

  // Account
  public static readonly ACCOUNT  = '/account/';
  public static readonly LOGIN = AppConfig.ACCOUNT + 'login/';
  public static readonly REGISTRATION = AppConfig.ACCOUNT + 'registration/';
  public static readonly DASHBOARD = 'dashboard/';
  public static readonly USER_DASHBOARD = 'user-dashboard/';
  public static readonly POLICE_OFFICER_DASHBOARD = 'police-officer-dashboard/';

  // User
  public static readonly USER = '/user/';

}
