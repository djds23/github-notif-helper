import Utils from './utils/utils.js';
import Initializers from './initializers.js';
import $ from 'jquery';

const EventFileInView = 'FILES_IN_VIEW';

/**
 * @emits {EventFileInView} emits EventFileInView event when on the 'files'
 *   tab of a Pull Request.
 */
function readyFunction() {
    let href;
    let hash;
    function triggerLocationChange() {
        if (location.href !== href || location.hash !== hash) {
            href = location.href;
            hash = location.hash;
            if (location.href.indexOf('files') !== -1) {
                let files = $("#files").find("div[id^='diff-']");
                let commits = parseInt($("#commits_tab_counter").html().trim());
                $(document).trigger(EventFileInView, [files, commits]);
            }
        }
        setTimeout(triggerLocationChange, 250);
    }
    triggerLocationChange();
}

$(document).ready(readyFunction);
$(document).on(EventFileInView, Initializers.addToggle);
$(document).on(EventFileInView, Initializers.addToggleAll);

