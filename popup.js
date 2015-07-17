chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        message.innerHTML = request.source;
    }
});
chrome.extension.onMessage.addListener(function(request, sender) {
    if (request.action == "getCount") {
        count.innerHTML = request.source;
    }
});
chrome.tabs.getSelected(null, function(tab) {
    getTab(tab.url);
});





function getTab(tablink) {
    
    if (tablink.substring(0, 30) === 'http://www.tvmuse.com/tv-shows') {
        var pathArray = tablink.split( '/' );
        var title = pathArray[4].substr(0, pathArray[4].indexOf('_')); ;
        var season = pathArray[5].split("_").pop();
        var episode = pathArray[6].split("_").pop();
        
        stats.innerHTML = title+" "+season+"x"+episode;
    }
    else {
        stats.innerHTML = "Extension not supported";
    }
}

function onWindowLoad() {
    
    var anchors = document.getElementsByTagName('a');
//    alert(anchors[3].outerHTML);
    
    var message = document.querySelector('#message');
    var stats = document.querySelector('#stats');
    var count = document.querySelector('#count');

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function() {
        if (chrome.extension.lastError) {
            message.innerText = 'This page is not suitable for script injection.\n Error: ' + chrome.extension.lastError.message;
        }
    });
}window.onload = onWindowLoad;