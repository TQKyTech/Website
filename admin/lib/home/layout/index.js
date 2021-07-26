var user = {fullName: Global.Cookie.getUser(Global.Variable.localFullName)};

function selectedLayout(view) {
    let layout = TQKy.Layout.getLayoutByLink('/' + view.getAttribute("id"));
    TQKy.Layout.goToLayout(layout);
}

function logout() {
    TQKy.Cookie.deleteAll();
    document.location.href = document.location.protocol + '//' + document.location.host + '/dang-nhap';
}

function loadMenuItems() {
    try {
        var menuHtml = '', menuItem = TQKy.Menu.getMenuItemByLink(), drawMenuItems = [];
        Config.menus.sort((a, b) => a.position - b.position);
        Config.menus.forEach(menu => {
            if (!menu.menuItemList) {
                return;
            }

            for (let i = 0; i < menu.menuItemList.length; i++) {
                const item = menu.menuItemList[i];
                if (!menuItem && item.selected) {
                    menuItem = item;
                }
                if (item.groupId) {
                    if (drawMenuItems.includes(item.groupId)) { continue; } 
                    drawMenuItems.push(item.groupId);

                    let itemsHtml = ``, headerActive;
                    for (let j = i; j < menu.menuItemList.length; j++) {
                        const _item = menu.menuItemList[j];
                        if (_item.groupId != item.groupId) { continue; }

                        let itemActive = (location.pathname + '/').startsWith((_item.parentLayout.length > 1 ? _item.parentLayout : '') + _item.link + '/');
                        if (!headerActive) {
                            headerActive = itemActive;
                        }
                        itemsHtml += `
                            <li id="${_item.id}" class="${itemActive ? 'active' : ''}">
                                <a href="${_item.parentLayout + _item.link}" onclick="TQKy.Menu.clickMenuItem('${_item.name}'); return false;">
                                    <span class="pcoded-mtext">${_item.name}</span>
                                </a>
                            </li>
                        `;
                    }

                    menuHtml += `
                        <ul class="pcoded-item pcoded-left-item">
                            <li class="pcoded-hasmenu ${headerActive ? 'pcoded-trigger' : ''}">
                                <a>
                                    <span class="pcoded-micon"><i class="${item.groupIcon}"></i></span>
                                    <span class="pcoded-mtext">${item.groupName}</span>
                                </a>
                                <ul class="pcoded-submenu">
                                    ${itemsHtml}
                                </ul>
                            </li>
                        </ul>
                    `;
                } else { 
                    menuHtml += `
                        <ul class="pcoded-item pcoded-left-item ${menuItem && menuItem.id == item.id ? 'pcoded-trigger' : ''}">
                            <li id="${item.id}" class="">
                                <a href="${item.parentLayout + item.link}" onclick="TQKy.Menu.clickMenuItem('${item.name}'); return false;">
                                    <span class="pcoded-micon"><i class="${item.icon}"></i></span>
                                    <span class="pcoded-mtext">${item.name}</span>
                                </a>
                            </li>
                        </ul>
                    `;
                }
            }
        });

        $('#core-menu').html(menuHtml);

        TQKy.System.on('EventSelectedMenuItem', (data) => {
            $('#' + data.newMenuItem.id).addClass('active');
            TQKy.File.getFile(data.newMenuItem.file, function(_html) {
                document.title = data.newMenuItem.name;
                $('#tableTitle').html(data.newMenuItem.name);
                $('#core-body').html('');
                TQKy.System.addHtml(document.getElementById('core-body'), _html); 
            });
            if (data.newMenuItem.id !== data.oldMenuItem.id) {
                $('#' + data.oldMenuItem.id).removeClass('active');
            }
        }, 'HomeLayout');
        TQKy.System.on('EventPopLayout', (data) => {
            TQKy.Menu.localCurrentMenuList.forEach(function(item) {
                $('#' + item.id).removeClass('active');
            });

            $('#' + data.newMenuItem.id).addClass('active');
            TQKy.File.getFile(data.newMenuItem.file, function(_html) {
                document.title = data.newMenuItem.name;
                $('#tableTitle').html(data.newMenuItem.name);
                $('#core-body').html('');
                TQKy.System.addHtml(document.getElementById('core-body'), _html); 
            });
        }, 'HomeLayout');
        TQKy.Menu.clickMenuItem(menuItem.id);
    } catch (e) {
        console.error(e);
    }
}

loadMenuItems();

var checkLogout = setInterval(() => {
    if (!TQKy.Cookie.get(Global.Cookie.keys.user) || ($('#userId').text() && $('#userId').text() != Global.Cookie.getUser('id'))) {
        TQKy.Layout.goToLayout(TQKy.Layout.getLoginLayout());
        clearInterval(checkLogout);
    }
}, 1000);

    

    

    

    