import $ from 'jquery';

/**
 * Utils class, holds all convenience methods for project.
 * @author Dean Silfen
 */
class Utils {

    /**
     * @return {Object} Namespaced cache from page specific storage
     */
    static getPageCache() {
        return JSON.parse(localStorage.getItem(location.href)) || {};
    }

    /**
     * @desc Clear the local cache for the current page
     * @return {undefined}
     */
    static resetCacheForPage() {
        localStorage.setItem(location.href, JSON.stringify({}));
    }

    /**
     * @return {Object<string, boolean>} the ID of each diff and it's visibility bool.
     */
    static getCachedFiles() {
        return Utils.getPageCache().files || {};
    }

    /**
     * @param {string} fileId - file id to be stored
     * @param {boolean} visibilityBool - true if the file should be visible on page load.
     *   false if the file should be hidden
     */
    static setFileInCache(fileId, visibilityBool) {
        let cache = Utils.getCachedFiles();
        cache[fileId] = visibilityBool;
        return Utils.updateLocalStorage('files', cache);
    }

    /**
     * @return {number} number of commits as cached, 0 if never viewed before
     */
    static getCachedCommitNumber() {
        const cachedValue = Utils.getPageCache().commitNum;
        return cachedValue > 0 ? cachedValue : -1
    }

    /**
     * @param  {MouseEvent} clickEvent - Click event from a file's action bar.
     * @return {string} ID of the file from the file's Github page.
     */
    static getKeyIdFromEvent(clickEvent) {
        return $(clickEvent.toElement).closest("div[id^='diff-']").attr('id');
    }

    /**
     * @return {number} Unix timestamp of the last time the page was viewed, -1 if no value is cached.
     */
    static getLastViewed() {
        return Utils.getPageCache().lastViewed || -1;
    }

    /**
     * @desc store the current time as the lastViewed in page local cache
     */
    static setLastViewed() {
        Utils.updateLocalStorage("lastViewed", Date.now());
    }

    /**
     * @param  {string} key - key for cached pair
     * @param  {object} value - value for the cached pair
     * @return {boolean} true if the value was saved.
     */
    static updateLocalStorage(key, value) {
        if (key === undefined) {
            console.log('key is undefined');
            return false;
        }
        let pageSpecificJsonCache = Utils.getPageCache();
        pageSpecificJsonCache[key] = value;
        let serializedJsonObject = JSON.stringify(pageSpecificJsonCache);
        localStorage.setItem(location.href, serializedJsonObject);
        return true;
    }

    /**
     * @param  {HTMLElement} element - File container from pull page.
     * @return {jQuery} jQuery div containing the diff for the file.
     */
    static addToggleButtonForElement(element) {
        let $element = $(element)
        let actionBar = $element.find("div.file-actions");
        let fileContent = $element.find("div.data, div.render-wrapper");
        if (actionBar.find("#toggle").length) {
            return fileContent; // Short circuit if the toggle exists
        }

        let button  = $('<a id="toggle" class="btn-octicon tooltipped tooltipped-nw"></a>');
        button.on("click", (event) => {
            let visibilityBool = Utils.toggleVisibility(fileContent);
            Utils.setFileInCache(Utils.getKeyIdFromEvent(event), visibilityBool);
        });

        button.appendTo(actionBar);
        button.attr("aria-label", "Toggle this file");
        button.html(`
          <svg
            aria-hidden="true"
            class="octicon octicon-eye"
            height="16"
            role="img"
            version="1.1"
            viewBox="0 0 14 16" width="18">
              <path d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6c4.94 0 7.94-6 7.94-6S13 2 8.06 2z m-0.06 10c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4z m2-4c0 1.11-0.89 2-2 2s-2-0.89-2-2 0.89-2 2-2 2 0.89 2 2z">
              </path>
          </svg>
        `);
        return fileContent;
    }

    /**
     * @desc Toggle visibility and return the new visibility state of the element
     * @param  {jQuery} fileContent - jQuery div containing the diff for the file.
     * @return {boolean}  true if the file should be visible on page load.
     *   false if the file should be hidden.
     */
    static toggleVisibility(fileContent) {
        let visibilityBool = fileContent.is(":visible");
        if (visibilityBool) {
            fileContent.hide(350);
        } else {
            fileContent.show(350);
        }
        return !visibilityBool;
    }

    /**
     * @desc Take a branch name and return the URL for that branch
     * @param {HTMLSpanElement} span span containing branch
     * @return {HTMLAnchorElement} Anchor element
     */
    static branchSpanToAnchor(span) {
        let indexOfPullInURL = window.location.href.indexOf('pull');
        let branchUrl = (
          window.location.href.slice(0, indexOfPullInURL) + 'tree/' + span.innerHTML
        );
        let anchor = document.createElement('a');
        anchor.className = "branch-anchor-tag";
        anchor.href = branchUrl;
        anchor.appendChild(span);
        return anchor;
    }
}

export default Utils

