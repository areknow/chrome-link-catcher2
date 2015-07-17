var counter = 0;

function openComments() {
        var anchors = document.getElementsByTagName('a');
        if (anchors != null) {
            for (var j=0 ; j<anchors.length ; j++) {
                if (anchors[j].outerHTML.indexOf("Click here to show.") != -1) { 
                    anchors[j].click();
//                    alert(anchors[j].outerHTML);
                    console.log('foobar');
                }
            }
        }
    
}

function sendStats() {
    return counter;
}

function DOMtoString(document_root) {
    openComments()
    
    var anchors = document_root.getElementsByTagName('a');
    
    if (anchors != null) {
        var links = '<br>';
        var isGood = 0;
        
        for (var j=0 ; j<anchors.length ; j++) {
            if (anchors[j].outerHTML.substring(0, 31) === '<a class="all_on" href="http://') { 
                links += anchors[j].outerHTML + "<br>";
                isGood ++;
            }
        }
        links += '<br>';
        counter = isGood;
    }
    if (isGood > 0) {
        return links;
    }
    else {
        return '<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No suitable links on this page.<br><br>'; // change to a div
    }
}



chrome.extension.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
chrome.extension.sendMessage({
    action: "getCount",
    source: sendStats()
});