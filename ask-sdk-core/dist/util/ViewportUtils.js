"use strict";
/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License').
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the 'license' file accompanying this file. This file is distributed
 * on an 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getViewportProfile = exports.getViewportDpiGroup = exports.getViewportSizeGroup = exports.getViewportOrientation = exports.ViewportDpiGroupOrder = exports.ViewportSizeGroupOrder = void 0;
const ask_sdk_runtime_1 = require("ask-sdk-runtime");
exports.ViewportSizeGroupOrder = ['XSMALL', 'SMALL', 'MEDIUM', 'LARGE', 'XLARGE'];
exports.ViewportDpiGroupOrder = ['XLOW', 'LOW', 'MEDIUM', 'HIGH', 'XHIGH', 'XXHIGH'];
/**
 * return the {@link ViewportOrientation} of given width and height value
 * @param {number} width
 * @param {number} height
 * @return {ViewportOrientation}
 */
function getViewportOrientation(width, height) {
    return width > height
        ? 'LANDSCAPE'
        : width < height
            ? 'PORTRAIT'
            : 'EQUAL';
}
exports.getViewportOrientation = getViewportOrientation;
/**
 * return the {@link ViewportSizeGroup} of given size value
 * @param {number} size
 * @return {ViewportSizeGroup}
 */
function getViewportSizeGroup(size) {
    if (isBetween(size, 0, 600)) {
        return 'XSMALL';
    }
    else if (isBetween(size, 600, 960)) {
        return 'SMALL';
    }
    else if (isBetween(size, 960, 1280)) {
        return 'MEDIUM';
    }
    else if (isBetween(size, 1280, 1920)) {
        return 'LARGE';
    }
    else if (isBetween(size, 1920, Number.MAX_VALUE)) {
        return 'XLARGE';
    }
    throw (0, ask_sdk_runtime_1.createAskSdkError)('ViewportUtils', `unknown size group value ${size}`);
}
exports.getViewportSizeGroup = getViewportSizeGroup;
/**
 * return the {@link ViewportDpiGroup} of given dpi value
 * @param {number} dpi
 * @return {ViewportDpiGroup}
 */
function getViewportDpiGroup(dpi) {
    if (isBetween(dpi, 0, 121)) {
        return 'XLOW';
    }
    else if (isBetween(dpi, 121, 161)) {
        return 'LOW';
    }
    else if (isBetween(dpi, 161, 241)) {
        return 'MEDIUM';
    }
    else if (isBetween(dpi, 241, 321)) {
        return 'HIGH';
    }
    else if (isBetween(dpi, 321, 481)) {
        return 'XHIGH';
    }
    else if (isBetween(dpi, 481, Number.MAX_VALUE)) {
        return 'XXHIGH';
    }
    throw (0, ask_sdk_runtime_1.createAskSdkError)('ViewportUtils', `unknown dpi group value ${dpi}`);
}
exports.getViewportDpiGroup = getViewportDpiGroup;
/**
 * check if target number is within the range of [min, max);
 * @param {number} target
 * @param {number} min
 * @param {number} max
 * @return {boolean}
 */
function isBetween(target, min, max) {
    return target >= min && target < max;
}
/**
 * return the {@link ViewportProfile} of given request envelope
 * @param {RequestEnvelope} requestEnvelope
 * @return {ViewportProfile}
 */
function getViewportProfile(requestEnvelope) {
    const viewportState = requestEnvelope.context.Viewport;
    if (viewportState) {
        const currentPixelWidth = viewportState.currentPixelWidth;
        const currentPixelHeight = viewportState.currentPixelHeight;
        const dpi = viewportState.dpi;
        const shape = viewportState.shape;
        const viewportOrientation = getViewportOrientation(currentPixelWidth, currentPixelHeight);
        const viewportDpiGroup = getViewportDpiGroup(dpi);
        const pixelWidthSizeGroup = getViewportSizeGroup(currentPixelWidth);
        const pixelHeightSizeGroup = getViewportSizeGroup(currentPixelHeight);
        if (shape === 'ROUND'
            && viewportOrientation === 'EQUAL'
            && viewportDpiGroup === 'LOW'
            && pixelWidthSizeGroup === 'XSMALL'
            && pixelHeightSizeGroup === 'XSMALL') {
            return 'HUB-ROUND-SMALL';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'LANDSCAPE'
            && viewportDpiGroup === 'LOW'
            && exports.ViewportSizeGroupOrder.indexOf(pixelWidthSizeGroup) <= exports.ViewportSizeGroupOrder.indexOf('MEDIUM')
            && exports.ViewportSizeGroupOrder.indexOf(pixelHeightSizeGroup) <= exports.ViewportSizeGroupOrder.indexOf('XSMALL')) {
            return 'HUB-LANDSCAPE-SMALL';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'LANDSCAPE'
            && viewportDpiGroup === 'LOW'
            && exports.ViewportSizeGroupOrder.indexOf(pixelWidthSizeGroup) <= exports.ViewportSizeGroupOrder.indexOf('MEDIUM')
            && exports.ViewportSizeGroupOrder.indexOf(pixelHeightSizeGroup) <= exports.ViewportSizeGroupOrder.indexOf('SMALL')) {
            return 'HUB-LANDSCAPE-MEDIUM';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'LANDSCAPE'
            && viewportDpiGroup === 'LOW'
            && exports.ViewportSizeGroupOrder.indexOf(pixelWidthSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('LARGE')
            && exports.ViewportSizeGroupOrder.indexOf(pixelHeightSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('SMALL')) {
            return 'HUB-LANDSCAPE-LARGE';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'LANDSCAPE'
            && viewportDpiGroup === 'MEDIUM'
            && exports.ViewportSizeGroupOrder.indexOf(pixelWidthSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('MEDIUM')
            && exports.ViewportSizeGroupOrder.indexOf(pixelHeightSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('SMALL')) {
            return 'MOBILE-LANDSCAPE-MEDIUM';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'PORTRAIT'
            && viewportDpiGroup === 'MEDIUM'
            && exports.ViewportSizeGroupOrder.indexOf(pixelWidthSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('SMALL')
            && exports.ViewportSizeGroupOrder.indexOf(pixelHeightSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('MEDIUM')) {
            return 'MOBILE-PORTRAIT-MEDIUM';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'LANDSCAPE'
            && viewportDpiGroup === 'MEDIUM'
            && exports.ViewportSizeGroupOrder.indexOf(pixelWidthSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('SMALL')
            && exports.ViewportSizeGroupOrder.indexOf(pixelHeightSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('XSMALL')) {
            return 'MOBILE-LANDSCAPE-SMALL';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'PORTRAIT'
            && viewportDpiGroup === 'MEDIUM'
            && exports.ViewportSizeGroupOrder.indexOf(pixelWidthSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('XSMALL')
            && exports.ViewportSizeGroupOrder.indexOf(pixelHeightSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('SMALL')) {
            return 'MOBILE-PORTRAIT-SMALL';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'LANDSCAPE'
            && exports.ViewportDpiGroupOrder.indexOf(viewportDpiGroup) >= exports.ViewportDpiGroupOrder.indexOf('HIGH')
            && exports.ViewportSizeGroupOrder.indexOf(pixelWidthSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('XLARGE')
            && exports.ViewportSizeGroupOrder.indexOf(pixelHeightSizeGroup) >= exports.ViewportSizeGroupOrder.indexOf('MEDIUM')) {
            return 'TV-LANDSCAPE-XLARGE';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'PORTRAIT'
            && exports.ViewportDpiGroupOrder.indexOf(viewportDpiGroup) >= exports.ViewportDpiGroupOrder.indexOf('HIGH')
            && pixelWidthSizeGroup === 'XSMALL'
            && pixelHeightSizeGroup === 'XLARGE') {
            return 'TV-PORTRAIT-MEDIUM';
        }
        if (shape === 'RECTANGLE'
            && viewportOrientation === 'LANDSCAPE'
            && exports.ViewportDpiGroupOrder.indexOf(viewportDpiGroup) >= exports.ViewportDpiGroupOrder.indexOf('HIGH')
            && pixelWidthSizeGroup === 'MEDIUM'
            && pixelHeightSizeGroup === 'SMALL') {
            return 'TV-LANDSCAPE-MEDIUM';
        }
    }
    return 'UNKNOWN-VIEWPORT-PROFILE';
}
exports.getViewportProfile = getViewportProfile;
//# sourceMappingURL=ViewportUtils.js.map