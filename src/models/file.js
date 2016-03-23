import $ from 'jquery';


/**
 * Model for File objects, make interfacing with github diffs easier to
 * deal with.
 * @author Dean Silfen
 */
class File {

    /**
     * @param  {jQuery} fileContent - jQuery div containing the diff for the file.
     */
    constructor(jquerySelector) {
        this.jquerySelector = jquerySelector;
        this.diffContent = jquerySelector.find("div.data, div.render-wrapper");
    }

    /**
     * @see http://api.jquery.com/hide/
     */
    hide() {
        return this.diffContent.hide.apply(this.diffContent, arguments);
    }

    /**
     * @see http://api.jquery.com/is/
     */
    is() {
        return this.diffContent.is.apply(this.diffContent, arguments);
    }

    /**
     * @return {jQuery} jQuery selector containing the new button
     */
    addToggleButton() {
        let actionBar = this.jquerySelector.find("div.file-actions");
        let existingButton = actionBar.find("#toggle")
        if (existingButton.length) {
            return existingButton; // Short circuit if the toggle exists
        }

        let button  = $('<a id="toggle" class="btn-octicon tooltipped tooltipped-nw"></a>');
        button.appendTo(actionBar);
        button.attr("aria-label", "Toggle this file");
        button.html(`
          <svg
            aria-hidden="true"
            class="octicon octicon-eye"
            height="16"
            role="img"
            version="1.1"
            viewBox="0 0 14 16" width="18">
              <path d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6c4.94 0 7.94-6 7.94-6S13 2 8.06 2z m-0.06 10c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4z m2-4c0 1.11-0.89 2-2 2s-2-0.89-2-2 0.89-2 2-2 2 0.89 2 2z">
              </path>
          </svg>
        `);
        return button;
    }
}

export default File
