"use strict";
/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttributesManagerFactory = void 0;
const ask_sdk_runtime_1 = require("ask-sdk-runtime");
/**
 * Provider for attributes that can be stored on three levels: request, session and persistence.
 */
class AttributesManagerFactory {
    static init(options) {
        if (!options.requestEnvelope) {
            throw (0, ask_sdk_runtime_1.createAskSdkError)('AttributesManagerFactory', 'RequestEnvelope cannot be null or undefined!');
        }
        let thisRequestAttributes = {};
        let thisSessionAttributes = options.requestEnvelope.session
            ? options.requestEnvelope.session.attributes
                ? JSON.parse(JSON.stringify(options.requestEnvelope.session.attributes))
                : {}
            : undefined;
        let thisPersistentAttributes;
        let persistentAttributesSet = false;
        return {
            getRequestAttributes() {
                return thisRequestAttributes;
            },
            getSessionAttributes() {
                if (!options.requestEnvelope.session) {
                    throw (0, ask_sdk_runtime_1.createAskSdkError)('AttributesManager', 'Cannot get SessionAttributes from out of session request!');
                }
                return thisSessionAttributes;
            },
            async getPersistentAttributes(useSessionCache = true, defaultAttributes) {
                if (!options.persistenceAdapter) {
                    throw (0, ask_sdk_runtime_1.createAskSdkError)('AttributesManager', 'Cannot get PersistentAttributes without PersistenceManager');
                }
                if (!persistentAttributesSet || !useSessionCache) {
                    thisPersistentAttributes = await options.persistenceAdapter.getAttributes(options.requestEnvelope);
                    persistentAttributesSet = true;
                }
                if (defaultAttributes && (!thisPersistentAttributes || Object.keys(thisPersistentAttributes).length < 1)) {
                    thisPersistentAttributes = defaultAttributes;
                }
                return thisPersistentAttributes;
            },
            setRequestAttributes(requestAttributes) {
                thisRequestAttributes = requestAttributes;
            },
            setSessionAttributes(sessionAttributes) {
                if (!options.requestEnvelope.session) {
                    throw (0, ask_sdk_runtime_1.createAskSdkError)('AttributesManager', 'Cannot set SessionAttributes to out of session request!');
                }
                thisSessionAttributes = sessionAttributes;
            },
            setPersistentAttributes(persistentAttributes) {
                if (!options.persistenceAdapter) {
                    throw (0, ask_sdk_runtime_1.createAskSdkError)('AttributesManager', 'Cannot set PersistentAttributes without persistence adapter!');
                }
                thisPersistentAttributes = persistentAttributes;
                persistentAttributesSet = true;
            },
            async savePersistentAttributes() {
                if (!options.persistenceAdapter) {
                    throw (0, ask_sdk_runtime_1.createAskSdkError)('AttributesManager', 'Cannot save PersistentAttributes without persistence adapter!');
                }
                if (persistentAttributesSet) {
                    await options.persistenceAdapter.saveAttributes(options.requestEnvelope, thisPersistentAttributes);
                }
            },
            async deletePersistentAttributes() {
                if (!options.persistenceAdapter) {
                    throw (0, ask_sdk_runtime_1.createAskSdkError)('AttributesManager', 'Cannot delete PersistentAttributes without persistence adapter!');
                }
                await options.persistenceAdapter.deleteAttributes(options.requestEnvelope);
                thisPersistentAttributes = undefined;
                persistentAttributesSet = false;
            },
        };
    }
    constructor() { }
}
exports.AttributesManagerFactory = AttributesManagerFactory;
//# sourceMappingURL=AttributesManagerFactory.js.map