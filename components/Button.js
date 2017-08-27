import React from 'react'
import PropTypes from 'prop-types'

import Platform from '../Platform'


export class Button extends React.Component {
    static propTypes = {
        accessibilityLabel: PropTypes.string,
        color: PropTypes.string,
        disabled: PropTypes.bool,
        onPress: PropTypes.func.isRequired,
        testID: PropTypes.string,
        title: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {animate: false}
    }

    handleOnPress() {
        console.log("TODO: animation");
        this.setState({animate: true})
        this.props.onPress()
    }

    render() {
        const {color, disabled=false, title} = this.props
        const style = {}
        if (color) {
            Object.assign(style, Platform.select({
                android: {backgroundColor: color},
                ios: {color},
            }))
        }
        return (
            <button
                type="button"
                className={this.state.animate ? "animated flash" : ""}
                onClick={() => this.handleOnPress()}
                disabled={disabled}
                style={style}>
                {title}
            </button>
        )
    }
}
