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
exports.CustomSkill = void 0;
const ask_sdk_model_1 = require("ask-sdk-model");
const ask_sdk_runtime_1 = require("ask-sdk-runtime");
const AttributesManagerFactory_1 = require("../attributes/AttributesManagerFactory");
const ResponseFactory_1 = require("../response/ResponseFactory");
var ServiceClientFactory = ask_sdk_model_1.services.ServiceClientFactory;
/**
 * Top level container for request dispatcher.
 */
class CustomSkill {
    constructor(skillConfiguration) {
        this.persistenceAdapter = skillConfiguration.persistenceAdapter;
        this.apiClient = skillConfiguration.apiClient;
        this.customUserAgent = skillConfiguration.customUserAgent;
        this.skillId = skillConfiguration.skillId;
        this.requestDispatcher = new ask_sdk_runtime_1.GenericRequestDispatcher({
            requestMappers: skillConfiguration.requestMappers,
            handlerAdapters: skillConfiguration.handlerAdapters,
            errorMapper: skillConfiguration.errorMapper,
            requestInterceptors: skillConfiguration.requestInterceptors,
            responseInterceptors: skillConfiguration.responseInterceptors,
        });
        const packageInfo = require('../../package.json');
        ask_sdk_runtime_1.UserAgentManager.registerComponent((0, ask_sdk_runtime_1.createAskSdkUserAgent)(packageInfo.version));
        if (this.customUserAgent) {
            ask_sdk_runtime_1.UserAgentManager.registerComponent(this.customUserAgent);
        }
    }
    /**
     * Invokes the dispatcher to handler the request envelope and construct the handler input.
     * @param requestEnvelope
     * @param context
     */
    async invoke(requestEnvelope, context) {
        if (this.skillId != null && requestEnvelope.context.System.application.applicationId !== this.skillId) {
            throw (0, ask_sdk_runtime_1.createAskSdkError)(this.constructor.name, 'CustomSkill ID verification failed!');
        }
        const input = {
            requestEnvelope,
            context,
            attributesManager: AttributesManagerFactory_1.AttributesManagerFactory.init({
                requestEnvelope,
                persistenceAdapter: this.persistenceAdapter,
            }),
            responseBuilder: ResponseFactory_1.ResponseFactory.init(),
            serviceClientFactory: this.apiClient
                ? new ServiceClientFactory({
                    apiClient: this.apiClient,
                    apiEndpoint: requestEnvelope.context.System.apiEndpoint,
                    authorizationValue: requestEnvelope.context.System.apiAccessToken,
                })
                : undefined,
        };
        const response = await this.requestDispatcher.dispatch(input);
        return {
            version: '1.0',
            response,
            userAgent: ask_sdk_runtime_1.UserAgentManager.getUserAgent(),
            sessionAttributes: requestEnvelope.session ? input.attributesManager.getSessionAttributes() : undefined,
        };
    }
    /**
     * Determines if the skill can support the specific request type.
     * @param input
     * @param context
     */
    supports(input, context) {
        return !!input.request;
    }
    /**
     * Append additional user agent info
     * @param userAgent
     */
    appendAdditionalUserAgent(userAgent) {
        ask_sdk_runtime_1.UserAgentManager.registerComponent(userAgent);
    }
}
exports.CustomSkill = CustomSkill;
//# sourceMappingURL=CustomSkill.js.map