import { outbox } from "file-transfer";
import * as cbor from "cbor";
import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { kpayFile } from '../common/index';

messaging.peerSocket.addEventListener("open", () => {
    const apiKey = settingsStorage.getItem("apiKey");
    console.log(apiKey)
    sync(apiKey);
});
  
function sync(apiKey) {
    if (!apiKey) return console.warn('no api key set');

    fetch(`https://api.kiezelpay.com/api/merchant/summary?key=${apiKey}`)
        .then(r => r.json())
        .then(data => {
            return outbox.enqueue(kpayFile, cbor.encode(data))
        })
        .then((ft) => {
            console.log(`Transfer of ${ft.name} successfully queued.`);
        })
        .catch(console.log);
}

sync(settingsStorage.getItem("apiKey"));

settingsStorage.onchange = function(evt) {
    if (evt.key === 'apiKey') {
        sync(evt.newValue);
    }
}