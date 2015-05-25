$(document).ready(function() {
    var tag = Object.keys(dy.getJsonFromUrl())[0]
    if (tag) {
        $.getJSON("https://dearyou.cloudant.com/posts/_design/posts/_view/byTag?" + $.param({
            endkey: '["' + tag + '",0]',
            startkey: '["' + tag + '",{}]',
            descending: true,
            include_docs: true
        }), function (data) {
            if (data.rows.length > 0) {
                $("title").text("Tagged as '" + tag + "' | Dear You,")
                data.rows.forEach(function(row) {
                    dy.createDocs(row.doc)
                })
            } else {
                dy.createDocs({
                    body: "Apparently there are no posts with that tag!",
                    time: Math.floor(Date.now() / 1000)
                })
            }
            $(".timeago").timeago()
        })
    } else {
        $(".posts").html("<h3>Check out that search bar! ;)</h3>")
    }
    $(document).on("submit", ".tag_form", function() {
        event.preventDefault()
        document.location.href = "/tag/?" + $(this).serializeArray()[0].value
    })
})
