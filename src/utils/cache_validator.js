import $ from 'jquery';
import moment from 'moment';

/**
 * DateUtils class, holds all convenience methods for project.
 * @author Dean Silfen
 */
class CacheValidator {

    /**
     * @param {number} timestamp - lastViewed timestamp
     * @return {boolean} true if cache is stale and should be busted
     */
    static cacheIsFresh(timestamp) {
        return moment(timestamp).isAfter(moment().subtract(30, 'days'));
    }

    /**
     * @param {number} timestamp - lastViewed timestamp
     * @return {boolean} true if cache is stale and should be busted
     */
    static noNewCommits(cachedCount, commitNum) {
        return cachedCount !== -1 && cachedCount === commitNum;
    }
}

export default CacheValidator

