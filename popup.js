// TODO: IMPORTANT! use gulp or some sort of build tool
// currently this code is copy-pasted from app.js, this can be avoided
// by keeping utils in a util.js and requiring it in popup.js, then building
// the file with gulp
window.utils = Object.freeze({
    getFiles: function getFiles() {
        return $("#files").find("div[id^='diff-']"); 
    },

    getCachedFiles: function getCachedFiles() {
        return JSON.parse(localStorage.getItem(location.href)) || {};
    },

    getKeyIdFromElement: function getKeyIdFromElement(element) {
        return $(element.toElement).closest("div[id^='diff-']").attr('id');
    },

    updateLocalStorage: function updateLocalStorage(key, value) {
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
    },

    addToggleButtonForElement: function addToggleButtonForElement(element) {
        var $element = $(element)
        var actionBar = $element.find("div.file-actions");
        var fileContent = $element.find("div.data, div.render-wrapper");
        if (actionBar.find("#toggle").length) {
            return fileContent; // Short circuit if the toggle exists
        }

        var button  = $('<a id="toggle" class="octicon-btn tooltipped tooltipped-nw"></a>');
        button.on("click", function (e) {
            var visibilityBool = utils.toggleVisibility(fileContent);
            utils.updateLocalStorage(utils.getKeyIdFromElement(e), visibilityBool);
        });

        button.appendTo(actionBar);
        button.attr("aria-label", "Toggle this file");
        button.html('<span class="octicon octicon-eye"></span>');
        return fileContent;
    },

    toggleVisibility: function toggleVisibility(fileContent) {
        // Toggle visibility and return the new visibility state of the element
        var visibilityBool = fileContent.is(":visible");
        if (visibilityBool) {
            fileContent.hide(350);
        } else {
            fileContent.show(350);
        }
        return !visibilityBool;
    }
});


