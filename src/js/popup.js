import * as helper from './helper.js';

let clearCookies = document.getElementById("clearCookies");

clearCookies.onclick = (element) => {
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        helper.notifyClearCookies(chrome, tabs[0])
    });
    window.close();
};
