function get_avatars_from_notif (notif) {
    if (notif instanceof HTMLElement) {
        var avatars = notif.getElementsByClassName('avatar-stack clearfix');
        return avatars[0].getElementsByTagName('img')
    }
    else {
        return false
    }
}

(function () {
    var user_id = document.getElementsByName("octolytics-actor-id")[0].content;
    var notifications = document.body.getElementsByClassName("js-navigation-item js-notification");
    for (i=0; i<=notifications.length; i++) {
        var notif = notifications[i]
        var avatars = get_avatars_from_notif(notif);
        if (avatars) {
            for (x=0; x<=avatars.length; x++) {
                var avatar = avatars[x]
                if (avatar) { 
                    var new_user_id = avatar.dataset['user']; 
                    if ( user_id === new_user_id ) {
                        var icon_left = notif.parentNode.getElementsByClassName("type-icon octicon");
                        var background = notif.parentNode.getElementsByClassName("js-navigation-item");
                        background[i].style.backgroundColor = "#FDE5E5";
                        icon_left[i].style.color = "#F2181B";
                    }
                }
            } 
        }
    }
})();

function getCachedFiles() {
    return JSON.parse(localStorage.getItem(location.href)) || {}
}

function updateCookies(visibilityBool, e) {
    var jsonViewedFiles = localStorage.getItem(location.href);
    var viewedFiles = JSON.parse(jsonViewedFiles);
    var keyId = $(e.toElement).closest("div[id^='diff-']")[0].id;
    viewedFiles[keyId] = visibilityBool;
    var jsonViewedFiles = JSON.stringify(viewedFiles);
    localStorage.setItem(location.href, jsonViewedFiles);
}

function addToggle(files) {
    var viewedFiles = getCachedFiles();
    $.each(files, function (i, e) {
        var action_bar = $(e).find("div.file-actions");
        var file_content = $(e).find("div.data");
        var is_hidden = file_content.is(":visible");
   
        var cachedView = viewedFiles[e.id];
        if (cachedView !== undefined) {
            if (!cachedView) {
                file_content.hide(100);
            }
        } else {
            viewedFiles[e.id] = true;
        }

        if (action_bar.find("#toggle").length) {
            return
        }
        var button  = $('<a id="toggle" class="octicon-button tooltipped tooltipped-nw"></a>').clone();
        button.on("click", function (e) {
            var visibilityBool = file_content.is(":visible");
            updateCookies(!visibilityBool, e);
            if (visibilityBool) {
                file_content.hide(350); 
            } else { 
                file_content.show(350);
            }
        });
        button.appendTo(action_bar);
        button.attr("aria-label", "Toggle this file");
        button.html('<span class="octicon octicon-eye"></span>');
    });
    var jsonViewedFiles = JSON.stringify(viewedFiles);
    localStorage.setItem(location.href, jsonViewedFiles )
}


$(document).ready(function() {
    var href, hash
    function detectLocationChange() {
        if (location.href !== href || location.hash !== hash) {
            href = location.href
            hash = location.hash
            $(document).trigger('URL_CHANGE', href, hash)
        }
        setTimeout(detectLocationChange, 200)
    }
    detectLocationChange()
});

$(document).on('URL_CHANGE', function () {
    var files = $("#files").find("div[id^='diff-']");
    if (files) {
        addToggle(files);
    }
});
