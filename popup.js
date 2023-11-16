// popup.js
document.getElementById('downloadButton').addEventListener('click', function() {
    chrome.runtime.sendMessage({ downloadImages: true });
    window.close(); // 팝업 창을 닫음
  });