import Utils from './utils/utils.js';
import $ from 'jquery';

function addToggleComments() {
    var buttonGroup = $('.btn-group.right');
    var templateButton = $('<a id="toggle-comments" class="btn btn-sm"></a>');
    templateButton.html('Hide Comments');
    templateButton.on('click', function (e) {
        $('tr.inline-comments').hide();
        $('add-line-comment').hide();
    });
    templateButton.appendTo(buttonGroup);
}

function addToggleAll(files) {
    var buttonGroup = $('.btn-group.right');
    var templateButton = $('<a id="toggle-all" class="btn btn-sm"></a>');
    templateButton.html('Toggle All');
    templateButton.on('click', function (e) {
        files.each(function (i, e) {
            var fileContent = $(e).find("div.data, div.render-wrapper");
            Utils.toggleVisibility(fileContent);
        });
    });
    templateButton.appendTo(buttonGroup);
}

function addToggle(files) {
    var viewedFiles = Utils.getCachedFiles();
    files.each(function (i, e) {
        var cachedView = viewedFiles[this.id];
        var fileContent = Utils.addToggleButtonForElement(this);
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
    if (location.href.indexOf('files') === -1) {
       return
    }
    var files = $("#files").find("div[id^='diff-']");
    // If we find files
    if (files.length) {
        // Add toggle eyeballs
        addToggle(files);
        if (!$('#toggle-all').length) {
            // And add a toggle-all if it does not exist already
            addToggleAll(files);
        }
        if (!$('#toggle-comments').length) {
          debugger;
            addToggleComments();
        }
    }
});

