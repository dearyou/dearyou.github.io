$(document).ready(function () {
    if (dy.getParameterByName("q").length > 0) {
        $.getJSON('https://dearyou.cloudant.com/posts/_design/posts/_search/text', {
            include_docs: true,
            q: "\"" + dy.getParameterByName("q") + "\"",
            limit: 20
        }, function(e) {
            if (e.rows.length > 0) {
                $(".section_header").text("POSTS TAGGED AS '" + dy.getParameterByName("q").toUpperCase() + "'")
                e.rows.forEach(function(row, index) {
                    dy.createDocs(row.doc)
                })
            } else {
                $(".search_form").append("<div class='no_results'>No results!</div>")
            }
            $(".timeago").timeago()
        })
    }
});
if (window.location.hostname != "localhost" && window.location.protocol != "https:") {
    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}
// (?:\\s|\\A)[##]+([A-Za-z0-9-_]+)
