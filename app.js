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

function addToggle(files) {
    $.each(files, function (i, e) {
        var action_bar = $(e).find("div.file-actions");
        
        if (action_bar.find("#toggle-switch").length) {
            return
        }
        
        var file_content = $(e).find("div.data");
        var is_hidden = file_content.is(":visible");
        var button  = $('<a id="toggle-switch" class="octicon-button tooltipped tooltipped-nw"></a>').clone(); 
        button.on("click", function () {
            if (file_content.is(":visible")) {
                file_content.hide(350); 
            } else { 
                file_content.show(350);
            }
        });
        button.appendTo(action_bar);
        button.attr("aria-label", "Toggle this file");
        button.html('<span class="octicon octicon-eye"></span>');
    });
}

$(document).ready(function (e) {
    var files = $("#files").find("div[id^='diff-']");
    if (files) {
        addToggle(files);
    }

    var files_button = $('[data-container-id="files_bucket"')
    if (files_button) {
        files_button.on("click", function () {
            var files = $("#files").find("div[id^='diff-']");
            addToggle(files);
        })
    }
});
