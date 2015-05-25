$(document).ready(function() {
    var tag = Object.keys(dy.getJsonFromUrl())[0]
    if (tag) {
        $.getJSON("https://dearyou.cloudant.com/posts/_design/posts/_view/byTag?" + $.param({
            endkey: '["' + tag + '",0]',
            startkey: '["' + tag + '",{}]',
            descending: true,
            include_docs: true
        }), function (data) {
            $(".section_header").text("POSTS TAGGED AS '" + tag.toUpperCase() + "'")
            if (data.rows.length > 0) {
                $("title").text("Tagged as '" + tag + "' | Dear You,")
                data.rows.forEach(function(row) {
                    dy.createDocs(row.doc)
                })
            } else {
                $(".posts").html("<div class='post'><div class='inner_post'><h3>Sorry, there are no posts with that tag.</h3></div></div>")
            }
            $(".timeago").timeago()
        })
    } else {
        $(".section_header").remove()
        $(".posts").html("<div class='post'><div class='inner_post'><h3>Try clicking \"Search\" ;)</h3></div></div>")
    }
    $(document).on("submit", ".tag_form", function() {
        event.preventDefault()
        document.location.href = "/tag/?" + $(this).serializeArray()[0].value
    })
})
