// Since nothing equivalent is available in the browser
// we just provide the API.
export default class AccessibilityInfo {
    static fetch() {
        return new Promise(function(resolve, reject) {
            return resolve();
        });
    }

    static addEventListener() {

    }

    static removeEventListener() {

    }

    static setAccessibilityFocus() {

    }

    static announceForAccessibility() {

    }
}
