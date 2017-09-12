import React from 'react'
import PropTypes from 'prop-types'

import {StyleProcessingComponent} from './'
import {Platform} from '../api'
import {viewPropTypes} from '../prop-types'


export class View extends StyleProcessingComponent {
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

    componentDidMount() {
        const {onLayout} = this.props
        if (onLayout) {
            // TODO
            onLayout({nativeEvent: {layout: {}}})
        }
    }

    render() {
        let {
            pointerEvents,
            style=[],
            divRef,
            nativeType="View",
            onLayout,
            children,
            ...props,
        } = this.props
        // TODO: This does probably not behave correctly.
        if (pointerEvents) {
            switch (pointerEvents) {
                case "none":
                    style = style.concat([{pointerEvents: "none"}])
                    break
                case "box-none":
                    style = style.concat([{pointerEvents: "none"}])
                    children = children.map(child => React.cloneElement(child, {style: {pointerEvents: "all"}}))
                    break
                case "box-only":
                    style = style.concat([{pointerEvents: "all"}])
                    children = children.map(child => React.cloneElement(child, {style: {pointerEvents: "none"}}))
                    break
            }
        }
        style = this.processStyle(style)
        // console.log(style, nativeType, this.constructor.name);
        return (
            <div
                {...props}
                ref={divRef}
                data-native-type={nativeType}
                onTouchMove={event => this.handleOnResponderMove(event)}
                onMouseDown={event => this.handleOnMouseDown(event)}
                onMouseUp={event => this.handleOnMouseUp(event)}
                onMouseMove={event => {
                    if (this.state.mouseDown) {
                        this.handleOnResponderMove(event)
                    }
                }}
                style={style}
            >
                {children}
            </div>
        )
    }
}
