$(document).ready(function() {
    var tag = Object.keys(dy.getJsonFromUrl())[0]
    $.getJSON("https://dearyou.cloudant.com/posts/_design/posts/_view/byTag?" + $.param({
        endkey: '["' + tag + '",0]',
        startkey: '["' + tag + '",{}]',
        descending: true,
        include_docs: true
    }), function (data) {
        data.rows.forEach(function(row) {
            dy.createDocs(row.doc)
        })
        $(".timeago").timeago()
    })
})

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
