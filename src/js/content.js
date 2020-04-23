chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "NOTIFY_CLEAR_COOKIES") {
    chrome.storage.sync.get("domain", (data) => {
      Swal.fire({
        title: "Clear site data?",
        text: "All cookies stored by " + data.domain + " will be deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          chrome.runtime.sendMessage({ command: "CLEAR_COOKIES" }, (response) => {
            console.debug("Sending CLEAR_COOKIES message: ", response)
          });
        }
      });
    });
  } else if (request.command === "CLEAR_COOKIES_SUCCESS"){
    Swal.fire(
      'Deleted!',
      'Your cookies has been deleted.',
      'success'
    )
  } else {
    sendResponse({ result: "Unknown command:" + request.command });
    return
  }
  sendResponse({ result: "success" });
});
