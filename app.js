// Notification Highlighting
function highlightNotifs () {
    var userId = $("meta[name=octolytics-actor-id]").attr('content');
    var notifications = $(".js-notification");

    $.each(notifications, function (_, notif) {
        var notif = $(notif)
        var avatars = notif.find('.avatar');

        $.each(avatars, function (_, avatar)  {
            var newUserId = avatar.dataset.user; 
            if ( userId === newUserId ) {
                notif.css("background-color", "#FDE5E5");
            }
        }); 
    });
}

// File View Toggle
function getCachedFiles() {
    return JSON.parse(localStorage.getItem(location.href)) || {}
}

function updateCookies(visibilityBool, e) {
    var jsonViewedFiles = localStorage.getItem(location.href);
    var viewedFiles = JSON.parse(jsonViewedFiles);
    var keyId = $(e.toElement).closest("div[id^='diff-']").attr('id');
    viewedFiles[keyId] = visibilityBool;
    var jsonViewedFiles = JSON.stringify(viewedFiles);
    localStorage.setItem(location.href, jsonViewedFiles);
}

function addToggle(files) {
    var viewedFiles = getCachedFiles();
    $.each(files, function (i, e) {
        var actionBar = $(e).find("div.file-actions");
        var fileContent = $(e).find("div.data");
        var isHidden = fileContent.is(":visible");
   
        var cachedView = viewedFiles[e.id];
        if (cachedView !== undefined) {
            if (!cachedView) {
                fileContent.hide(100);
            }
        } else {
            viewedFiles[e.id] = true;
        }

        if (actionBar.find("#toggle").length) {
            return
        }
        var button  = $('<a id="toggle" class="octicon-btn tooltipped tooltipped-nw"></a>').clone();
        button.on("click", function (e) {
            var visibilityBool = fileContent.is(":visible");
            // visibilityBool is negated so we know the state after manipulation 
            updateCookies(!visibilityBool, e);
            if (visibilityBool) {
                fileContent.hide(350); 
            } else { 
                fileContent.show(350);
            }
        });
        button.appendTo(actionBar);
        button.attr("aria-label", "Toggle this file");
        button.html('<span class="octicon octicon-eye"></span>');
    });
    var jsonViewedFiles = JSON.stringify(viewedFiles);
    localStorage.setItem(location.href, jsonViewedFiles )
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
    highlightNotifs();
    detectLocationChange();
});

// Listen to said event and manipulate files when we navigate
// to the correct URL
$(document).on('URL_CHANGE', function () {
    if (location.href.indexOf('files') === -1){
       return
    } 
    var files = $("#files").find("div[id^='diff-']");
    if (files) {
        addToggle(files);
    }
});
