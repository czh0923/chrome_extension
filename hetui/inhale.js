const inhaleButton = document.getElementById("inhaleButton");
const workspacesDiv = document.getElementById("workspacesDiv");
console.log("in inhale.js");

function createNewWorkspace() {
    let div = document.createElement("div");
    div.className = "workspace";
    div.innerText = "workspace";

    workspacesDiv.appendChild(div);

    return div;
}

function display(div, tabIconURLs, tabTitles) {

    console.log("here", tabIconURLs, tabTitles, tabTitles[0], tabTitles.length);

    for (let i = 0; i < tabTitles.length; i++) {
        console.log(tabIconURLs[i], tabTitles[i]);

        let p = document.createElement("p");

        let icon = document.createElement("img");
        icon.src = tabIconURLs[i];

        let innerP = document.createElement("p");
        innerP.className = "inline-p";
        innerP.innerHTML = tabTitles[i];

        p.appendChild(icon);
        p.appendChild(innerP);

        div.appendChild(p);
    }
}

async function getTabs() {

    const tabURLs = [];
    const tabIconURLs = [];
    const tabTitles = [];

    const tabs = await chrome.windows.getCurrent({"populate":true});

    console.log(tabs.tabs);

    tabs.tabs.forEach(function(tab) {
        tabURLs.push(tab.url);
        tabIconURLs.push(tab.favIconUrl);
        tabTitles.push(tab.title);
    })
    
    return {tabIconURLs, tabTitles};
}

async function inhale() {
    console.log("hello");

    let newWorkspaceDiv = createNewWorkspace();
    console.log(newWorkspaceDiv);

    let {tabIconURLs, tabTitles} = await getTabs();

    display(newWorkspaceDiv, tabIconURLs, tabTitles);

}

inhaleButton.addEventListener("click", inhale)
