$(document).ready(function() {
    var id = Object.keys(dy.getJsonFromUrl())[0]
    $.getJSON("https://dearyou.cloudant.com/posts/_design/posts/_view/byID?" + $.param({
        key: "\"" + id + "\"",
        include_docs: true
    }), function (data) {
        if (data.rows.length > 0) {
            data.rows.forEach(function(row) {
                dy.createDocs(row.doc)
            })
        } else {
            $(".posts").html("<div class='no_results'>Sorry, that post does not exist! Maybe check out the 'Search' link?</div>")
        }
        $(".timeago").timeago()
    })
})