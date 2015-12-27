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
     * @description Clear the local cache for the current page
     * @return {undefined}
     */
    static resetCacheForPage() {
        localStorage.setItem(location.href, JSON.stringify({}));
    }

    /**
     * @return {Object<string, boolean>} the ID of each diff and it's visibility bool.
     */
    static getCachedFiles() {
        let cache = Utils.getPageCache();
        let files = {}
        for (let key in cache) {
            if (key.match(/diff/)) {
                files[key] = cache[key];
            }
        }
        return files;
    }

    /**
     * @return {number} number of commits as cached, 0 if never viewed before
     */
    static getCachedCommitNumber() {
        return Utils.getPageCache().commitNum > 0 ? Utils.getPageCache().commitNum : -1
    }

    /**
     * @param  {MouseEvent} clickEvent - Click event from a file's action bar.
     * @return {string} ID of the file from the file's Github page.
     */
    static getKeyIdFromEvent(clickEvent) {
        return $(clickEvent.toElement).closest("div[id^='diff-']").attr('id');
    }

    /**
     * @param  {string} key - key for cached pair
     * @param  {boolean} value - value for the cached pair
     * @return {boolean} true if the value was saved.
     */
    static updateLocalStorage(key, value) {
        if (key === undefined) {
            console.log('key is undefined');
            return false;
        }
        let pageSpecificJsonCache = Utils.getPageCache();
        pageSpecificJsonCache[key] = value;
        let sotredJsonObject = JSON.stringify(pageSpecificJsonCache);
        localStorage.setItem(location.href, sotredJsonObject);
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

        let button  = $('<a id="toggle" class="octicon-btn tooltipped tooltipped-nw"></a>');
        button.on("click", (event) => {
            let visibilityBool = Utils.toggleVisibility(fileContent);
            Utils.updateLocalStorage(Utils.getKeyIdFromEvent(event), visibilityBool);
        });

        button.appendTo(actionBar);
        button.attr("aria-label", "Toggle this file");
        button.html('<span class="octicon octicon-eye"></span>');
        return fileContent;
    }

    /**
     * @description Toggle visibility and return the new visibility state of the element
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
}

export default Utils

