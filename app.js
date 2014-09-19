function get_avatars_from_notif (notif) {
    if (notif instanceof HTMLElement) {
        var avatars = notif.getElementsByClassName('avatar-stack clearfix');
        return avatars[0].getElementsByTagName('img')
    }
    else {
        return false
    }
}

function find_notifs_for_user () {
    var user_id = document.getElementsByName("octolytics-actor-id")[0].content;
    var notifications = document.body.getElementsByClassName("boxed-group-inner list-group notifications");
    var notifications = notifications[0].childNodes;
    for (i=0; i<=notifications.length; i++) {
        console.log(i);
        console.log(notifications.length)
        var notif = notifications[i]
        var avatars = get_avatars_from_notif(notif);
        if (avatars) {
            for (x=0; x<=avatars.length; x++) {
                var avatar = avatars[x]
                if (avatar) { 
                    var new_user_id = avatar.dataset['user']; 
                    if ( user_id === new_user_id ) {
                        var icon_left = notif.parentNode.getElementsByClassName("type-icon octicon"); // everything works but this line is wrong, too general. the way it works now you will get an array of all the left icons, it would be better to back out to the 'notif' and slightly changed the background
                        console.log(icon_left);
                        icon_left[0].style.color = "#F2181B";
                    }
                }
            } 
        }
    }
}

find_notifs_for_user()