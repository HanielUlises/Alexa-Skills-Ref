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
exports.DefaultApiClient = void 0;
const ask_sdk_runtime_1 = require("ask-sdk-runtime");
const url = require("url");
/**
 * Default implementation of {@link services.ApiClient} which uses the native HTTP/HTTPS library of Node.JS.
 */
class DefaultApiClient {
    /**
     * Dispatches a request to an API endpoint described in the request.
     * An ApiClient is expected to resolve the Promise in the case an API returns a non-200 HTTP
     * status code. The responsibility of translating a particular response code to an error lies with the
     * caller to invoke.
     * @param {services.ApiClientRequest} request request to dispatch to the ApiClient
     * @returns {Promise<services.ApiClientResponse>} response from the ApiClient
     */
    invoke(request) {
        const urlObj = url.parse(request.url);
        const clientRequestOptions = {
            // tslint:disable:object-literal-sort-keys
            hostname: urlObj.hostname,
            path: urlObj.path,
            port: urlObj.port,
            protocol: urlObj.protocol,
            auth: urlObj.auth,
            headers: arrayToObjectHeader(request.headers),
            method: request.method,
        };
        const client = clientRequestOptions.protocol === 'https:' ? require('https') : require('http');
        return new Promise((resolve, reject) => {
            const clientRequest = client.request(clientRequestOptions, (response) => {
                const chunks = [];
                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                response.on('end', () => {
                    const responseStr = chunks.join('');
                    const responseObj = {
                        statusCode: response.statusCode,
                        body: responseStr,
                        headers: objectToArrayHeader(response.headers),
                    };
                    resolve(responseObj);
                });
            });
            clientRequest.on('error', (err) => {
                reject((0, ask_sdk_runtime_1.createAskSdkError)(this.constructor.name, err.message));
            });
            if (request.body) {
                clientRequest.write(request.body);
            }
            clientRequest.end();
        });
    }
}
exports.DefaultApiClient = DefaultApiClient;
/**
 * Converts the header array in {@link services.ApiClientRequest} to compatible JSON object.
 * @private
 * @param {{key : string, value : string}[]} header header array from ApiClientRequest}
 * @returns {Object.<string, string[]>} header object to pass into HTTP client
 */
function arrayToObjectHeader(header) {
    const reducer = (obj, item) => {
        if (obj[item.key]) {
            obj[item.key].push(item.value);
        }
        else {
            obj[item.key] = [item.value];
        }
        return obj;
    };
    return header.reduce(reducer, {});
}
/**
 * Converts JSON header object to header array required for {services.ApiClientResponse}
 * @private
 * @param {Object.<string, (string|string[])>} header JSON header object returned by HTTP client
 * @returns {{key : string, value : string}[]}
 */
function objectToArrayHeader(header) {
    const arrayHeader = [];
    Object.keys(header).forEach((key) => {
        const headerArray = Array.isArray(header[key]) ? header[key] : [header[key]];
        for (const value of headerArray) {
            arrayHeader.push({
                key,
                value,
            });
        }
    });
    return arrayHeader;
}
//# sourceMappingURL=DefaultApiClient.js.map