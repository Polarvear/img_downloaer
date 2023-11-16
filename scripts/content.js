// content.js
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    const imageUrls = Array.from(images).map(img => img.src);
    // console.log(imageUrls);


    chrome.runtime.sendMessage({ imageUrls: imageUrls });
  });

