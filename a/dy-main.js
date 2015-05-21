$(document).ready(function () {
    $.getJSON('https://dearyou.cloudant.com/posts/_design/posts/_view/all?include_docs=true&descending=true', function(e) {
        e.rows.forEach(function(row, index) {
            createDocs(row.doc)
        })
        $(".timeago").timeago()
    })

    function createDocs(doc) {
        var post = $("<div />").addClass("post")
        post.append("<div class='post_header'>Dear You,</div>")
        post.append("<div class='post_body'>" + doc.body + "</div>")
        post.append("<div class='post_time timeago' title='" + formatedDateFrom(doc.time) + "'></div>")
        $(".posts").append(post)
    }

    function formatedDateFrom(time) {
        var date = new Date(time*1000);
        console.log(date.toISOString())
        return date.toISOString();
    }
});
