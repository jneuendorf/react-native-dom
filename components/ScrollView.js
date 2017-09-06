import React from 'react'
import PropTypes from 'prop-types'
import {easeInOutCubic as easing} from 'ez.js';

import Platform from '../Platform'
import {View} from './View'
import {styleSheetPropTypes, viewPropTypes, colorPropType} from '../prop-types'


export class ScrollView extends React.Component {
    static propTypes = {
        ...viewPropTypes,
        contentContainerStyle: PropTypes.shape(styleSheetPropTypes),
        horizontal: PropTypes.bool,
        keyboardDismissMode: PropTypes.oneOf([
            'none',
            'interactive',
            'on-drag'
        ]),
        keyboardShouldPersistTaps: PropTypes.oneOf(['always', 'never', 'handled', false, true]),
        onContentSizeChange: PropTypes.func,
        onScroll: PropTypes.func,
        pagingEnabled: PropTypes.bool,
        refreshControl: PropTypes.element,
        removeClippedSubviews: PropTypes.bool,
        scrollEnabled: PropTypes.bool,
        // scrollEventThrottle: PropTypes.number,
        showsHorizontalScrollIndicator: PropTypes.bool,
        showsVerticalScrollIndicator: PropTypes.bool,
        stickyHeaderIndices: PropTypes.arrayOf(PropTypes.number),
        /* style:
        Layout Props...
        Shadow Props...
        Transforms...
        backfaceVisibility enum('visible', 'hidden')
        backgroundColor color
        borderBottomColor color
        borderBottomLeftRadius number
        borderBottomRightRadius number
        borderBottomWidth number
        borderColor color
        borderLeftColor color
        borderLeftWidth number
        borderRadius number
        borderRightColor color
        borderRightWidth number
        borderStyle enum('solid', 'dotted', 'dashed')
        borderTopColor color
        borderTopLeftRadius number
        borderTopRightRadius number
        borderTopWidth number
        borderWidth number
        opacity number
        androidelevation number
        */
        // ANDROID
        endFillColor: PropTypes.shape(colorPropType),
        overScrollMode: PropTypes.oneOf(['auto', 'always', 'never',]),
        scrollPerfTag: PropTypes.string,
        // IOS
        alwaysBounceHorizontal: PropTypes.bool,
        alwaysBounceVertical: PropTypes.bool,
        automaticallyAdjustContentInsets: PropTypes.bool,
        bounces: PropTypes.bool,
        bouncesZoom: PropTypes.bool,
        canCancelContentTouches: PropTypes.bool,
        centerContent: PropTypes.bool,
        contentInset: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
        contentOffset: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
        decelerationRate: PropTypes.oneOfType([
            PropTypes.oneOf(['fast', 'normal']),
            PropTypes.number,
        ]),
        directionalLockEnabled: PropTypes.bool,
        indicatorStyle: PropTypes.oneOf([
            'default',
            'black',
            'white',
        ]),
        maximumZoomScale: PropTypes.number,
        minimumZoomScale: PropTypes.number,
        onScrollAnimationEnd: PropTypes.func,
        scrollEventThrottle: PropTypes.number,
        scrollIndicatorInsets: PropTypes.shape({
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        }),
        scrollsToTop: PropTypes.bool,
        snapToAlignment: PropTypes.oneOf([
            'start',
            'center',
            'end',
        ]),
        snapToInterval: PropTypes.number,
        zoomScale: PropTypes.number,
    }

    constructor(props) {
        super(props)
        this.isScrolling = false
        this.boundHandleScroll = null
        this.scroller = null
        // bind API methods
        this.scrollTo = this.scrollTo.bind(this)
    }

    // API methods

    // mostly from jump.js
    scrollTo({x=0, y=0, animated=true}) {
        const element = this.scroller
        console.log("scrollTo args", x, y, animated, element);
        // upon/after unmount
        if (!element) {
            return
        }

        if (!animated) {
            element.scrollLeft = x
            element.scrollTop = y
            return
        }

        const duration = 800
        const startLeft = element.scrollLeft
        const startTop = element.scrollTop
        const distanceX = Math.abs(startLeft - x)
        const distanceY = Math.abs(startTop - y)

        let timeStart = null
        const loop = (timeCurrent) => {
            if (!timeStart) {
                timeStart = timeCurrent
            }

            const timeElapsed = timeCurrent - timeStart
            const nextLeft = easing(timeElapsed, startLeft, distanceX, duration)
            const nextTop = easing(timeElapsed, startTop, distanceY, duration)
            element.scrollLeft = nextLeft
            element.scrollTop = nextTop
            if (timeElapsed < duration) {
                window.requestAnimationFrame(loop)
            }
            else {
                // account for rAF time rounding inaccuracies
                element.scrollLeft = x
                element.scrollTop = y

            }
        }
        window.requestAnimationFrame(loop)
    }

    scrollToEnd(options={animated: true}) {
        const {animated=true} = options
        const {horizontal=false} = this.props
        const element = this.scroller
        const items = element.childNodes
        const lastItem = items[items.length - 1]

        let x, y
        if (!horizontal) {
            x = element.scrollLeft
            y = lastItem.offsetTop - lastItem.parentNode.offsetTop
        }
        else {
            x = lastItem.offsetLeft - lastItem.parentNode.offsetLeft
            y = element.scrollTop
        }
        return this.scrollTo({x, y, animated})
    }

    scrollWithoutAnimationTo(y, x) {
        console.warn('`scrollWithoutAnimationTo` is deprecated. Use `scrollTo` instead')
        return this.scrollTo({x, y, animated: false})
    }
    // END - API methods

    componentDidMount() {
        // Pass callback so it doesn't have to be looked up from props on every scroll event.
        const {onScroll} = this.props
        if (onScroll) {
            this.boundHandleScroll = event => this.handleScroll(event, onScroll)
            this.scroller.addEventListener('scroll', this.boundHandleScroll)
        }
        // FOR TESTING:
        // if (onScroll) {
        //     this.scrollTo({y: 400, animated: true})
        //     this.scrollToEnd({animated: true})
        // }
        // else {
        //     this.scrollToEnd({animated: true})
        //     this.scrollTo({x: 100, animated: true})
        // }
    }

    componentWillUnmount() {
        this.scroller = null
        const {onScroll} = this.props
        if (onScroll) {
            this.ref.removeEventListener('scroll', this.boundHandleScroll)
        }
    }

    // 'onScroll' is defined since the handler is attached only in that case.
    handleScroll(event, onScroll) {
        event.stopPropagation()
        if (!this.isScrolling) {
            window.requestAnimationFrame(() => {
                onScroll(event)
                this.isScrolling = false
            })
            this.isScrolling = true
        }
    }

    render() {
        const {
            children,
            contentContainerStyle,
            horizontal=false,
            scrollEnabled=true,
            style={},
            /* eslint-disable */
            onMomentumScrollBegin,
            onMomentumScrollEnd,
            onScrollBeginDrag,
            onScrollEndDrag,
            removeClippedSubviews,
            scrollEventThrottle,
            showsHorizontalScrollIndicator,
            showsVerticalScrollIndicator,
            /* eslint-enable */
            ...props
        } = this.props

        let scrollStyle = {display: 'flex', flex: 1}
        if (!horizontal) {
            Object.assign(scrollStyle, {
                flexDirection: 'column',
                overflowX: 'hidden',
                overflowY: 'scroll',
            })
        }
        else {
            Object.assign(scrollStyle, {
                flexDirection: 'row',
                overflowX: 'scroll',
                overflowY: 'hidden',
            })
        }
        if (!scrollEnabled) {
            Object.assign(scrollStyle, {
                overflowX: 'hidden',
                overflowY: 'hidden',
            })
        }

        Object.assign(style, contentContainerStyle, {
            display: 'flex',
        })

        return (
            <View {...props}
                nativeType="ScrollView"
                style={style}
            >
                <View
                    divRef={elem => this.scroller = elem}
                    className="scroller"
                    style={scrollStyle}
                >
                    {React.Children.map(children, child => React.cloneElement(
                        child,
                        Object.assign({}, child.props.style, {style: {flex: 1}})
                    ))}
                </View>
            </View>
        )
    }
}
