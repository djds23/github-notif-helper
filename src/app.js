import Utils from './utils/utils.js';
import Initializers from './initializers.js';
import $ from 'jquery';

const EVENT_FILE_IN_VIEW = 'FILES_IN_VIEW';

$(document).ready(() => {
    let href;
    let hash;
    function triggerLocationChange() {
        if (location.href !== href || location.hash !== hash) {
            href = location.href;
            hash = location.hash;
            if (location.href.indexOf('files') !== -1) {
                let files = $("#files").find("div[id^='diff-']");
                $(document).trigger(EVENT_FILE_IN_VIEW, [files]);
            }
        }
        setTimeout(triggerLocationChange, 250);
    }
    triggerLocationChange();
});

$(document).on(EVENT_FILE_IN_VIEW, Initializers.addToggle);
$(document).on(EVENT_FILE_IN_VIEW, Initializers.addToggleAll);
$(document).on(EVENT_FILE_IN_VIEW, Initializers.addToggleComments);

