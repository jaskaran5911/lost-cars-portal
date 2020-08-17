def exclude_columns():
    return [
        'users.password',
        'users.created_at',
        'users.updated_at',
        'users.last_updated_by',
        'users.last_login_at',
        'users.current_login_at',
        'users.last_login_ip',
        'users.current_login_ip',
        'users.login_count'
    ]
