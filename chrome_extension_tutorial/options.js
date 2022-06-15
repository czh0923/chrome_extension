let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
let selectedClassName2 = "my";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
const myColors = ["#000000", "#000000", "#000000", "#000000"];
const buttonSize = [16,20,24,28]

// Reacts to a button click by marking the selected button and saving
// the selection
function handleButtonClick(event) {
  // Remove styling from the previously selected color
  let current = event.target.parentElement.querySelector(
    `.${selectedClassName}`
  );
  if (current && current !== event.target) {
    current.classList.remove(selectedClassName);
  }

  // Mark the button as selected
  let color = event.target.dataset.color;
  event.target.classList.add(selectedClassName);
  chrome.storage.sync.set({ color });
}


function handleButtonClick2(event) {
    // Remove styling from the previously selected color
    let my = event.target.parentElement.querySelector(
      `.${selectedClassName2}`
    );
    if (my && my !== event.target) {
      my.classList.remove(selectedClassName2);
    }
  
    // Mark the button as selected
    let color = event.target.dataset.color;
    event.target.classList.add(selectedClassName2);
    chrome.storage.sync.set({ color });
  }

// Add a button to the page for each supplied color
function constructOptions(buttonColors) {
  chrome.storage.sync.get("color", (data) => {
    let currentColor = data.color;
    // For each color we were provided…
    for (let buttonColor of buttonColors) {
      // …create a button with that color…
      let button = document.createElement("button");
      button.dataset.color = buttonColor;
      button.style.backgroundColor = buttonColor;

      // …mark the currently selected color…
      if (buttonColor === currentColor) {
        button.classList.add(selectedClassName);
      }

      // …and register a listener for when that button is clicked
      button.addEventListener("click", handleButtonClick);
      page.appendChild(button);
    }
  });
}


function constructOptionsFont(buttonSize) {
    chrome.fontSetting.getFont("fontsize", ({fontSize}) => {
        let currentFontSize = fontSize;

        for (let buttonS of buttonSize) {
            let button = document.createElement("button");
            button.dataset.color = "#000000";
            button.style.backgroundColor = "#000000";
            
        
            console.log("aaaaaaaaaaaaaa");

            // if (buttonS == currentFontSize) {
            //     button.classList.add(selectedClassName);
            // }

            button.addEventListener("click", handleButtonClick);
            page.appendChild(button);
    }})
}
  
  

// Initialize the page by constructing the color options
constructOptions(presetButtonColors);
//constructOptionsFont(buttonSize);
