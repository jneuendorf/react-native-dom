import React from 'react'
import PropTypes from 'prop-types'

import Platform from '../Platform'


export class View extends React.Component {
    static propTypes = {
        accessibilityLabel: PropTypes.string,
        accessible: PropTypes.bool,
        hitSlop: PropTypes.object,
        onAccessibilityTap: PropTypes.func,
        onLayout: PropTypes.func,
        onMagicTap: PropTypes.func,
        onMoveShouldSetResponder: PropTypes.func,
        onMoveShouldSetResponderCapture: PropTypes.func,
        onResponderGrant: PropTypes.func,
        onResponderMove: PropTypes.func,
        onResponderReject: PropTypes.func,
        onResponderRelease: PropTypes.func,
        onResponderTerminate: PropTypes.func,
        onResponderTerminationRequest: PropTypes.func,
        onStartShouldSetResponder: PropTypes.func,
        onStartShouldSetResponderCapture: PropTypes.func,
        pointerEvents: PropTypes.oneOf(['box-none', 'none', 'box-only', 'auto']),
        removeClippedSubviews: PropTypes.bool,
        // TODO: set correct constraint
        style: PropTypes.any,
        testID: PropTypes.string,
        // ANDROID
        accessibilityComponentType: PropTypes.oneOf(['none', 'button', 'radiobutton_checked', 'radiobutton_unchecked']),
        accessibilityLiveRegion: PropTypes.oneOf(['none', 'polite', 'assertive']),
        collapsable: PropTypes.bool,
        importantForAccessibility: PropTypes.oneOf(['auto', 'yes', 'no', 'no-hide-descendants']),
        nativeID: PropTypes.string,
        needsOffscreenAlphaCompositing: PropTypes.bool,
        renderToHardwareTextureAndroid: PropTypes.bool,
        // IOS
        accessibilityTraits: PropTypes.oneOf([
            'none',
            'button',
            'link',
            'header',
            'search',
            'image',
            'selected',
            'plays',
            'key',
            'text',
            'summary',
            'disabled',
            'frequentUpdates',
            'startsMedia',
            'adjustable',
            'allowsDirectInteraction',
            'pageTurn',
        ]),
        accessibilityViewIsModal: PropTypes.bool,
        shouldRasterizeIOS: PropTypes.bool,
    }

    handleOnResponderMove(event) {
        if (typeof(this.props.onResponderMove) === 'function') {
            this.props.onResponderMove(event)
        }
    }

    render() {
        const {pointerEvents, style={}, ...props} = this.props
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
                data-native-type="View"
                onTouchMove={event => this.handleOnResponderMove(event)}
                onDrag={event => this.handleOnResponderMove(event)}
                style={style}>
                {children}
            </div>
        )
    }
}
