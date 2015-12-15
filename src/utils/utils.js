import $ from 'jquery';

class Utils  {
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
        var storedJsonObject = localStorage.getItem(location.href);
        var pageSpecificJsonCache = JSON.parse(storedJsonObject);
        pageSpecificJsonCache[key] = value;
        var sotredJsonObject = JSON.stringify(pageSpecificJsonCache);
        localStorage.setItem(location.href, sotredJsonObject);
        return true;
    }

    static addToggleButtonForElement(element) {
        var $element = $(element)
        var actionBar = $element.find("div.file-actions");
        var fileContent = $element.find("div.data, div.render-wrapper");
        if (actionBar.find("#toggle").length) {
            return fileContent; // Short circuit if the toggle exists
        }

        var button  = $('<a id="toggle" class="octicon-btn tooltipped tooltipped-nw"></a>');
        button.on("click", function (e) {
            var visibilityBool = Utils.toggleVisibility(fileContent);
            Utils.updateLocalStorage(Utils.getKeyIdFromElement(e), visibilityBool);
        });

        button.appendTo(actionBar);
        button.attr("aria-label", "Toggle Utils file");
        button.html('<span class="octicon octicon-eye"></span>');
        return fileContent;
    }

    static toggleVisibility(fileContent) {
        // Toggle visibility and return the new visibility state of the element
        var visibilityBool = fileContent.is(":visible");
        if (visibilityBool) {
            fileContent.hide(350);
        } else {
            fileContent.show(350);
        }
        return !visibilityBool;
    }
}

export default Utils
