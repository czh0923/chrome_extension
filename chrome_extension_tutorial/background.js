let color = '#3aa757';
let size = "xx-larget";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ size });
  console.log('Default font');
});