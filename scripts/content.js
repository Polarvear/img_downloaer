// content.js
const images = document.querySelectorAll('img');
const imageUrls = Array.from(images).map(img => img.src);

// 이미지 URL 배열을 백그라운드 스크립트로 전송합니다.
chrome.runtime.sendMessage({ imageUrls: imageUrls }, function() {
    console.log(imageUrls);
});