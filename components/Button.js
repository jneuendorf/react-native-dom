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
        this.timer = null
    }

    componentWillUnmount() {
        this.resetTimer()
    }

    handleOnPress() {
        this.resetTimer()
        this.setState({animate: true}, () => {
            if (this.state.animate && !this.timer) {
                this.timer = setTimeout(() => {
                    this.setState({animate: false})
                    this.resetTimer()
                }, 300)
            }
        })
        this.props.onPress()
    }

    resetTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }

    render() {
        const {color, disabled=false, style={}, title} = this.props
        if (color) {
            Object.assign(style, Platform.select({
                android: {backgroundColor: color},
                ios: {color},
            }))
        }
        return (
            <button
                type="button"
                data-native-type="Button"
                className={this.state.animate ? "animated flash" : ""}
                onClick={() => this.handleOnPress()}
                disabled={disabled}
                style={style}>
                {title}
            </button>
        )
    }
}
