import $ from 'jquery';

/**
 * Utils class, holds all convenience methods for project.
 * @author Dean Silfen
 */
class Utils {
    /**
     * @return {Object<string, boolean>} the ID of each diff and it's visibility bool.
     */
    static getCachedFiles() {
        return JSON.parse(localStorage.getItem(location.href)) || {};
    }

    /**
     * @param  {MouseEvent} clickEvent - Click event from a file's action bar.
     * @return {string} ID of the file from the file's Github page.
     */
    static getKeyIdFromElement(clickEvent) {
        return $(clickEvent.toElement).closest("div[id^='diff-']").attr('id');
    }

    /**
     * @param  {string} fileId - fileId of the file from the file's Github page.
     * @param  {boolean} visibilityBool - true if the file should be visible on page load.
     *   false if the file should be hidden.
     * @return {boolean} true if the visibility was properly saved.
     */
    static updateLocalStorage(fileId, visibilityBool) {
        if (fileId === undefined) {
            console.log('fileId is undefined');
            return false;
        }
        let storedJsonObject = localStorage.getItem(location.href);
        let pageSpecificJsonCache = JSON.parse(storedJsonObject);
        pageSpecificJsonCache[fileId] = visibilityBool;
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
            Utils.updateLocalStorage(Utils.getKeyIdFromElement(event), visibilityBool);
        });

        button.appendTo(actionBar);
        button.attr("aria-label", "Toggle Utils file");
        button.html('<span class="octicon octicon-eye"></span>');
        return fileContent;
    }

    /**
     * @param {jQuery} fileContent - jQuery div containing the diff for the file.
     * @return {boolean}  true if the file should be visible on page load.
     *   false if the file should be hidden.
     */
    static toggleVisibility(fileContent) {
        // Toggle visibility and return the new visibility state of the element
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
