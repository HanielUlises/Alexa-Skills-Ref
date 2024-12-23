/**
 * An interface handling three level attributes: request, session and persistence.
 */
export interface AttributesManager {
    /**
     * Provides request attributes for the request life cycle.
     * @returns {Object.<string, any>}
     */
    getRequestAttributes(): {
        [key: string]: any;
    };
    /**
     * Provides session attributes extracted from request envelope.
     * @returns {Object.<string, any>}
     */
    getSessionAttributes<T = {
        [key: string]: any;
    }>(): T;
    /**
     * Provides persistent attributes retrieved and cached from persistence adapter, provide false to useSessionCache to ignore values cached from previous invocations.
     * @param {boolean} [useSessionCache=true]
     * @returns {Promise<Object.<string, any>>}
     */
    getPersistentAttributes(useSessionCache?: boolean, defaultAttributes?: {
        [key: string]: any;
    }): Promise<{
        [key: string]: any;
    }>;
    /**
     * Overwrites the request attributes value.
     * @param {Object.<string, any>} requestAttributes
     * @returns {void}
     */
    setRequestAttributes(requestAttributes: {
        [key: string]: any;
    }): void;
    /**
     * Overwrites the session attributes value.
     * @param {Object.<string, any>} sessionAttributes
     * @returns {void}
     */
    setSessionAttributes(sessionAttributes: {
        [key: string]: any;
    }): void;
    /**
     * Overwrites and caches the persistent attributes value. Note no persistence layer calls are being made in this function.
     * @param {Object.<string, any>} persistentAttributes
     * @returns {void}
     */
    setPersistentAttributes(persistentAttributes: {
        [key: string]: any;
    }): void;
    /**
     * Save persistent attributes to the persistence layer if a persistence adapter is provided.
     * @return {Promise<void>}
     */
    savePersistentAttributes(): Promise<void>;
    /**
     * Delete persistent attributes from the persistent layer if a persistence adapter is provided.
     * @return {Promise<void>}
     */
    deletePersistentAttributes?(): Promise<void>;
}
