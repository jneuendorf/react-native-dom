import React from 'react'


export class StyleProcessingComponent extends React.Component {

    static processStyle(style) {
        if (style instanceof Array) {
            if (style.length === 0) {
                return {}
            }
            return Object.assign(
                ...style
                .filter(e => e)
                // flatten
                .map(e =>
                    e instanceof Array ? this.processStyle(e) : e
                )
            )
        }
        // undefined, null or single style object
        if (!style || typeof(style) === 'object') {
            return style
        }
        throw new Error("Invalid style given to process.")
    }

    // Convert array styles from React Native to a single object.
    processStyle(style) {
        return this.constructor.processStyle(style)
    }

    getStyle() {
        return this.processStyle(this.props.style)
    }
}

export default StyleProcessingComponent
