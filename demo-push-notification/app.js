let isSubscribed = !1,
  swRegistration = null,
  applicationKey =
    "BMiBp3lvCa9hJurodtvtZqavPnBMg1j33o4rxV_pm8J5c6NGVAVoLpHahJoqi88zyqmTZsGsZdqrqlPe8Enehog";

function urlB64ToUint8Array(e) {
  const r = (e + "=".repeat((4 - (e.length % 4)) % 4))
      .replace(/\-/g, "+")
      .replace(/_/g, "/"),
    s = window.atob(r),
    o = new Uint8Array(s.length);
  for (let e = 0; e < s.length; ++e) o[e] = s.charCodeAt(e);
  return o;
}

function saveSubscription(e) {
  let r = new XMLHttpRequest();
  r.open("POST", "/push-subscribe"),
    r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
    (r.onreadystatechange = function() {
      4 == r.readyState &&
        (200 != r.status && 304 != r.status
          ? console.log("HTTP error " + r.status, null)
          : console.log("User subscribed to server"));
    }),
    r.send(JSON.stringify(e));
}

"serviceWorker" in navigator && "PushManager" in window
  ? (console.log("Service Worker and Push is supported"),
    navigator.serviceWorker
      .register("./sw.js")
      .then(function(e) {
        console.log("service worker registered"),
          (swRegistration = e).pushManager.getSubscription().then(function(e) {
            (isSubscribed = !(null === e))
              ? console.log("User is subscribed", e)
              : swRegistration.pushManager
                  .subscribe({
                    userVisibleOnly: !0,
                    applicationServerKey: urlB64ToUint8Array(applicationKey)
                  })
                  .then(function(e) {
                    console.log(e),
                      console.log("User is subscribed"),
                      saveSubscription(e),
                      (isSubscribed = !0);
                  })
                  .catch(function(e) {
                    console.log("Failed to subscribe user: ", e);
                  });
          });
      })
      .catch(function(e) {
        console.error("Service Worker Error", e);
      }))
  : console.warn("Push messaging is not supported");
