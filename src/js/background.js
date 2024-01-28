import * as helper from "./helper.js";

chrome.contextMenus.create({
  id: "clear-site-data",
  title: "Clear site data",
  contexts: ["page_action"],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "clear-site-data") {
    helper.notifyClearData(chrome, tab);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(
    { reload: false, noPrompt: false, domain: "" },
    function () {
      console.debug("Init storage");
    },
  );
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {},
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (!request.command) {
    sendResponse({ result: "Unknown command:" + request.command });
    return;
  }
  if (request.command === "CLEAR_DATA") {
    const { domain } = await chrome.storage.sync.get("domain");
    chrome.browsingData.remove(
      {
        origins: [domain],
      },
      {
        cacheStorage: true,
        cookies: true,
        fileSystems: true,
        indexedDB: true,
        localStorage: true,
        pluginData: true,
        serviceWorkers: true,
        webSQL: true,
      },
      (e) => {
        helper.notifyClearDataSuccess(chrome);
      },
    );
  }
  sendResponse({ result: "success" });
});
