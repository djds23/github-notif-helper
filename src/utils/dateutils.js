import $ from 'jquery';
import moment from 'moment';

/**
 * DateUtils class, holds all convenience methods for project.
 * @author Dean Silfen
 */
class DateUtils {

    /**
     * @param {number} timestamp - lastViewed timestamp
     * @return {boolean} true if cache is stale and should be busted
     */
    static shouldBustCache(timestamp) {
        return moment(timestamp).isBefore(moment().subtract(30, 'days'))
    }
}

export default DateUtils

