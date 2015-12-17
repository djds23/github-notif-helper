import Utils from './utils/utils.js';
import Initializers from './initializers.js';
import $ from 'jquery';

const EventFileInView = 'FILES_IN_VIEW';

$(document).ready(() => {
    let href;
    let hash;

    /**
     * @emits {EventFileInView} emits EventFileInView event when on the 'files'
     *   tab of a Pull Request.
     */
    function triggerLocationChange() {
        if (location.href !== href || location.hash !== hash) {
            href = location.href;
            hash = location.hash;
            if (location.href.indexOf('files') !== -1) {
                let files = $("#files").find("div[id^='diff-']");
                $(document).trigger(EventFileInView, [files]);
            }
        }
        setTimeout(triggerLocationChange, 250);
    }
    triggerLocationChange();
});

$(document).on(EventFileInView, Initializers.addToggle);
$(document).on(EventFileInView, Initializers.addToggleAll);
$(document).on(EventFileInView, Initializers.addToggleComments);

