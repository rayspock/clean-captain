// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';
import * as helper from './helper.js';

chrome.contextMenus.create({
  id: "clear-site-data",
  title: "Clear site data",
  contexts: ["page_action"]
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "clear-site-data") {
    helper.notifyClearData(chrome, tab);
  }
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ reload:false, noPrompt:false, domain: '' }, function () {
    console.debug("Init storage");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {},
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "CLEAR_DATA") {
    chrome.storage.sync.get("domain", (data) => {
      chrome.browsingData.remove(
        {
          origins: [data.domain],
        },
        {
          cacheStorage: true,
          cookies: true,
          fileSystems: true,
          indexedDB: true,
          localStorage: true,
          pluginData: true,
          serviceWorkers: true,
          webSQL: true
        },
        (e) => {
          console.debug("clear cookies:", e);
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
              tabs[0].id,
              { command: "CLEAR_DATA_SUCCESS" },
              (response) => {
                console.debug("Sending CLEAR_DATA_SUCCESS message:", response.result)
              }
            );
          });
        }
      );
    });
  } else {
    sendResponse({ result: "Unknown command:" + request.command });
    return
  }
  sendResponse({ result: "success" });
});