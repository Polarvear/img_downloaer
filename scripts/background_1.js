// background.js

// 확장 프로그램 아이콘을 클릭했을 때 이벤트 리스너
chrome.action.onClicked.addListener((tab) => {
    // 모든 탭 조회
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        // 각 탭에 콘텐츠 스크립트 실행
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
      });
    });
  });
  
  // 콘텐츠 스크립트로부터 메시지를 받았을 때의 이벤트 리스너
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.imageUrls && request.imageUrls.length > 0) {
      // 받은 이미지 URL들을 다운로드
      request.imageUrls.forEach(url => {
        chrome.downloads.download({
          url: url,
          conflictAction: 'uniquify' // 파일 이름 충돌 방지
        });
      });
    }
  
    // 비동기 응답을 위해 true 반환
    return true;
  });
  