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
exports.ImageHelper = void 0;
/**
 * Responsible for building image object using ask-sdk-model in Alexa skills kit display interface
 * https://developer.amazon.com/docs/custom-skills/display-interface-reference.html#image-object-specifications.
 */
class ImageHelper {
    constructor() {
        this.image = {};
    }
    /**
     * Sets content description in image object
     * @param {string} description text used to describe the image for a screen reader
     * @returns {ImageHelper}
     */
    withDescription(description) {
        this.image.contentDescription = description;
        return this;
    }
    /**
     * Add image instance in image object
     * @param {string} url source of the image
     * @param {interfaces.display.ImageSize} size  size of the image. Accepted values:
     * X_SMALL: Displayed within extra small containers
     * SMALL: Displayed within small  containers
     * MEDIUM: Displayed within medium containers
     * LARGE: Displayed within large containers
     * X_LARGE Displayed within extra large containers
     * By default, for Echo Show, size takes the value X_SMALL. If the other size values are included,
     * then the order of precedence for displaying images begins with X_LARGE and proceeds downward,
     * which means that larger images will be downscaled for display on Echo Show if provided.
     * For the best user experience, include the appropriately sized image, and do not include larger images.
     * @param {number} widthPixels widthPixels of the image
     * @param {number} heightPixels heightPixels of the image
     * @returns {ImageHelper}
     */
    addImageInstance(url, size, widthPixels, heightPixels) {
        const imageInstance = {
            url,
        };
        if (size) {
            imageInstance.size = size;
        }
        if (heightPixels) {
            imageInstance.heightPixels = heightPixels;
        }
        if (widthPixels) {
            imageInstance.widthPixels = widthPixels;
        }
        if (!this.image.sources) {
            this.image.sources = [imageInstance];
        }
        else {
            this.image.sources.push(imageInstance);
        }
        return this;
    }
    /**
     * @returns {Image}
     */
    getImage() {
        return this.image;
    }
}
exports.ImageHelper = ImageHelper;
//# sourceMappingURL=ImageHelper.js.map