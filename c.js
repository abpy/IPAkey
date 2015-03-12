function ipa(word) {
    var matches = [];
    for (s in ipas) {
        for (var i = 0; i < word.length; i++) {
            var c = word.substr(i, s.length);
            if (c == s) {
                matches.push([i, s]);
            }
        }
    }
    
    function sortm(a, b) {
        if (a[1].length < b[1].length) {
            return 1;
        }
        if (a[1].length > b[1].length) {
            return -1;
        }
    }
    
    function sorts(a, b) {
        if (a[0] < b[0]) {
            return -1;
        }
        if (a[0] > b[0]) {
            return 1;
        }
    }
    
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }
    
    function range(start, stop) {
        var r = []
        for (n = start; n < stop; n += 1) {
            r.push(n);
        }
        return r;
    }
    
    matches.sort(sortm);
    
    var sounds = [];
    var idxs = [];
    for (var i2 = 0; i2 < matches.length; i2++) {
        var s = matches[i2];
        var ind = range(s[0], s[0] + s[1].length);
        var a = [];
        for (var i3 = 0; i3 < ind.length; i3++) {
            var idx = ind[i3];
            if (contains(idxs, idx)) {
                a.push("1");
            } else {
                a.push("0");
            }
        }
        
        if (!(contains(a, "1"))){
            sounds.push(s);
        }
        idxs = idxs.concat(ind);
    }
    
    // keep missing characters
    idxs.sort(function(a, b) {return a-b})
    
    for (var i = 0; i < idxs.slice(-1)[0]; i++) {
        var isin = contains(idxs, i);
        isin = (!(isin))
        if (isin) {
            sounds.push([i, word[i]])
        }
    }
    
    sounds.sort(sorts)

    
    return sounds;
}

function chartohex(char) {
    var dec = char.charCodeAt(o);
    var hex = dec.toString(16);
    while (hex.length < 4) {
        codeHex = "0" + hex;
    }
    return "&#x" + hex + ";";
    
}

function formatWords (words) {
    var ntext = "";
    if (typeof words != "undefined") {
        for (i1 = 0; i1 < words.length; i1++) {
            var w = words[i1];
            var isbold = false;
            for (i2 = 0; i2 < w.length; i2++) {
                var letter = w[i2];
                if (letter == "'" && (!(isbold))) {
                    ntext += "<b>";
                    isbold = true;
                } else if(letter == "'" && isbold) {
                    ntext += "</b>";
                    isbold = false;
                } else {
                    ntext += letter;
                }
            }
            ntext += " ";
        }
        return ntext;
    } else {
        return "<i>not in table</i>";
    }
}

function change() {
    var text = document.getElementsByName("itext")[0].value;
    text = text.replace(/\//g, "") //remove slashes
    var m = ipa(text)
    var html = "";
    for (var i = 0; i < m.length; i++) {
        var ms = m[i][1];
        var mw = ipas[(ms)];
        var ftext = formatWords(mw);
        if (ms == " ") { //keep spaces
            ftext = " ";
        }
        var nc = "<li>" + "<span class=\"character\">" + ms + "</span>" + ftext + "</li>";
        html = html + nc + "\n";
    }
    document.getElementById("outUl").innerHTML = html;
}