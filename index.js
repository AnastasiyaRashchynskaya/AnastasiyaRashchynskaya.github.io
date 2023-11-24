const createIFrame = (url) =>
  new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.referrerPolicy = "unsafe-url";
    iframe.style.cssText =
      "width: 0; height: 0; border: 0; border: none; position: absolute; visibility: hidden";
    iframe.onload = () => resolve(iframe);
    iframe.onerror = (event) =>
      reject(new Error(`Loading iFrame ${url} failed with ${event}`));
    document.body.appendChild(iframe);
  });

window.storageFunctions = {
  getCookie: (iframe) => postRobot.send(iframe.contentWindow, "getCookie"),
  getAllCookie: (iframe) =>
    postRobot.send(iframe.contentWindow, "getAllCookie"),
  setCookie: (iframe) => postRobot.send(iframe.contentWindow, "setCookie"),
  clearCookie: (iframe) => postRobot.send(iframe.contentWindow, "deleteCookie"),
  getLocalStorage: (iframe) =>
    postRobot.send(iframe.contentWindow, "getLocalStorage"),
  setLocalStorage: (iframe) =>
    postRobot.send(iframe.contentWindow, "setLocalStorage"),
  getAllLocalStorage: (iframe) =>
    postRobot.send(iframe.contentWindow, "getAllLocalStorage"),
  clearLocalStorage: (iframe) =>
    postRobot.send(iframe.contentWindow, "deleteLocalStorage"),
  getSessionStorage: (iframe) =>
    postRobot.send(iframe.contentWindow, "getSessionStorage"),
  setSessionStorage: (iframe) =>
    postRobot.send(iframe.contentWindow, "setSessionStorage"),
  getAllSessionStorage: (iframe) =>
    postRobot.send(iframe.contentWindow, "getAllSessionStorage"),
  clearSessionStorage: (iframe) =>
    postRobot.send(iframe.contentWindow, "deleteSessionStorage"),
  getIndexDB: (iframe) => postRobot.send(iframe.contentWindow, "getIndexDB"),
  setIndexDB: (iframe) => postRobot.send(iframe.contentWindow, "setIndexDB"),
  getAllIndexDB: (iframe) =>
    postRobot.send(iframe.contentWindow, "getAllIndexDB"),
  clearIndexDB: (iframe) =>
    postRobot.send(iframe.contentWindow, "deleteIndexDB"),
  generateReport: (iframe) =>
    postRobot.send(iframe.contentWindow, "generateReport"),
};

window.init = ({ url }) => {
  const iframePromise = createIFrame(url);

  return {
    get: (storageItem) =>
      iframePromise.then((iframe) =>
        storageFunctions[`get${storageItem}`](iframe)
      ),
    getAll: (storageItem) =>
      iframePromise.then((iframe) =>
        storageFunctions[`getAll${storageItem}`](iframe)
      ),
    set: (storageItem) =>
      iframePromise.then((iframe) =>
        storageFunctions[`set${storageItem}`](iframe)
      ),
    clear: (storageItem) =>
      iframePromise.then((iframe) =>
        storageFunctions[`clear${storageItem}`](iframe)
      ),
    generateReport: () =>
      iframePromise.then((iframe) => storageFunctions.generateReport(iframe)),
  };
};
