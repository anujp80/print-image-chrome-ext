chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "printImage",
      title: "Print Image",
      contexts: ["image"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "printImage") {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: printImage,
        args: [info.srcUrl]
      });
    }
  });
  
  function printImage(imageUrl) {
    const printWindow = window.open("");
    printWindow.document.write(`<img src="${imageUrl}" onload="window.print();window.close()">`);
    printWindow.document.close();
  }
  