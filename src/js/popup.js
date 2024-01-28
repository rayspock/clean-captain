import * as helper from "./helper.js";

chrome.storage.sync.get("reload", (data) => {
  let cbx = $(".ui.checkbox").find("input[name=cbxReload]").parent();
  if (data.reload) {
    cbx.checkbox("set checked");
  }
  cbx.checkbox({
    onChecked: () => {
      chrome.storage.sync.set({ reload: true }, function () {
        console.log("changed");
      });
    },
    onUnchecked: () => {
      chrome.storage.sync.set({ reload: false }, function () {
        console.log("changed");
      });
    },
  });
});
chrome.storage.sync.get("noPrompt", (data) => {
  let cbx = $(".ui.checkbox").find("input[name=cbxNoPrompt]").parent();
  if (data.noPrompt) {
    cbx.checkbox("set checked");
  }
  cbx.checkbox({
    onChecked: () => {
      chrome.storage.sync.set({ noPrompt: true }, function () {
        console.log("changed");
      });
    },
    onUnchecked: () => {
      chrome.storage.sync.set({ noPrompt: false }, function () {
        console.log("changed");
      });
    },
  });
});

$("#clearData").on("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    helper.notifyClearData(chrome, tabs[0]);
  });
  window.close();
});
