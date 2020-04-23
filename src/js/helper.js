export function notifyClearCookies(chrome, tab) {
    let url = new URL(tab.url);
    chrome.storage.sync.set({'domain': "https://" + url.hostname})
    chrome.tabs.sendMessage(
      tab.id,
      { command: "NOTIFY_CLEAR_COOKIES" },
      (response) => {
        console.debug("Sending NOTIFY_CLEAR_COOKIES message:", response.result)
      }
    );
}