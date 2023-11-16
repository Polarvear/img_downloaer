//background.js
chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        console.log('Tab ID:', tab.id);
        console.log('Tab URL:', tab.url);
        console.log('Tab Title:', tab.title);
        // 여기서 각 탭의 정보를 처리할 수 있습니다.
      });
    });
  });

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }


// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.imageUrls && request.imageUrls.length > 0) {
//       request.imageUrls.forEach((url, index) => {
//         const dateTime = getCurrentDateTime();
//         chrome.downloads.download({
//           url: url,
//           filename: `${dateTime}_${index}.jpg`, // 날짜와 시간으로 파일 이름 지정
//           conflictAction: 'uniquify'
//         });
//       });
//     }
//   });


// background.js
// chrome.action.onClicked.addListener((tab) => {
//     chrome.tabs.query({}, function(tabs) {
//       tabs.forEach(function(tab) {
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           files: ['content.js']
//         });
//       });
//     });
//   });