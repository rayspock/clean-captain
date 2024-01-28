export const notifyClearData = (chrome, tab) => {
  let url = new URL(tab.url);
  chrome.storage.sync.set({ domain: "https://" + url.hostname });
  chrome.tabs.sendMessage(
    tab.id,
    { command: "NOTIFY_CLEAR_DATA" },
    (response) => {
      console.debug("Sending NOTIFY_CLEAR_DATA message:", response.result);
    },
  );
};

export const notifyClearDataSuccess = (chrome) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { command: "CLEAR_DATA_SUCCESS" },
      (response) => {
        console.debug("Sending CLEAR_DATA_SUCCESS message:", response.result);
      },
    );
  });
};
