import React from 'react'
import PropTypes from 'prop-types'

import Platform from '../Platform'
import {viewPropTypes} from '../prop-types'


export class View extends React.Component {
    static propTypes = viewPropTypes

    constructor(props) {
        super(props)
        this.state = {mouseDown: false}
    }

    handleOnResponderMove(event) {
        console.log("handling onResponderMove");
        if (typeof(this.props.onResponderMove) === 'function') {
            this.props.onResponderMove(event)
        }
    }

    handleOnMouseDown(event) {
        this.setState({mouseDown: true})
    }

    handleOnMouseUp(event) {
        this.setState({mouseDown: false})
    }

    render() {
        const {pointerEvents, style={}, divRef, nativeType, ...props} = this.props
        let {children} = props
        // TODO: This does probably not behave correctly.
        if (pointerEvents) {
            switch (pointerEvents) {
                case "none":
                    Object.assign(style, {pointerEvents: "none"})
                    break
                case "box-none":
                    Object.assign(style, {pointerEvents: "none"})
                    children = children.map(child => React.cloneElement(child, {style: {pointerEvents: "all"}}))
                    break
                case "box-only":
                    Object.assign(style, {pointerEvents: "all"})
                    children = children.map(child => React.cloneElement(child, {style: {pointerEvents: "none"}}))
                    break
            }
        }
        return (
            <div
                ref={divRef}
                data-native-type={nativeType || "View"}
                onTouchMove={event => this.handleOnResponderMove(event)}
                onMouseDown={event => this.handleOnMouseDown(event)}
                onMouseUp={event => this.handleOnMouseUp(event)}
                onMouseMove={event => {
                    if (this.state.mouseDown) {
                        this.handleOnResponderMove(event)
                    }
                }}
                {...props}
                style={style}
            >
                {children}
            </div>
        )
    }
}
