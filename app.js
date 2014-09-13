function find_avatars (snippet) {
    for (i=0; i<snippet.length; i++) {
        var node = snippet[i];
        var img = node.getElementsByTagName('img');
        if (img === false) {
            continue; 
        }
        else {
            if (img[0].classList.contains("avatar")) {
                return img[0]; 
            }
            else {
                continue; 
            }
        }
    }
}

function get_avatars_from_notif (notif) {
    var avatars = notif.getElementsByClassName('avatar-stack clearfix');
    return avatars[0].getElementsByTagName('img');
}

function find_notifs_for_user () {
    var user_id = document.getElementsByName("octolytics-actor-id")[0].content;
    var notifications = document.body.getElementsByClassName("boxed-group-inner list-group notifications");
    for (i=0; i<notifications.length; i++) {
        var notif = notifications[i];
        var avatars = get_avatars_from_notif(notif);
        for (i=0; i<avatars.length; i++) {;
            if (avatars[i].src.indexOf(user_id) !== -1) {
                var matched_avatar = avatars[i];
                var icon_left = notif.parentNode.getElementsByClassName("type-icon octicon");
                icon_left[0].style.color = "#F2181B";
            } 
        }
    }
}

find_notifs_for_user();