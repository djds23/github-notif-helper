function createRow(pullView) {
    return "<tr><td>" + pullView.branchName + "</td><td" + pullView.url + "</td></tr>";
}

function getRecentlyViewedPulls() {
    var backgroundPage = chrome.extension.getBackgroundPage();
    var pulls = JSON.parse(backgroundPage.localStorage.getItem('PULLS')) || [];
    return pulls;
}

$(document).ready(function() {
    var $root = $("#container");
    var viewedPulls = getRecentlyViewedPulls();
    var rows = "";
    $.each(viewedPulls, function (i, e) {
        var row = createRow(this);
        rows += row;
    });
    $('#pulls > tbody').append(rows);
});

