$(document).ready(function() {
    var id = Object.keys(dy.getJsonFromUrl())[0]
    if (id) {
        $.getJSON("https://dearyou.cloudant.com/posts/_design/posts/_view/byID?" + $.param({
            key: "\"" + id + "\"",
            include_docs: true
        }), function (data) {
            if (data.rows.length > 0) {
                data.rows.forEach(function(row) {
                    dy.createDocs(row.doc)
                })
            } else {
                $(".posts").html("<div class='post'><div class='inner_post'><h3>Sorry, that post does not exist!</h3></div></div>")
            }
            $(".timeago").timeago()
        })
    } else {
        $(".posts").html("<div class='post'><div class='inner_post'><h3>Try clicking \"Search\" ;)</h3></div></div>")
    }
})
