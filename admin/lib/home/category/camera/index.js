"use strict";
var _list = [], _limit = 15;
var _vue, _vInfo;

/* start - variable */
var _cameraTypes;
/* end - variable */
// var _params = getParamsFromHref();
_vue = new Vue({
    el: '#_vTable',
    data: {
        list: _list,
        total: 0,
        pagination: '',
        page: 1, //_params.page ? parseInt(_params.page) : 1
    },
    mounted: function() {
    },
    methods: {
        onSearchTextChanged: function(e) {
            loadData();
        }
    }
});

$('#large-Modal').on('show.bs.modal', /* show|hidden.bs.modal */ () => {
    showModal();
});
var showModal = async function(index) {
    TQKy.File.getFile('/admin/lib/home/category/camera/info.html', function onSave(data) {
        $('.modal-body').html(data);
        _vInfo = new Vue({
            el: '#_vInfo',
            data: {
                data: {
                    name: 'TQKy'
                },
            },
            mounted: () => {
                $('#large-Modal').modal('show');
            },
            methods: {
                addRow: () => {}
            }
        });
        $('.modal-footer-action-save').on('click', () => {
            $('#large-Modal').modal('hide');
        });
    });
};

var createDefaultItem = function() {
    let item = {
        _id: '',
        id: '',
        name: '',
        note: '',
    };
    return item;
}

/*/ start[Category] - Category /*/
var loadCategory = async function(reload) {
    if (!_cameraTypes || reload) {

        _vue.$forceUpdate();
    }
}
/*/ end[Category] /*/

var loadData = async function(reload) {
    // tableLoading(true);
    // setTimeout(() => {
    //     tableLoading(false);
    // }, 5000);
    _vue.pagination = renderPagination(_vue.page, 50, (page) => {
        _vue.page = parseInt(page);
        loadData();
    });
    await loadCategory(reload);
}
loadData(true);