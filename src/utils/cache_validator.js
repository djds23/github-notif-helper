import $ from 'jquery';
import moment from 'moment';

/**
 * CacheValidator class, methods here check for the validity of the cache.
 *   These methods should return false if the cache is invalid.
 * @author Dean Silfen
 */
class CacheValidator {

    /**
     * @param {number} timestamp - lastViewed timestamp
     * @return {boolean} true if cache is stale and should be busted
     */
    static cacheIsFresh(timestamp) {
        return timestamp > 0 && moment(timestamp).isAfter(moment().subtract(30, 'days'));
    }

    /**
     * @param {number} timestamp - lastViewed timestamp
     * @return {boolean} true if cache is stale and should be busted
     */
    static noNewCommits(cachedCount, commitNum) {
        return cachedCount > 0 && cachedCount === commitNum;
    }
}

export default CacheValidator

