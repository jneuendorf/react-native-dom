import PropTypes from 'prop-types'


export const colorPropTypes = {}

export const ColorPropType = PropTypes.shape(colorPropTypes)

export const styleSheetPropTypes = {}

export const viewPropTypes = {
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
    // TODO: set correct constraint: probably stylePropTypes
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
