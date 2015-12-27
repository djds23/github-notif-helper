import Utils from './utils/utils.js';
import $ from 'jquery';

/**
 * Initializers class that holds all functions to listen to app events
 * @author Dean Silfen
 */
class Initializers {

    /**
     * @listens {EventFileInView} Listens to this event to add toggle all files button
     * @param   {Event} event - triggered from url change
     * @param   {Selector} files - all file div's on the page
     * @param   {number} commitNum - count of commits for the current PR
     */
    static invalidateCacheForNewCommits(event, files, commitNum) {
        if (Utils.getCachedCommitNumber() == commitNum) {
            return false;
        } else {
            Utils.resetCacheForPage();
            Utils.updateLocalStorage('commits', commitNum);
            return true;
        }
    }

    /**
     * @listens {EventFileInView} Listens to this event to add toggle all files button
     * @param   {Event} event - triggered from url change
     * @param   {Selector} files - all file div's on the page
     * @param   {number} commitNum - count of commits for the current PR
     */
    static addToggleAll(event, files, commitNum) {
        if (!files.length || $('#toggle-all').length) {
          return;
        }

        let buttonGroup = $('.btn-group.right');
        let templateButton = $('<a id="toggle-all" class="btn btn-sm"></a>');
        templateButton.html('Toggle All');
        templateButton.on('click',  (clickEvent) => {
            files.each((i, element) => {
                let fileContent = $(element).find("div.data, div.render-wrapper");
                Utils.toggleVisibility(fileContent);
            });
        });
        templateButton.appendTo(buttonGroup);
    }

    /**
     * @listens {EventFileInView} Listens to this event to add toggle button on file action bar
     * @param   {Event} event - triggered from url change
     * @param   {Selector} files - all file div's on the page
     * @param   {number} commitNum - count of commits for the current PR
     */
    static addToggle(event, files, commitNum) {
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

