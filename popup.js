document.getElementById('download').addEventListener('click', function() {
    chrome.runtime.sendMessage({ download: "yes" });
    window.close(); // 팝업 창을 닫습니다.
  });
  
  document.getElementById('cancel').addEventListener('click', function() {
    window.close(); // 사용자가 취소를 누르면 팝업 창을 닫습니다.
  });