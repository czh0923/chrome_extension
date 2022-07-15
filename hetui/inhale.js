const inhaleButton = document.getElementById("inhaleButton");
const clearButton = document.getElementById("clearButton");
const workspacesDiv = document.getElementById("workspacesDiv");
console.log("in inhale.js");


// async function displayStorage() {
//     const result = await chrome.storage.local.get();

//     console.log(result);

//     result.forEach(function(workspace) {
//         console.log(workspace.key);
//     })
// }

// displayStorage();

(async () => {
    const result = await chrome.storage.local.get(["workspace"]);

    console.log(result, result.length);
    // result.forEach(function(workspace) {
    //     console.log(workspace.key);
    // })

})();

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

    let newWorkspaceDiv = createNewWorkspace();

    let {tabURLs, tabIconURLs, tabTitles} = await getTabs();

    display(newWorkspaceDiv, tabURLs, tabIconURLs, tabTitles);

    await storeWorkspace("workspace1", tabURLs, tabIconURLs, tabTitles);

}

inhaleButton.addEventListener("click", inhale);

async function clearChromeStorage() {
    await chrome.storage.local.clear();
}

clearButton.addEventListener("click", clearChromeStorage);
