export class Constant {
  public static readonly UNAUTHORIZED = 'Unauthorized';

  public static readonly UPLOAD_ALLOWED_FILE_FORMAT = 'png, jpg, jpeg';

  public static readonly MODAL_WIDTH = '600px';
  public static readonly PAGE_SIZE_LIST = [5, 10, 25, 100];

  public static readonly ASC = 'asc';
  public static readonly DESC = 'desc';

  public static readonly ID = 'id';
  public static readonly EQ = 'eq';
  public static readonly HAS = 'has';
  public static readonly ANY = 'any';
  public static readonly EMAIL = 'email';
  public static readonly STATUS = 'status';
  public static readonly UPDATED_AT = 'updated_at';
}

export class Messages {
  public static readonly STATUS_CHANGED_SUCCESSFULLY = 'Status changed Successfully!!!';
  public static readonly PASSWORD_NOT_MATCHED = 'Password not matched';
}

export class Roles {
  public static readonly ROLE_ADMIN = 'admin';
  public static readonly ROLE_POLICE_OFFICER = 'police-officer';
  public static readonly ROLE_USER = 'user';
}
