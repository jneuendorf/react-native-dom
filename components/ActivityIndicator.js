import React from "react"
import PropTypes from "prop-types"

import {StyleProcessingComponent, ActivityIndicatorSpinnerIos} from './'
import {View} from "../components"
import {viewPropTypes, ColorPropType} from "../prop-types"
import {Platform, StyleSheet} from "../api"


export class ActivityIndicator extends React.Component {
    static propTypes = {
        ...viewPropTypes,
        animating: PropTypes.bool,
        color: PropTypes.string,
        size: PropTypes.oneOfType([
            PropTypes.oneOf(['small', 'large']),
            PropTypes.number
        ]),
        hidesWhenStopped: PropTypes.bool
    }

    static defaultProps = {
        animating: true,
        color: Platform.OS === 'ios' ? '#999999' : undefined,
        hidesWhenStopped: true,
        size: 'small'
    }

    constructor(props) {
        super(props)
        this.iosAnimationFrame = 0
        this.iosAnimationStart = Date.now()
    }

    render() {
        const {
            animating,
            size,
            hidesWhenStopped,
            onLayout,
            style,
            ...props,
        } = this.props

        let sizeStyle
        switch (size) {
            case 'small':
                sizeStyle = styles.sizeSmall
                break
            case 'large':
                sizeStyle = styles.sizeLarge
                break
            default:
                sizeStyle = {
                    height: size,
                    width: size,
                }
                break
        }

        let child
        if (Platform.OS === 'ios') {
            // EARLY RETURN
            if (hidesWhenStopped && !animating) {
                return null
            }
            child = this.renderIosSpinner(sizeStyle)
        }
        else {
            child = this.renderAndroidSpinner(sizeStyle)
        }

        return (
            <View
                onLayout={onLayout}
                style={[styles.container, style]}
                nativeType="ActivityIndicator"
            >
                {child}
            </View>
        )
    }

    renderIosSpinner(style) {
        const {animating, color} = this.props
        return (
            <ActivityIndicatorSpinnerIos
                animating={animating}
                color={color}
                style={style}
                // animationFrame={this.iosAnimationFrame}
                // onMount={() => this.iosAnimationStart = Date.now()}
                // onUpdate={() => {
                //     const now = Date.now()
                //     const delta = now - this.iosAnimationStart
                //     // 0.7 == animation duration, 12 == number of animation steps
                //     this.iosAnimationFrame = Math.ceil((delta % 0.7) / 12 * 120)
                //     this.iosAnimationStart = now
                //     console.log(this.iosAnimationFrame, this.iosAnimationStart)
                // }}
            />
        )
    }

    renderAndroidSpinner(style) {
        style = StyleProcessingComponent.processStyle(style)
        const {animating, color} = this.props
        return (
            <div className={`preloader-wrapper active ${animating ? "" : "still"}`} style={style}>
                <div className="spinner-layer" style={{borderColor: color}}>
                    <div className="circle-clipper left">
                        <div className="circle" />
                    </div>
                    <div className="gap-patch">
                        <div className="circle" />
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle" />
                    </div>
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sizeSmall: {
        width: 20,
        height: 20,
    },
    sizeLarge: {
        width: 36,
        height: 36,
    },
})
