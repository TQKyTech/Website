(Config = () => {
    Config.websiteType = 'admin';

    Config.apiAddress = 'http://localhost:22280';
    Config.version = '';
    Config.callApiFromWebSocket = false;

    Config.menus = [
        {
            "id": "login", "position": 1, "name": "Đăng nhập", "link": "/dang-nhap", "previousLayout": null, "nextLayout": "/", "file": "/admin/lib/login/layout/index.html", "isLoginLayout": true
        },
        {"id": "CategoryManagement", "position": 2, "name": "Danh mục", "link": "/", "icon": "fa fa-table", "previousLayout": "/dang-nhap", "nextLayout": null, "file": "/admin/lib/home/layout/index.html", "isLoginLayout": false, 
            "menuItemList": [
                {"id": "dashboard", "position": 1, "selected": true, "link": "/dashboard", "parentLayout": "/", "name": "Dashboard", "icon": "feather icon-home", "file": "/admin/lib/home/dashboard/index.html"},
                
                {"groupId": "1", "groupName": "Danh Mục", "groupIcon": "feather icon-clipboard", "id": "camera", "position": 2, "selected": false, "link": "/danh-muc/camera", "parentLayout": "/", "name": "Camera", "icon": "/admin/assets/images/icon/thuc-an.svg", "file": "/admin/lib/home/category/camera/index.html"},

                {"groupId": "2", "groupName": "Cấu hình", "groupIcon": "feather icon-sliders", "id": "user", "position": 8, "selected": false, "link": "/cau-hinh/nhan-vien", "parentLayout": "/", "name": "Nhân viên", "icon": "/admin/assets/images/icon/user.svg", "file": "/admin/lib/home/setting/user/index.html"},
            ]
        }
    ];

    Config.SocketMessageTypes = {}
    Config.getSocketTypes = async function(token) {
        return Object.values(Config.SocketMessageTypes);
    } 

    Config.getLayouts = async function(token) {
        return Config.menus;
    }

    Config.onLoadCore = function() {
        TQKy.System.on('EventInvalidToken', (data) => {
            if (typeof data !== 'undefined' && data.status === 403) {
                // console.log(data.result);
                TQKy.Layout.goToLayout(TQKy.Layout.getLoginLayout());
            }
        });
        TQKy.System.on('EventLoadingLayout', (data) => {
            if (typeof data !== 'undefined') {
                // console.log(data);
                if (data.loading) {

                } else {

                }
            }
        });
    }
})();

(Lang = () => {
    // Lang.multiLang = true;
    // Lang.langPath = '/' + Config.websiteType + '/assets/lang';

    /*Lang.getLang = function() {
        // get from db...
        return 'vi';
    }
    Lang.setLang = function(lang) {
        // save to db...
    }*/
})();
(Global = () => {
    (Global.Variable = () => {
    })();

    (Global.Cookie = () => {
        Global.Cookie.keys = {
            user: '_' + (location.port ? location.port : '80') + '_user' 
        }
        Global.Cookie.setUser = (user) => {
            if (typeof user != 'object') {
                throw new Error('The user variable must be an object');
            }
            let _user = Global.Cookie.getUser();
            user = Object.assign(_user, user);
            let userString = btoa(unescape(encodeURIComponent(JSON.stringify(user))))
            TQKy.Cookie.set(Global.Cookie.keys.user, userString);
        }
        Global.Cookie.getUser = (key) => {
            let userString = TQKy.Cookie.get(Global.Cookie.keys.user);
            userString = userString ? decodeURIComponent(escape(atob(userString))) : '{}'; 
            let user = JSON.parse(userString);
            return key ? user[key] : user;
        }
    })();

    (Global.LocalStorage = () => {
        Global.LocalStorage._getKey = (key) => {
            if (!key) { return ''; }
            return location.host + '_' + key;
        }
        Global.LocalStorage.set = (key, data) => {
            let userString = btoa(unescape(encodeURIComponent(JSON.stringify(data))))
            localStorage.setItem(Global.LocalStorage._getKey(key), userString);
        }
        Global.LocalStorage.get = (key) => {
            try {
                let dataString = localStorage.getItem(Global.LocalStorage._getKey(key));
                dataString = dataString ? decodeURIComponent(escape(atob(dataString))) : null; 
                return dataString ? JSON.parse(dataString) : null;
            } catch (e) {
                return null;
            }
        }
    })();

    (Global.Api = () => {
    })();
    (Global.Event = () => {
    })();
})();
