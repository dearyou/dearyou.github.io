window.dy = {
    createDocs: function(doc) {
        var post = $("<div />").addClass("post")
        var inner_post = $("<div />").addClass("inner_post")
        inner_post.append("<div class='post_header'>Dear You,</div>")
        post.html(inner_post)
        if (doc.body.match(/\B#\w*[a-zA-Z]+\w*/ig)) {
            doc.body.match(/\B#\w*[a-zA-Z]+\w*/ig).forEach(function(tag) {
                doc.body = doc.body.replace(tag, "<a class='tag' href='/tag/?" + tag.substring(1).toLowerCase() + "'>" + tag + "</a>")
            })
        }
        inner_post.append("<div class='post_body'>" + doc.body + "</div>")
        inner_post.append("<a class='post_time timeago' href='/letter/?" + doc._id + "' title='" + dy.formatedDateFrom(doc.time) + "'></a>")
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
}

if (!Object.keys) {
    Object.keys = (function() {
        'use strict';
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = !({
                toString: null
            }).propertyIsEnumerable('toString'),
            dontEnums = [
                'toString',
                'toLocaleString',
                'valueOf',
                'hasOwnProperty',
                'isPrototypeOf',
                'propertyIsEnumerable',
                'constructor'
            ],
            dontEnumsLength = dontEnums.length;

        return function(obj) {
            if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                throw new TypeError('Object.keys called on non-object');
            }

            var result = [],
                prop, i;

            for (prop in obj) {
                if (hasOwnProperty.call(obj, prop)) {
                    result.push(prop);
                }
            }

            if (hasDontEnumBug) {
                for (i = 0; i < dontEnumsLength; i++) {
                    if (hasOwnProperty.call(obj, dontEnums[i])) {
                        result.push(dontEnums[i]);
                    }
                }
            }
            return result;
        };
    }());
}
