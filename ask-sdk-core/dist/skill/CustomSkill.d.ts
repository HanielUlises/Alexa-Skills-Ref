import { RequestEnvelope, Response, ResponseEnvelope, services } from 'ask-sdk-model';
import { RequestDispatcher, Skill } from 'ask-sdk-runtime';
import { PersistenceAdapter } from '../attributes/persistence/PersistenceAdapter';
import { HandlerInput } from '../dispatcher/request/handler/HandlerInput';
import { CustomSkillConfiguration } from './CustomSkillConfiguration';
import ApiClient = services.ApiClient;
/**
 * Top level container for request dispatcher.
 */
export declare class CustomSkill implements Skill<RequestEnvelope, ResponseEnvelope> {
    protected requestDispatcher: RequestDispatcher<HandlerInput, Response>;
    protected persistenceAdapter: PersistenceAdapter;
    protected apiClient: ApiClient;
    protected customUserAgent: string;
    protected skillId: string;
    constructor(skillConfiguration: CustomSkillConfiguration);
    /**
     * Invokes the dispatcher to handler the request envelope and construct the handler input.
     * @param requestEnvelope
     * @param context
     */
    invoke(requestEnvelope: RequestEnvelope, context?: any): Promise<ResponseEnvelope>;
    /**
     * Determines if the skill can support the specific request type.
     * @param input
     * @param context
     */
    supports(input: any, context?: any): boolean;
    /**
     * Append additional user agent info
     * @param userAgent
     */
    appendAdditionalUserAgent(userAgent: string): void;
}
