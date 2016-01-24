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

    /**
     * @listens {EventFileInView} Listens to this event to add toggle all files button
     * @param   {Event} event - triggered from navigating to /files URL
     * @param   {Selector} files - all file div's on the page
     * @param   {number} commitNum - count of commits for the current PR
     */
    static addToggleByExtension(event, files, commitNum) {
        if (!files.length) {
            return false;
        }

        filesByExtension = Utils.filesByExtension(files);
        let selected = 'selected';
        const buttonString = `
            <button class="btn btn-sm select-menu-button js-menu-target css-truncate " title="Hide by Extension" type="button" aria-label="Hide branches by file extension" tabindex="0" aria-haspopup="true">
              <i>Hide By Extension:</i>
              <span class="js-select-button css-truncate-target">master</span>
            </button>
        `
        let button = $(buttonString);
        for (let extension in filesByExtension) {
            if (!filesByExtension.hasOwnProperty(extension)) {
                continue;
            }

            let lineItem = `
                <div class="select-menu-item js-navigation-item js-navigation-open" data-extension="${extension}" rel="nofollow">
                  <span aria-hidden="true" class="octicon octicon-check select-menu-item-icon"></span>
                  <span class="select-menu-item-text css-truncate-target" title="${extension}">
                    ${extension}
                  </span>
               </div>
           `
           button.append($(lineItem));
        }
    }
}

export default Initializers

