const inhaleButton = document.getElementById("inhaleButton");
console.log("in inhale.js", inhaleButton);

function inhale() {
    console.log("hello");
    // console.log(chrome.tabs);
    // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    //     console.log(tabs[0].url, tabs[1].url);
    // });
    chrome.windows.getCurrent({"populate":true}, function(currentWindow) {
        var tabURLs = [];
        var tabs = currentWindow.tabs;
        console.log(tabs);
        for (var i=0; i<tabs.length; i++) {
            tabURLs.push(tabs[i].url);
        }
        console.log(tabURLs);
     });
    
}

inhaleButton.addEventListener("click", inhale)
