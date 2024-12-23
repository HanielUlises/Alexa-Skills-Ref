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
exports.ResponseFactory = void 0;
/**
 * Responsible for building JSON responses using ask-sdk-model as per the Alexa skills kit interface
 * https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/alexa-skills-kit-interface-reference#response-body-syntax.
 */
class ResponseFactory {
    static init() {
        const response = {};
        function isVideoAppLaunchDirectivePresent() {
            if (!response.directives) {
                return false;
            }
            for (const directive of response.directives) {
                if (directive.type === 'VideoApp.Launch') {
                    return true;
                }
            }
            return false;
        }
        function trimOutputSpeech(speechOutput) {
            if (!speechOutput) {
                return '';
            }
            const speech = speechOutput.trim();
            const length = speech.length;
            if (speech.startsWith('<speak>') && speech.endsWith('</speak>')) {
                return speech.substring(7, length - 8).trim();
            }
            return speech;
        }
        return {
            speak(speechOutput, playBehavior) {
                response.outputSpeech = {
                    type: 'SSML',
                    ssml: `<speak>${trimOutputSpeech(speechOutput)}</speak>`,
                    playBehavior,
                };
                if (!playBehavior) {
                    delete response.outputSpeech.playBehavior;
                }
                return this;
            },
            reprompt(repromptSpeechOutput, playBehavior) {
                if (!response.reprompt) {
                    response.reprompt = {};
                }
                response.reprompt.outputSpeech = {
                    type: 'SSML',
                    ssml: `<speak>${trimOutputSpeech(repromptSpeechOutput)}</speak>`,
                    playBehavior,
                };
                if (!playBehavior) {
                    delete response.reprompt.outputSpeech.playBehavior;
                }
                if (!isVideoAppLaunchDirectivePresent()) {
                    response.shouldEndSession = false;
                }
                return this;
            },
            withSimpleCard(cardTitle, cardContent) {
                response.card = {
                    type: 'Simple',
                    title: cardTitle,
                    content: cardContent,
                };
                return this;
            },
            withStandardCard(cardTitle, cardContent, smallImageUrl, largeImageUrl) {
                const card = {
                    type: 'Standard',
                    title: cardTitle,
                    text: cardContent,
                };
                if (smallImageUrl || largeImageUrl) {
                    card.image = {};
                    if (smallImageUrl) {
                        card.image.smallImageUrl = smallImageUrl;
                    }
                    if (largeImageUrl) {
                        card.image.largeImageUrl = largeImageUrl;
                    }
                }
                response.card = card;
                return this;
            },
            withLinkAccountCard() {
                response.card = {
                    type: 'LinkAccount',
                };
                return this;
            },
            withAskForPermissionsConsentCard(permissionArray) {
                response.card = {
                    type: 'AskForPermissionsConsent',
                    permissions: permissionArray,
                };
                return this;
            },
            addDelegateDirective(updatedIntent) {
                const delegateDirective = {
                    type: 'Dialog.Delegate',
                };
                if (updatedIntent) {
                    delegateDirective.updatedIntent = updatedIntent;
                }
                this.addDirective(delegateDirective);
                return this;
            },
            addElicitSlotDirective(slotToElicit, updatedIntent) {
                const elicitSlotDirective = {
                    type: 'Dialog.ElicitSlot',
                    slotToElicit,
                };
                if (updatedIntent) {
                    elicitSlotDirective.updatedIntent = updatedIntent;
                }
                this.addDirective(elicitSlotDirective);
                return this;
            },
            addConfirmSlotDirective(slotToConfirm, updatedIntent) {
                const confirmSlotDirective = {
                    type: 'Dialog.ConfirmSlot',
                    slotToConfirm,
                };
                if (updatedIntent) {
                    confirmSlotDirective.updatedIntent = updatedIntent;
                }
                this.addDirective(confirmSlotDirective);
                return this;
            },
            addConfirmIntentDirective(updatedIntent) {
                const confirmIntentDirective = {
                    type: 'Dialog.ConfirmIntent',
                };
                if (updatedIntent) {
                    confirmIntentDirective.updatedIntent = updatedIntent;
                }
                this.addDirective(confirmIntentDirective);
                return this;
            },
            addAudioPlayerPlayDirective(playBehavior, url, token, offsetInMilliseconds, expectedPreviousToken, audioItemMetadata) {
                const stream = {
                    url,
                    token,
                    offsetInMilliseconds,
                };
                if (expectedPreviousToken) {
                    stream.expectedPreviousToken = expectedPreviousToken;
                }
                const audioItem = {
                    stream,
                };
                if (audioItemMetadata) {
                    audioItem.metadata = audioItemMetadata;
                }
                const playDirective = {
                    type: 'AudioPlayer.Play',
                    playBehavior,
                    audioItem,
                };
                this.addDirective(playDirective);
                return this;
            },
            addAudioPlayerStopDirective() {
                const stopDirective = {
                    type: 'AudioPlayer.Stop',
                };
                this.addDirective(stopDirective);
                return this;
            },
            addAudioPlayerClearQueueDirective(clearBehavior) {
                const clearQueueDirective = {
                    type: 'AudioPlayer.ClearQueue',
                    clearBehavior,
                };
                this.addDirective(clearQueueDirective);
                return this;
            },
            addRenderTemplateDirective(template) {
                const renderTemplateDirective = {
                    type: 'Display.RenderTemplate',
                    template,
                };
                this.addDirective(renderTemplateDirective);
                return this;
            },
            addHintDirective(text) {
                const hint = {
                    type: 'PlainText',
                    text,
                };
                const hintDirective = {
                    type: 'Hint',
                    hint,
                };
                this.addDirective(hintDirective);
                return this;
            },
            addVideoAppLaunchDirective(source, title, subtitle) {
                const videoItem = {
                    source,
                };
                if (title || subtitle) {
                    videoItem.metadata = {};
                    if (title) {
                        videoItem.metadata.title = title;
                    }
                    if (subtitle) {
                        videoItem.metadata.subtitle = subtitle;
                    }
                }
                const launchDirective = {
                    type: 'VideoApp.Launch',
                    videoItem,
                };
                this.addDirective(launchDirective);
                delete response.shouldEndSession;
                return this;
            },
            withCanFulfillIntent(canFulfillIntent) {
                response.canFulfillIntent = canFulfillIntent;
                return this;
            },
            withShouldEndSession(val) {
                if (!isVideoAppLaunchDirectivePresent()) {
                    response.shouldEndSession = val;
                }
                return this;
            },
            addDirective(directive) {
                if (!response.directives) {
                    response.directives = [];
                }
                response.directives.push(directive);
                return this;
            },
            addDirectiveToReprompt(directive) {
                if (!response.reprompt) {
                    response.reprompt = {};
                }
                if (!response.reprompt.directives) {
                    response.reprompt.directives = [];
                }
                response.reprompt.directives.push(directive);
                if (!isVideoAppLaunchDirectivePresent()) {
                    this.withShouldEndSession(false);
                }
                return this;
            },
            withApiResponse(apiResponse) {
                response.apiResponse = apiResponse;
                return this;
            },
            addExperimentTrigger(experimentId) {
                if (!response.experimentation) {
                    const experimentation = {
                        triggeredExperiments: []
                    };
                    response.experimentation = experimentation;
                }
                response.experimentation.triggeredExperiments.push(experimentId);
                return this;
            },
            getResponse() {
                return response;
            },
        };
    }
    constructor() { }
}
exports.ResponseFactory = ResponseFactory;
//# sourceMappingURL=ResponseFactory.js.map