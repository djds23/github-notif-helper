import $ from 'jquery';

/**
 * Utils class, holds all convenience methods for project.
 * @author Dean Silfen
 */
class Utils {
    /**
     * @return {Map<string, Map<string, boolean>>} map of maps, Url of the PR is
     *   the key, returns a map of files and their visibility value.
     */
    static getCachedFiles() {
        return JSON.parse(localStorage.getItem(location.href)) || {};
    }

    static getKeyIdFromElement(element) {
        return $(element.toElement).closest("div[id^='diff-']").attr('id');
    }

    static updateLocalStorage(key, value) {
        if (key === undefined) {
            console.log('key is undefined');
            return false;
        }
        let storedJsonObject = localStorage.getItem(location.href);
        let pageSpecificJsonCache = JSON.parse(storedJsonObject);
        pageSpecificJsonCache[key] = value;
        let sotredJsonObject = JSON.stringify(pageSpecificJsonCache);
        localStorage.setItem(location.href, sotredJsonObject);
        return true;
    }

    static addToggleButtonForElement(element) {
        let $element = $(element)
        let actionBar = $element.find("div.file-actions");
        let fileContent = $element.find("div.data, div.render-wrapper");
        if (actionBar.find("#toggle").length) {
            return fileContent; // Short circuit if the toggle exists
        }

        let button  = $('<a id="toggle" class="octicon-btn tooltipped tooltipped-nw"></a>');
        button.on("click", (e) => {
            let visibilityBool = Utils.toggleVisibility(fileContent);
            Utils.updateLocalStorage(Utils.getKeyIdFromElement(e), visibilityBool);
        });

        button.appendTo(actionBar);
        button.attr("aria-label", "Toggle Utils file");
        button.html('<span class="octicon octicon-eye"></span>');
        return fileContent;
    }

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
