// background.js
// chrome.runtime.onInstalled.addListener(function() {
//     chrome.tabs.query({}, function(tabs) {
//       tabs.forEach(function(tab) {
//         console.log('Tab ID:', tab.id);
//         console.log('Tab URL:', tab.url);
//         console.log('Tab Title:', tab.title);
//         // 여기서 각 탭의 정보를 처리할 수 있습니다.
//       });
//     });
//   });

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


  
// 이미지 URL을 저장할 배열
let imageUrls = [];

// 콘텐츠 스크립트로부터 이미지 URL 받기
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.imageUrls && request.imageUrls.length > 0) {
    // 이미지 URL 추가
    imageUrls = imageUrls.concat(request.imageUrls);
  } else if (request.downloadImages) {
    // 다운로드 시작
    imageUrls.forEach((url, index) => {
      const dateTime = getCurrentDateTime();
      chrome.downloads.download({
        url: url,
        filename: `${dateTime}_${index}.jpg`, // 날짜와 시간으로 파일 이름 지정
        conflictAction: 'uniquify'
      });
    });
    // 다운로드 후 URL 배열 초기화
    imageUrls = [];
  }
});

// 확장 프로그램 아이콘 클릭 시 모든 탭에서 콘텐츠 스크립트 실행
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js']
      });
    });
  });
});