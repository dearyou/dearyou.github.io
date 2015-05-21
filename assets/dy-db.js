var db = new PouchDB('https://dearyou.cloudant.com/posts');

function loadAll() {
    db.query("posts/all", {
        include_docs: true,
        attachments: true
    }, function (err, response) {
        console.log(response)
        response.rows.forEach(function(docs) {
            var doc = docs.doc;
            createPost(doc);
        });
        $(".timeago").timeago();
    });
}

function createPost(doc) {
    $("#feed").append(function () {
        $div = $("<div />").addClass("post");
        $div.append("<p class='bolder'>Dear You,</p>");
        $div.append("<p class='body'>" + nl2br(doc.body) + "</p>");
        $div.append("<p class='time'>Posted <span class='timeago' title='" + formatedDateFrom(doc.time) + "'></span></p>");
        return $div;
    });
}

function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function formatedDateFrom(time) {
    var date = new Date(time*1000);
    console.log(date.toISOString())
    return date.toISOString();
}

function submit(body) {
    db.post({
      body: body,
      time: Math.floor(Date.now() / 1000)
    }, function(err, response) {
        if (err) {
            return console.log(err);
        } else {
            document.location.href = "/";
        }
    });
}

$(document).ready(function () {
    $(document).on("click", "#compose", function () {
        event.preventDefault();
        $("body").css("overflow", "hidden");
        $("body").prepend(function () {
            var div = $("<div />").addClass("compose_overlay").css("display", "none");
            div.append('<div class="header"><h1>Dear You</h1><a href="#" id="cancel">Cancel</a></div>')
            div.append('<form class="compose" method="get"><textarea name="body" placeholder="Compose"></textarea><button type="submit">Post</button></form>')
            return div;
        });
        $(".compose_overlay").fadeIn("fast");
    });
    $(document).on("click", "#cancel", function () {
        event.preventDefault();
        $(".compose_overlay").fadeOut("fast", function (){
            $(this).remove();
        });
    });
    $(document).on("submit", ".compose", function () {
        event.preventDefault();
        var form = $(this).serializeArray();
        if (form[0].value.length > 5 && /\S/.test(form[0].value)) {
            $(this).addClass("disabled");
            submit(form[0].value);
        } else {
            alert('Letter must be at least 5 characters!');
        }
    });
});
