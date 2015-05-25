$(document).ready(function () {
    $.getJSON('https://dearyou.cloudant.com/posts/_design/posts/_view/all?include_docs=true&descending=true', function(e) {
        e.rows.forEach(function(row, index) {
            createDocs(row.doc)
        })
        $(".timeago").timeago()
    })

    function createDocs(doc) {
        var post = $("<div />").addClass("post")
        var inner_post = $("<div />").addClass("inner_post")
        inner_post.append("<div class='post_header'>Dear You,</div>")
        post.html(inner_post)
        if (doc.body.match(/\B#\w*[a-zA-Z]+\w*/ig)) {
            doc.body.match(/\B#\w*[a-zA-Z]+\w*/ig).forEach(function(tag) {
                doc.body = doc.body.replace(tag, "<a class='tag' href='/tag/?" + tag.substring(1) + "'>" + tag + "</a>")
            })
        }
        inner_post.append("<div class='post_body'>" + doc.body + "</div>")
        inner_post.append("<div class='post_time timeago' title='" + formatedDateFrom(doc.time) + "'></div>")
        $(".posts").append(post)
    }

    function formatedDateFrom(time) {
        var date = new Date(time*1000);
        return date.toISOString();
    }
});
if (window.location.hostname != "localhost" && window.location.protocol != "https:") {
    window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
}
// (?:\\s|\\A)[##]+([A-Za-z0-9-_]+)
