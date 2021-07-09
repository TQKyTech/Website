function getParamsFromHref(href) {
    href = href ? href : document.location.href
    let paramstr = href.split('?')[1];
    let params = {};
    if (!paramstr) {return params;}
    let paramsarr = paramstr.split('&'); 
    for (let i = 0; i < paramsarr.length; i++) {
        let tmparr = paramsarr[i].split('='); // split key from value
        params[tmparr[0]] = tmparr[1];        // sort them in a arr[key] = value way
    }
    return params;
}
function updateParamToHref(key, val/*/, doNotReload = false/*/) {
    if (typeof key == "undefined" || typeof val == "undefined") {return;}
    let _params = getParamsFromHref();
    let _input = {};

    if (typeof _params[key] != "undefined" && _params[key] == val) {
        return;
    }

    _input[key] = val;
    _params = {..._params, ..._input};

    let _query = '?',
        _keys = Object.keys(_params);
    _keys.forEach((k, index) => {
        _query += k + '=' + _params[k];
        if (index < _keys.length - 1) {
            _query += '&';
        }
    });
    let _menuItem = TQKy.Menu.getMenuItemByCurretLink();
    TQKy.Menu.clickMenuItem(_menuItem.id, _query);
}
function updateParamsToHref(object/*/, doNotReload = false/*/) {
    if (typeof object == "undefined") {return;}
    let _params = getParamsFromHref();

    _params = {..._params, ...object};

    let _query = '?',
        _keys = Object.keys(_params);
    _keys.forEach((k, index) => {
        _query += k + '=' + _params[k];
        if (index < _keys.length - 1) {
            _query += '&';
        }
    });
    let _menuItem = TQKy.Menu.getMenuItemByCurretLink();
    TQKy.Menu.clickMenuItem(_menuItem.id, _query);
}

function isValidDate(input) {
    if (!input) {return '';}
    var bits = input.includes('-') ? input.split('-') : input.split('/');
    if (bits.length != 3) {return '';}
    if (bits[2].length == 2) {
        let now = new Date();
        bits[2] = now.getFullYear().toString().substring(0, 2) + bits[2];
    }
    bits[0] = parseInt(bits[0]);
    bits[1] = parseInt(bits[1]);
    bits[2] = parseInt(bits[2]);
    var d = new Date(bits[2], bits[1] - 1, bits[0]);
    if (d.getFullYear() == bits[2] && (d.getMonth() + 1) == bits[1] && d.getDate() == bits[0]) {
        return (bits[0] > 9 ? bits[0] : ('0' + bits[0])) + '-' + 
            (bits[1] > 9 ? bits[1] : ('0' + bits[1])) + '-' + 
            (bits[2] > 9 ? bits[2] : ('0' + bits[2]));
    } else {
        return '';
    }
}

function getRootImagePathFrom(path) {
    if (!path) return '';
    let _lastIndex = path.lastIndexOf('.');
    let _ext = path.substring(_lastIndex, path.length);
    path = path.substring(0, path.length - (_ext).length) + _ext;
    return path;
}

function getRootImagePathFrom50(path) {
    if (!path) return '';
    let _lastIndex = path.lastIndexOf('.');
    let _ext = path.substring(_lastIndex, path.length);
    path = path.substring(0, path.length - ('_50' + _ext).length) + _ext;
    return path;
}
function get50FromRootImagePath(path) {
    if (!path) return '';
    let _lastIndex = path.lastIndexOf('.');
    let _ext = path.substring(_lastIndex, path.length);
    path = path.substring(0, _lastIndex) + '_50' + _ext;
    if (!path.startsWith('http') && path.startsWith('/')) {
        path = Config.apiAddress + path;
    }
    return path;
}
function getRootImagePathFrom100(path) {
    if (!path) return '';
    let _lastIndex = path.lastIndexOf('.');
    let _ext = path.substring(_lastIndex, path.length);
    path = path.substring(0, path.length - ('_100' + _ext).length) + _ext;
    return path;
}
function cleanImagePathToUpdateDB(path) {
    if (!path) return path;
    if (path.startsWith('http') && path.length > Config.apiAddress.length) {
        path = path.substring(Config.apiAddress.length);
    }
    return path;
}
function get100FromRootImagePath(path) {
    if (!path) return '';
    let _lastIndex = path.lastIndexOf('.');
    let _ext = path.substring(_lastIndex, path.length);
    path = path.substring(0, _lastIndex) + '_100' + _ext;
    if (!path.startsWith('http') && path.startsWith('/')) {
        path = Config.apiAddress + path;
    }
    return path;
}

function uploadFile(e, oldImage) {
    return TQKy.Api.uploadFile('/api/v1/file/uploadfile', e.files[0], oldImage);
}


function toFixed(amount, decimalCount = 0, decimal = ",", thousands = ".") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    
        const negativeSign = amount < 0 ? "-" : "";
    
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
    
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        return amount;
    }
}

function formatDate(date) {
    let _date;
    if (typeof date == 'number') {
        _date = new Date(date);
    } else if (typeof date == 'object') {
        _date = date;
    } else {
        return date;
    }
    let _d = (_date.getDate() > 9) ? _date.getDate() : ('0' + _date.getDate()),
        _m = (_date.getMonth() > 8) ? (_date.getMonth() + 1) : ('0' + (_date.getMonth() + 1)),
        _y = _date.getFullYear();
    return _d + '-' + _m + '-' + _y;
}

function formatDateTime(date) {
    let _date;
    if (typeof date == 'number') {
        _date = new Date(date);
    } else if (typeof date == 'object') {
        _date = date;
    } else {
        return date;
    }
    let _s = (_date.getSeconds() > 9) ? _date.getSeconds() : ('0' + _date.getSeconds()),
        _mi = (_date.getMinutes() > 9) ? _date.getMinutes() : ('0' + _date.getMinutes()),
        _h = (_date.getHours() > 9) ? _date.getHours() : ('0' + _date.getHours()),
        _d = (_date.getDate() > 9) ? _date.getDate() : ('0' + _date.getDate()),
        _m = (_date.getMonth() > 8) ? (_date.getMonth() + 1) : ('0' + (_date.getMonth() + 1)),
        _y = _date.getFullYear();
    return _d + '-' + _m + '-' + _y + ' ' + _h + ':' + _mi + ':' + _s;
}

function excelToObject(file, sheetName) { //oEvent.target.files[0];
    return new Promise(resolve => {
        try {
            var reader = new FileReader();
            reader.onload = function(e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });
                var result = [];
                workbook.SheetNames.forEach(function(sheetName) {
                    try {
                        var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                        var json_object = JSON.stringify(XL_row_object);
                        result.push({
                            sheetName: sheetName,
                            data: JSON.parse(json_object)
                        })
                        // console.log(json_object);
                    } catch (error) {
                    }
                });
                resolve(result);
            };
            reader.onerror = function(ex) {
                resolve(null);
                // console.log(ex);
            };
            reader.readAsBinaryString(file);
        } catch (error) {
            resolve(null);
        }
    });
};

function removeAccents(str) {
	str = str || '';
	str = str.replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str.toLowerCase();
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}