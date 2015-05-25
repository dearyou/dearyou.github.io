window.dy = {
    createDocs: function(doc) {
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
        inner_post.append("<div class='post_time timeago' title='" + dy.formatedDateFrom(doc.time) + "'></div>")
        $(".posts").append(post)
    },
    formatedDateFrom: function(time) {
        var date = new Date(time*1000);
        return date.toISOString();
    },
    getJsonFromUrl: function() {
        var query = location.search.substr(1);
        var result = {};
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            result[item[0]] = decodeURIComponent(item[1]);
        });
        return result;
    }
    // callback: function(data) {
    //     if (data.rows.length > 0) {
    //         document.getElementById("title").innerHTML = "Posts tagged as '" + tag + "'"
    //         data.rows.forEach(function(row) {
    //             createDocs(row.doc)
    //         })
    //     } else {
    //         document.getElementById("title").innerHTML = "Not found!"
    //     }
    // }
}
