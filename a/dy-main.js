$(document).ready(function () {
    $.getJSON('https://dearyou.cloudant.com/posts/_design/posts/_view/all', {
        include_docs: true,
        descending: true,
        limit: 20
    }, function(e) {
        e.rows.forEach(function(row, index) {
            dy.createDocs(row.doc)
        })
        $(".timeago").timeago()
    })
});
if (window.location.hostname != "localhost" && window.location.protocol != "https:") {
    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}
// (?:\\s|\\A)[##]+([A-Za-z0-9-_]+)
