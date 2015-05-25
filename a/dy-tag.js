$(document).ready(function() {
    var tag = Object.keys(dy.getJsonFromUrl())[0]
    $.getJSON("https://dearyou.cloudant.com/posts/_design/posts/_view/byTag?" + $.param({
        endkey: '["' + tag + '",0]',
        startkey: '["' + tag + '",{}]',
        descending: true,
        include_docs: true
    }), function (data) {
        if (data.rows.length > 0) {
            $("title").text("Tagged as '" + tag + "' | Dear You,")
        }
        data.rows.forEach(function(row) {
            dy.createDocs(row.doc)
        })
        $(".timeago").timeago()
    })
})
