const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");

function handleButtonClickFont(event) {
  chrome.fontSettings.setFont(
    { genericFamily: 'sansserif', script: 'Jpan', fontId: 'MS PGothic' }
  );
}

button1.addEventListener("click", handleButtonClickFont);
button2.addEventListener("click", handleButtonClickFont);
button3.addEventListener("click", handleButtonClickFont);
button4.addEventListener("click", handleButtonClickFont);