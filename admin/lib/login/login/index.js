function login() {
    Global.Cookie.setUser({
        name: 'Admin',
        username: 'Admin',
        id: '1',
        image: ''
    });
    TQKy.Layout.loginSuccess('1');
}