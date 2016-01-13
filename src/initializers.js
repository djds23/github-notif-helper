import Utils from './utils/utils.js';
import CacheValidator from './utils/cache_validator.js';
import $ from 'jquery';

/**
 * Initializers class that holds all functions to listen to app events
 * @author Dean Silfen
 */
class Initializers {

    /**
     * @listens {EventFileInView} Listens to this event to invalidate cache
     * @param   {Event} event - triggered from navigating to /files URL
     * @param   {Selector} files - all file div's on the page
     * @param   {number} commitNum - count of commits for the current PR
     */
    static invalidateCache(event, files, commitNum) {
        let cachedCount = Utils.getCachedCommitNumber();
        let timestamp = Utils.getLastViewed();

        const noNewCommits = CacheValidator.noNewCommits(cachedCount, commitNum);
        const cacheIsFresh = CacheValidator.cacheIsFresh(timestamp);

        if (cacheIsFresh && noNewCommits) {
            Utils.setLastViewed();
            return false;
        }

        Utils.resetCacheForPage();
        Utils.updateLocalStorage('commitNum', commitNum);
        Utils.setLastViewed();
        return true;
    }

    /**
     * @listens {EventFileInView} Listens to this event to add toggle all files button
     * @param   {Event} event - triggered from navigating to /files URL
     * @param   {Selector} files - all file div's on the page
     * @param   {number} commitNum - count of commits for the current PR
     */
    static addToggleAll(event, files, commitNum) {
        if (!files.length || $('#toggle-all').length) {
          return false;
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
        return true;
    }

    /**
     * @listens {EventFileInView} Listens to this event to add toggle button on file action bar
     * @param   {Event} event - triggered from navigating to /files URL
     * @param   {Selector} files - all file div's on the page
     * @param   {number} commitNum - count of commits for the current PR
     */
    static addToggle(event, files, commitNum) {
        if (!files.length) {
            return false;
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
        Utils.updateLocalStorage('files', viewedFiles)
        return true
    }

    /**
     * @listens {EventFileInView} Listens to this event to add toggle button on file action bar
     * @param   {Event} event - triggered from navigating to /files URL
     * @param   {Selector} files - all file div's on the page
     * @param   {number} commitNum - count of commits for the current PR
     */
    static makeBranchesLinks(event, files, commitNum) {
        if ($('.branch-anchor-tag').length) {
            return false;
        }

        const branchClassGroup = "span.commit-ref.current-branch.css-truncate"
        $(branchClassGroup).each((i, outerSpan) => {
            let anchor = Utils.branchSpanToAnchor(outerSpan.firstChild);
            outerSpan.appendChild(anchor);
        });
        return true;
    }
}

export default Initializers

