import React from "react"
import PropTypes from "prop-types"

import {StyleProcessingComponent} from './'
import {View} from "../components"
import {viewPropTypes, ColorPropType} from "../prop-types"
import {Platform, StyleSheet} from "../api"




export class ActivityIndicatorSpinnerIos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    // componentDidMount() {
    //     this.props.onMount()
    // }
    //
    // componentWillUpdate(nextProps, nextState, nextContext) {
    //     this.props.onUpdate()
    // }

    render() {
        return (
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                {this.createGroups()}
            </svg>
        )
    }

    createGroups() {
        const {color, animating, duration=0.7, animationFrame=0} = this.props
        const groups = []
        let n = 0
        let i = animationFrame
        while (n < 12) {
            groups.push(
                <g key={i} transform={`rotate(${i*30} 50 50)`}>
                    <rect
                        x="47"
                        y="19"
                        rx="9.4"
                        ry="3.8000000000000003"
                        width="6"
                        height="14"
                        fill={color}
                        // first item has opacity=1
                        opacity={i/12 || 1}
                    >
                        {animating ? <animate
                            attributeName="opacity"
                            values="1;0"
                            keyTimes="0;1"
                            dur={`${duration}s`}
                            begin={`-${0.0583*(12-i)}s`}
                            repeatCount="indefinite"
                        /> : null}
                    </rect>
                </g>
            )
            i = (i+1) % 12
            n++
        }
        return groups
    }
}
