(function port() {
    var port = chrome.runtime.onConnect.addListener(function (port) {
      port.postMessage({build: "JELLO WORLD!"});
    });
}());
