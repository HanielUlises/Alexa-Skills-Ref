'use strict';

// import ask-sdk-core
const Alexa = require('ask-sdk-core');

// skill name
const appName = 'My Calculator';

// code for the handlers
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    // A handler function has three parts
    // 1. Handler verification
    // 2. Handler confirmation
    // 2.1 Response builder
    handle(handlerInput) {
        // welcome message
        let speechText = 'Hey There! Welcome to My Calculator. You can say, for instance, add 2 and 5 or subtract 2 from 5';
        // welcome screen message
        let timeSpent = 'Hey, Are you still there? You can say, for instance, add 2 and 5 or subtract 2 from 5'
        let displayText = "Welcome to My Calculator"
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(timeSpent)
            .withSimpleCard(appName, displayText)
            .getResponse();
    }
};

// implement custom handlers
const AddIntentHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        // Important to match like as our intents were written first
        && handlerInput.requestEnvelope.request.intent.name === 'AddIntent'
    },
    handle(handlerInput){
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        // From our created slots
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;

        if(firstNumber && secondNumber){
            let result = parseInt(firstNumber) + parseInt(secondNumber)
            speechText = `The result of ${firstNumber} plus ${secondNumber} is ${result}`
            displayText = `${result}`;

            return handlerInput.responseBuilder.speak(speechText).withSimpleCard(appName, displayText)
            .withShouldEndSession(true)
            .getResponse();
        }else{
            return handlerInput.responseBuilder.addDelegateDirective(intent).getResponse();
        }
    }
}

const subtractIntentHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        // Important to match like as our intents were written first
        && handlerInput.requestEnvelope.request.intent.name === 'SubtractIntent'
    },
    handle(handlerInput){
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        // From our created slots
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;

        if(firstNumber && secondNumber){
            let result = parseInt(secondNumber) - parseInt(firstNumber) 
            speechText = `The result of ${secondNumber} minus ${firstNumber} is ${result}`
            displayText = `${result}`;

            return handlerInput.responseBuilder.speak(speechText).withSimpleCard(appName, displayText)
            .withShouldEndSession(true)
            .getResponse();
        }else{
            return handlerInput.responseBuilder.addDelegateDirective(intent).getResponse();
        }
    }
}

const multiplyIntentHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
        && handlerInput.requestEnvelope.request.intent.name === 'MultiplyIntent'
    },
    handle(handlerInput){
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        // From our created slots
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;

        if(firstNumber && secondNumber){
            let result = parseInt(firstNumber) * parseInt(secondNumber)
            speechText = `The result of ${firstNumber} times ${secondNumber} is ${result}`
            displayText = `${result}`;

            return handlerInput.responseBuilder.speak(speechText).withSimpleCard(appName, displayText)
            .withShouldEndSession(true)
            .getResponse();
        }else{
            return handlerInput.responseBuilder.addDelegateDirective(intent).getResponse();
        }
    }
}

const divideIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'DivideIntent';
    },
    handle(handlerInput) {
        let speechText = '';
        let displayText = '';
        let intent = handlerInput.requestEnvelope.request.intent;
        // From our created slots
        let firstNumber = intent.slots.firstNumber.value;
        let secondNumber = intent.slots.secondNumber.value;

        if (isNaN(firstNumber) || isNaN(secondNumber) || firstNumber === undefined || secondNumber === undefined) {
            speechText = "Please provide valid numbers for both the first and second numbers.";
        }
        else if (firstNumber === '0') {
            speechText = "You cannot perform a division by zero.";
        }
        else {
            let result = parseInt(secondNumber) / parseInt(firstNumber);
            speechText = `The result of ${secondNumber} divided by ${firstNumber} is ${result}.`;
            displayText = `${result}`;
        }

        if (speechText) {
            return handlerInput.responseBuilder.speak(speechText)
                .withSimpleCard(appName, displayText || speechText)
                .withShouldEndSession(true)
                .getResponse();
        } else {
            return handlerInput.responseBuilder.addDelegateDirective(intent).getResponse();
        }
    }
};


// end Custom handlers

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        let speechText = 'You can say add 2 and 5 or subtract 2 from 5';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        let speechText = 'Goodbye';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(appName, speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};

// Lambda handler function
// Remember to add custom request handlers here
exports.handler = Alexa.SkillBuilders.custom()
     .addRequestHandlers(LaunchRequestHandler,
                         subtractIntentHandler,
                         multiplyIntentHandler,
                         divideIntentHandler,
                         AddIntentHandler,
                         HelpIntentHandler,
                         CancelAndStopIntentHandler,
                         SessionEndedRequestHandler).lambda();
