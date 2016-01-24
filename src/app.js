import Initializers from './initializers.js';
import $ from 'jquery';

const EventFileInView = 'FILES_IN_VIEW';
const EventOnPullPage = 'PULL_PAGE';

/**
 * @emits {EventFileInView} emits EventFileInView event when on the 'files'
 *   tab of a Pull Request.
 * @emits {EventOnPullPage} emits EventOnPullPage when 'pull' is in the url
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

        if (location.href.indexOf('pull') !== -1) {
            $(document).trigger(EventOnPullPage, []);
        }
        setTimeout(triggerLocationChange, 250);
    }
    triggerLocationChange();
}

// Attach the ready event
$(document).ready(readyFunction);

// Attach clear the cache if new commits are added
$(document).on(EventFileInView, Initializers.invalidateCache);

// Anything else
$(document).on(EventFileInView, Initializers.addToggleByExtension);
$(document).on(EventFileInView, Initializers.addToggle);
$(document).on(EventFileInView, Initializers.addToggleAll);
$(document).on(EventOnPullPage, Initializers.makeBranchesLinks);


