// Events
var visibilityEvents = Object.freeze((function () {
    return {
    UPDATE: function (build) {
        var event = jQuery.Event('TOGGLE_VISIBILITY');
        event.build = build;
        return event;
    }
}})());

// "Model" for background.js
var backgroundPort = Object.freeze((function (){
    return {
    getFileViewData: function getFileViewData() {
        var port = chrome.runtime.connect();

        port.postMessage({build: location.href});

        $(document).on(visibilityEvents.UPDATE(), function (event) {
             console.log('vis toggled');
             port.postMessage({
                 url: location.href,
                 build: event.build
             });
        });

        port.onMessage.addListener(function msg(msg) {
            console.log('INCOMING MESSAGE');
            console.log(msg);
            if (msg.build !== undefined) {
                this.build = msg.build
            }
        }.bind(this));
        return port;
    }.bind(this),

    build: function () {
        return this.build;
    }.bind(this)
}})());

// General utility functions
var utils = Object.freeze((function (){
    return {
    storePullView: function storePullView(url, branchName) {
        var pulls = utils.getRecentlyViewedPulls();
        if (pulls.length > 5) {
            pulls.pop();
        }
        var view = {
            url: url,
            branchName: branchName
        }

        $.each(pulls, function(i, e) {
            if (this.branchName == view.branchName) {
                pulls.splice(i, 1);
            }
        });

        pulls.unshift(view);
        localStorage.setItem('PULLS', JSON.stringify(pulls));
        return pulls;
    },

    getRecentlyViewedPulls: function recentlyViewedPulls() {
        return JSON.parse(localStorage.getItem('PULLS')) || [];
    },

    getFiles: function getFiles() {
        return $("#files").find("div[id^='diff-']");
    },

    getCachedFiles: function getCachedFiles() {
        return JSON.parse(localStorage.getItem(location.href)) || {};
    },

    getKeyIdFromEvent: function getKeyIdFromEvent(event) {
        return $(event.toElement).closest("div[id^='diff-']").attr('id');
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
            $(e.toElement).trigger(visibilityEvents.UPDATE());
            var visibilityBool = utils.toggleVisibility(fileContent);
            utils.updateLocalStorage(utils.getKeyIdFromEvent(e), visibilityBool);
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
}})());


function addToggleAll(files) {
    var buttonGroup = $('.btn-group.right');
    var templateButton = $('<a id="toggle-all" class="btn btn-sm"></a>');
    templateButton.html('Toggle All');
    templateButton.on('click', function (e) {
        files.each(function (i, e) {
            var fileContent = $(e).find("div.data, div.render-wrapper");
            utils.toggleVisibility(fileContent);
        });
    });
    templateButton.appendTo(buttonGroup);
}

function addToggle(files) {
    var viewedFiles = utils.getCachedFiles();
    files.each(function (i, e) {
        var cachedView = viewedFiles[this.id];
        var fileContent = utils.addToggleButtonForElement(this);
        if (cachedView === false) {
            fileContent.hide(100);
        } else {
            viewedFiles[this.id] = true;
        }
    });
    var jsonViewedFiles = JSON.stringify(viewedFiles);
    localStorage.setItem(location.href, jsonViewedFiles)
}


// Trigger an event for location changes since Github does not always
// reload the page during in repository navigation this snippet was
// taken from octotree: https://github.com/buunguyen/octotree
$(document).ready(function() {
    var href, hash;
    function detectLocationChange() {
        if (location.href !== href || location.hash !== hash) {
            href = location.href;
            hash = location.hash;
            $(document).trigger('URL_CHANGE', href, hash);
        }
        setTimeout(detectLocationChange, 250);
    }
    detectLocationChange();
});

// Listen to said event and manipulate files when we navigate
// to the correct URL
$(document).on('URL_CHANGE', function () {
    if (location.href.indexOf('pull') === -1) {
        utils.storePullView(location.href, $('.current-branch').last().text());
        console.log(utils.getRecentlyViewedPulls());
    }

    if (location.href.indexOf('files') === -1) {
        backgroundPort.getFileViewData();
        return;
    }

    var files = utils.getFiles();
    // If we find files
    if (files.length) {
        // Add toggle eyeballs
        addToggle(files);
        if (!$('#toggle-all').length) {
            // And add a toggle-all if it does not exist already
            addToggleAll(files);
        }
    }
});

