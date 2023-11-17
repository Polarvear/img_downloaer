// content.js
const images = document.querySelectorAll('img');
const imageUrls = Array.from(images).map(img => img.src);

if (imageUrls.length > 0) {
  // 사용자에게 이미지 다운로드 전에 확인을 요청합니다.
  const confirmDownload = confirm("이 탭의 모든 이미지를 다운로드하시겠습니까?");
  if (confirmDownload) {
    // 확인을 받으면 이미지 URL을 백그라운드 스크립트로 전송합니다.
    chrome.runtime.sendMessage({ imageUrls: imageUrls });
  }
}