import { RequestEnvelope } from 'ask-sdk-model';
export type ViewportProfile = 'HUB-ROUND-SMALL' | 'HUB-LANDSCAPE-SMALL' | 'HUB-LANDSCAPE-MEDIUM' | 'HUB-LANDSCAPE-LARGE' | 'MOBILE-LANDSCAPE-SMALL' | 'MOBILE-PORTRAIT-SMALL' | 'MOBILE-LANDSCAPE-MEDIUM' | 'MOBILE-PORTRAIT-MEDIUM' | 'TV-LANDSCAPE-XLARGE' | 'TV-PORTRAIT-MEDIUM' | 'TV-LANDSCAPE-MEDIUM' | 'UNKNOWN-VIEWPORT-PROFILE';
export type ViewportOrientation = 'EQUAL' | 'LANDSCAPE' | 'PORTRAIT';
export type ViewportSizeGroup = 'XSMALL' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'XLARGE';
export type ViewportDpiGroup = 'XLOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'XHIGH' | 'XXHIGH';
export declare const ViewportSizeGroupOrder: ViewportSizeGroup[];
export declare const ViewportDpiGroupOrder: ViewportDpiGroup[];
/**
 * return the {@link ViewportOrientation} of given width and height value
 * @param {number} width
 * @param {number} height
 * @return {ViewportOrientation}
 */
export declare function getViewportOrientation(width: number, height: number): ViewportOrientation;
/**
 * return the {@link ViewportSizeGroup} of given size value
 * @param {number} size
 * @return {ViewportSizeGroup}
 */
export declare function getViewportSizeGroup(size: number): ViewportSizeGroup;
/**
 * return the {@link ViewportDpiGroup} of given dpi value
 * @param {number} dpi
 * @return {ViewportDpiGroup}
 */
export declare function getViewportDpiGroup(dpi: number): ViewportDpiGroup;
/**
 * return the {@link ViewportProfile} of given request envelope
 * @param {RequestEnvelope} requestEnvelope
 * @return {ViewportProfile}
 */
export declare function getViewportProfile(requestEnvelope: RequestEnvelope): ViewportProfile;
