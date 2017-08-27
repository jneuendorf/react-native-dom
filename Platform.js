class Platform {
    static OS = null
    static Version = null
    static _initted = false

    static select(object) {
        return object[this.OS];
    }

    static _init(os, version) {
        if (!this._initted) {
            this.OS = os
            this.Version = version
            document.body.classList += os
            this._initted = true
        }
    }
}


export default Platform
