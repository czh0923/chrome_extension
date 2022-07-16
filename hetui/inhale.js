const inhaleButton = document.getElementById("inhaleButton");
const clearButton = document.getElementById("clearButton");
const openButton = document.getElementById("openButton");
const workspacesDiv = document.getElementById("workspacesDiv");
console.log("in inhale.js");


async function getLocalStorage() {

    const result = await chrome.storage.local.get();

    var tabURLs = [];
    var tabIconURLs = [];
    var tabTitles = [];

    for (let r in result) {
        console.log(r);

        tabURLs = result[r]["tabURLs"];
        tabIconURLs = result[r]["tabIconURLs"];
        tabTitles = result[r]["tabTitles"];
    }

    return {tabURLs, tabIconURLs, tabTitles}

}

async function refresh() {

    while (workspacesDiv.hasChildNodes()) {
        workspacesDiv.removeChild(workspacesDiv.firstChild);
    }

    let {tabURLs, tabIconURLs, tabTitles} = await getLocalStorage();

    createWorkspaceAndDisplay(tabURLs, tabIconURLs, tabTitles);

}


function createNewWorkspace() {
    let div = document.createElement("div");
    div.className = "workspace";

    let titleDiv = document.createElement("div");
    titleDiv.className = "workspaceTitle"
    titleDiv.innerHTML = "workspace";
    div.appendChild(titleDiv);
    // div.innerText = "workspace";

    workspacesDiv.appendChild(div);

    

    return div;
}

function display(div, tabURLs, tabIconURLs, tabTitles) {

    console.log(tabTitles);

    for (let i = 0; i < tabTitles.length; i++) {

        let p = document.createElement("p");

        let icon = document.createElement("img");
        icon.src = tabIconURLs[i];

        let a = document.createElement("a");
        a.href = tabURLs[i];
        a.text = tabTitles[i];
        
        let innerP = document.createElement("p");
        innerP.className = "inline-p";
        innerP.innerHTML = tabTitles[i];

        p.appendChild(icon);
        p.appendChild(a);

        div.appendChild(p);
    }
}

function createWorkspaceAndDisplay(tabURLs, tabIconURLs, tabTitles) {
    if (tabURLs.length == 0) {
        return;
    }

    let div = createNewWorkspace();
    display(div, tabURLs, tabIconURLs, tabTitles);

}


async function getTabs() {

    const tabURLs = [];
    const tabIconURLs = [];
    const tabTitles = [];

    const tabs = await chrome.windows.getCurrent({"populate":true});

    // console.log(tabs.tabs);

    tabs.tabs.forEach(function(tab) {
        tabURLs.push(tab.url);
        tabIconURLs.push(tab.favIconUrl);
        tabTitles.push(tab.title);
    })
    
    return {tabURLs, tabIconURLs, tabTitles};
}

async function storeWorkspace(workspaceName, tabURLs, tabIconURLs, tabTitles) {

    await chrome.storage.local.set({[workspaceName]: {tabURLs, tabIconURLs, tabTitles}});
}

async function inhale() {
    console.log("hello");

    let {tabURLs, tabIconURLs, tabTitles} = await getTabs();

    createWorkspaceAndDisplay(tabTitles, tabIconURLs, tabTitles);

    await storeWorkspace("workspace", tabURLs, tabIconURLs, tabTitles);

}

inhaleButton.addEventListener("click", inhale);

async function clearChromeStorage() {
    await chrome.storage.local.clear();
    refresh();
}

clearButton.addEventListener("click", clearChromeStorage);

async function reopenPage() {

    let {tabURLs, tabIconURLs, tabTitles} = await getLocalStorage();

    for (let l in tabURLs) {
        console.log(l);
        chrome.tabs.create({url:tabURLs[l]});
    }

}

openButton.addEventListener("click", reopenPage);


refresh();