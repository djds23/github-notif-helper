import Utils from './utils/utils.js';
import $ from 'jquery';

class Initializers {
    static addToggleComments(event, files) {
        if (!files.length || $('#toggle-comments').length) {
          return;
        }

        let buttonGroup = $('.btn-group.right');
        let templateButton = $('<a id="toggle-comments" class="btn btn-sm"></a>');
        templateButton.html('Hide Comments');
        templateButton.on('click', (_) => {
            $('tr.inline-comments').hide();
            $('add-line-comment').hide();
        });
        templateButton.appendTo(buttonGroup);
    }

    static addToggleAll(event, files) {
        if (!files.length || $('#toggle-all').length) {
          return;
        }

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

    static addToggle(event, files) {
        if (!files.length) {
          return;
        }
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
}

export default Initializers
