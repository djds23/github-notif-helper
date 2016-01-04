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
                let _commits = parseInt($("#commits_tab_counter").html().trim());
                let commitNum = Number.isNaN(_commits) ? -1 : _commits;
                $(document).trigger(EventFileInView, [files, commitNum]);
            }
        }
        setTimeout(triggerLocationChange, 250);
    }
    triggerLocationChange();
}

// Attach the ready event
$(document).ready(readyFunction);

// Attach clear the cache if new commits are added
$(document).on(EventFileInView, Initializers.invalidateCacheForNewCommits);

// Anything else
$(document).on(EventFileInView, Initializers.addToggle);
$(document).on(EventFileInView, Initializers.addToggleAll);

