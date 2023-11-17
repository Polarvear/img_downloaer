//background.js
// chrome.runtime.onInstalled.addListener(function () {
//   chrome.tabs.query({}, function (tabs) {
//     tabs.forEach(function (tab) {
//       console.log("Tab ID:", tab.id);
//       console.log("Tab URL:", tab.url);
//       console.log("Tab Title:", tab.title);
//       // 여기서 각 탭의 정보를 처리할 수 있습니다.
//     });
//   });
// });

// 확장 프로그램 설치 시 모든 탭에서 콘텐츠 스크립트를 실행합니다.
// chrome.runtime.onInstalled.addListener(function () {
//     chrome.tabs.query({}, function (tabs) {
//       tabs.forEach(function (tab) {
//         // 탭 정보 출력
//         console.log("Tab ID:", tab.id);
//         console.log("Tab URL:", tab.url);
//         console.log("Tab Title:", tab.title);
//         console.log("-------------");
  
//         // 각 탭에 콘텐츠 스크립트를 주입
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           files: ["scripts/content.js"]
//         });
//       });
//     });
//   });
  
  // 메시지 리스너: 콘텐츠 스크립트에서 보낸 이미지 URL을 받습니다.
//   chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.imageUrls) {
//       console.log("Received image URLs from tab: " + sender.tab.id);
//       console.log("Received image URLs from tab: " + sender.tab.title);
//       console.log(request.imageUrls);
//     }
//   });
  
  // 탭 업데이트 리스너: 탭이 업데이트 될 때마다 모든 탭에서 콘텐츠 스크립트를 다시 실행합니다.
//   chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     console.log(changeInfo.status)
//     if (changeInfo.status === 'complete') {
//       chrome.tabs.query({}, function(tabs) {
//         tabs.forEach(function(tab) {
//           chrome.scripting.executeScript({
//             target: { tabId: tab.id },
//             files: ["scripts/content.js"]
//           });
//         });
//       });
//     }
//   });




chrome.commands.onCommand.addListener(function (command) {
  if (command === "fetchTabsInfo") {
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        console.log("Tab ID:", tab.id);
        console.log("Tab URL:", tab.url);
        console.log("Tab Title:", tab.title);
        console.log("-------------");
      
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["scripts/content.js"]
        });
      });
    });
  }
});


// content.js 스크립트에서 보낸 이미지 URL을 받습니다.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.imageUrls && request.imageUrls.length > 0) {
    request.imageUrls.forEach((url, index) => {
      const dateTime = getCurrentDateTime();
      // 다운로드 기능
      /*
      chrome.downloads.download({
        url: url,
        filename: `${dateTime}_${index}.jpg`, // 날짜와 시간으로 파일 이름 지정
        conflictAction: "uniquify",
      });
      */
    });
  }
});



function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.imageUrls && request.imageUrls.length > 0) {
//     request.imageUrls.forEach((url, index) => {
//       const dateTime = getCurrentDateTime();
//       chrome.downloads.download({
//         url: url,
//         filename: `${dateTime}_${index}.jpg`, // 날짜와 시간으로 파일 이름 지정
//         conflictAction: "uniquify",
//       });
//     });
//   }
// });

// chrome.action.onClicked.addListener((tab) => {
//   chrome.tabs.query({}, function (tabs) {
//     tabs.forEach(function (tab) {
//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         files: ["content.js"],
//       });
//     });
//   });
// });
