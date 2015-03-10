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

function addButton () {
    var files = $("#files").find("div[id^='diff-']");
    if (files) {
        $.each(files, function (i, e) {
            var action_bar = $(e).find("div.file-actions");
            var button  = $(e).find("a.minibutton").clone(); 
            button.appendTo(action_bar);
        })
    }
}

addButton();
