$(document).ready(function() {
    var id = Object.keys(dy.getJsonFromUrl())[0]
    $.getJSON("https://dearyou.cloudant.com/posts/_design/posts/_view/byID?" + $.param({
        key: "\"" + id + "\"",
        include_docs: true
    }), function (data) {
        data.rows.forEach(function(row) {
            dy.createDocs(row.doc)
        })
        $(".timeago").timeago()
    })
})
