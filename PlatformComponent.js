import React from 'react';


export default class PlatformComponent extends React.Component {
    static Platform = null

    constructor(props) {
        super(props)
        if (!this.constructor.Platform) {
            throw new Error('Platform must be set before instantiating.')
        }
    }

    // @final
    static setPlatform(Platform) {
        this.Platform = Platform
    }
}
