import Utils from './utils/utils.js';
import $ from 'jquery';

function addToggleComments() {
    let buttonGroup = $('.btn-group.right');
    let templateButton = $('<a id="toggle-comments" class="btn btn-sm"></a>');
    templateButton.html('Hide Comments');
    templateButton.on('click', (_) => {
        $('tr.inline-comments').hide();
        $('add-line-comment').hide();
    });
    templateButton.appendTo(buttonGroup);
}

function addToggleAll(files) {
    let buttonGroup = $('.btn-group.right');
    let templateButton = $('<a id="toggle-all" class="btn btn-sm"></a>');
    templateButton.html('Toggle All');
    templateButton.on('click',  (event) => {
        files.each((i, element) => {
            let fileContent = $(element).find("div.data, div.render-wrapper");
            Utils.toggleVisibility(fileContent);
        });
    });
    templateButton.appendTo(buttonGroup);
}

function addToggle(files) {
    let viewedFiles = Utils.getCachedFiles();
    files.each((i, element) => {
        let cachedView = viewedFiles[element.id];
        let fileContent = Utils.addToggleButtonForElement(element);
        if (cachedView === false) {
            fileContent.hide(100);
        } else {
            viewedFiles[element.id] = true;
        }
    });
    let jsonViewedFiles = JSON.stringify(viewedFiles);
    localStorage.setItem(location.href, jsonViewedFiles)
}


// Trigger an event for location changes since Github does not always
// reload the page during in repository navigation this snippet was
// taken from octotree: https://github.com/buunguyen/octotree
$(document).ready(() => {
    let href, hash;
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
$(document).on('URL_CHANGE', () => {
    if (location.href.indexOf('files') === -1) {
       return
    }
    let files = $("#files").find("div[id^='diff-']");
    // If we find files
    if (files.length) {
        // Add toggle eyeballs
        addToggle(files);
        if (!$('#toggle-all').length) {
            // And add a toggle-all if it does not exist already
            addToggleAll(files);
        }
        if (!$('#toggle-comments').length) {
            addToggleComments();
        }
    }
});

