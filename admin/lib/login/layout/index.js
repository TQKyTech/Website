TQKy.File.getFile('/admin/lib/login/login/index.html', function(data) {
    TQKy.System.addHtml(document.getElementById('core-body'), data);
});