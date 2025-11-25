chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    noteTemplate: "Hi {name}, I'd love to connect with you for opportunities related to Business Intelligence Engineer and Data Engineer at your org. Thanks! Prayag.",
    autoFill: true
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSettings') {
    chrome.storage.sync.get(['noteTemplate', 'autoFill'], function(data) {
      sendResponse(data);
    });
    return true;
  }
});