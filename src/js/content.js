chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "NOTIFY_CLEAR_DATA") {
    chrome.storage.sync.get(["reload", "noPrompt", "domain"], (data) => {
      if (data.noPrompt) {
        chrome.runtime.sendMessage({ command: "CLEAR_DATA" }, (response) => {
          console.debug("Sending CLEAR_DATA message: ", response);
        });
      } else {
        Swal.fire({
          title: "Clear site data?",
          text:
            "All data stored by " +
            data.domain +
            " and any sites under it will be deleted. This includes cookies. You'll be signed out of these sites, including in open tabs.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
          customClass: {
            container: "my-swal",
          },
        }).then((result) => {
          if (result.value) {
            chrome.runtime.sendMessage(
              { command: "CLEAR_DATA" },
              (response) => {
                console.debug("Sending CLEAR_DATA message: ", response);
              },
            );
          }
        });
      }
    });
  } else if (request.command === "CLEAR_DATA_SUCCESS") {
    chrome.storage.sync.get(["reload", "noPrompt", "domain"], (data) => {
      if (data.reload) {
        history.go(0);
      } else {
        if (!data.noPrompt) {
          Swal.fire({
            title: "Deleted!",
            text: "Your cookies has been deleted.",
            icon: "success",
            customClass: {
              container: "my-swal",
            },
          });
        }
      }
    });
  } else {
    sendResponse({ result: "Unknown command:" + request.command });
    return;
  }
  sendResponse({ result: "success" });
});
