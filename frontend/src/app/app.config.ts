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

  // Complaint
  public static readonly COMPLAINT_API = AppConfig.API + 'complaint';
  public static readonly COMPLAINT_UPLOAD_API = AppConfig.COMPLAINT_API + '/upload/';
  public static readonly COMPLAINT_DOWNLOAD_API = AppConfig.COMPLAINT_API + '/download/';

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

  // Complaint
  public static readonly COMPLAINT = '/complaint/';
  public static readonly CREATE_COMPLAINT = AppConfig.COMPLAINT + 'create';
  public static readonly MY_COMPLAINT = AppConfig.COMPLAINT + 'my';
  public static readonly ALL_COMPLAINT = AppConfig.COMPLAINT + 'all';
  public static readonly RESPONDED_COMPLAINT = AppConfig.COMPLAINT + 'responded';

}
