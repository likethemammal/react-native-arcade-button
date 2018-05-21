import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native-web'

const colors =  {

    offwhite: '#eeeeee',
    alto: '#dddddd',
    silver: '#cccccc',
    silver_dark: '#bbbbbb',
    dusty_gray: '#999999',
    gray: '#888888',
    emperor: '#555555',
    mine_shaft: '#222222',
}

const reflectionColor = 'rgba(255,255,255,0.35)'
const shadowColor = 'rgba(0,0,0,0.1)'
const shadowColorDark = 'rgba(0,0,0,0.15)'
const bottomShadowColor = colors.silver

export default class ArcadeButton extends Component {

    static defaultProps = {
        color: 'hsla(120, 52%, 48%, 1)',
    }

    state = {
        down: false,
        amountDown: new Animated.Value(0),
    }

    animationTimer = false

    onPressIn = (e) => {

        if (this.state.down) {
            return
        }

        const { onPressIn, disabled } = this.props

        this.setState({
            down: true
        })

        if (disabled) {
            return
        }

        this.animationTimer = Animated.timing(
            this.state.amountDown,
            {
                toValue: 1,
                delay: 0,
                duration: 42
            }
        );

        this.animationTimer.start()

        if (onPressIn) {
            onPressIn(e)
        }
    }

    onPressOut = (e) => {
        const { onPressOut, disabled, onDisabledOut, } = this.props

        this.setState({
            down: false
        })

        if (disabled) {
            if (onDisabledOut) onDisabledOut(e)
            return
        }

        //react native doesnt accept the value being reset to a new value of zero
        this.state.amountDown.setValue(0)

        if (onPressOut) {
            onPressOut(e)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { disabled } = this.props

        /* istanbul ignore next */
        if (
            prevProps.disabled && disabled ||
            !prevProps.disabled && !disabled
        ) {
            return
        }

        /* istanbul ignore next */
        this.state.amountDown.setValue(
            disabled ? 0 : 1
        )

    }

    render() {

        const { amountDown } = this.state
        const { color, children } = this.props

        const topDepressed = {
            transform: [{
                translateY: amountDown.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 2]
                })
            }],
            zIndex: 1,
            opacity: amountDown.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.8]
            })
        }

        const disabled = this.props.disabled && disabledStyles

        const topFlat = {
            backgroundColor: color,
            borderColor: color,
        }
        const bottomFlat = {
            backgroundColor: color,
        }
        const bottomRim = {
            backgroundColor: color,
        }

        return (
            <View style={styles.container}>
                <View style={styles.bottom}>
                    <View style={[styles.bottomShadowUnder, disabled && disabled.bottomShadowUnder]} />
                    <View style={[styles.bottomRim, bottomRim, disabled && disabled.bottomFlat]} />
                    <View style={[styles.bottomShadow, disabled && disabled.bottomShadow]} />
                    <View style={[styles.bottomFlat, bottomFlat, disabled && disabled.bottomFlat]} />
                    <View style={[styles.bottomFlatOverlay]} />
                </View>

                <View style={styles.top}>

                    <View style={[styles.topShadow, disabled && disabled.topShadow]} />

                    <Animated.View style={topDepressed}>

                        <View style={[styles.topReflection, disabled && disabled.topReflection]} />

                        <TouchableWithoutFeedback onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
                            <View style={[styles.topFlat, topFlat, disabled && disabled.topFlat]}>
                                {children}
                            </View>
                        </TouchableWithoutFeedback>

                    </Animated.View>

                </View>

            </View>
        )
    }
}

const disabledStyles = StyleSheet.create({
    topFlat: {
        backgroundColor: colors.silver_dark,
        borderColor: colors.silver_dark,
    },
    topReflection: {
        backgroundColor: bottomShadowColor,
    },
    bottomFlat: {
        borderColor: bottomShadowColor,
        backgroundColor: colors.silver_dark,
    },
    topShadow: {
        borderColor: colors.gray,
        backgroundColor: colors.dusty_gray,
    },
    bottomShadow: {
        backgroundColor: colors.dusty_gray,
    },
    bottomShadowUnder: {
        backgroundColor: bottomShadowColor,
    }
})

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'relative',
        top: 3,
        width: 220,
        height: 220,
    },
    top: {
        position: 'relative',
        top: -3,
    },
    topFlat: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        marginTop: 3,
        borderRadius: 75,
        borderWidth: 1,
        borderStyle: 'solid',
    },
    topShadow: {
        position: 'absolute',
        width: 150,
        height: 150,
        marginTop: 7,
        borderRadius: 75,
        borderColor: shadowColorDark,
        borderWidth: 1,
        borderStyle: 'solid',
        backgroundColor: shadowColor,
    },
    topReflection: {
        position: 'absolute',
        width: 150,
        height: 150,
        marginTop: 1,
        borderRadius: 75,
        backgroundColor: reflectionColor,
    },
    topDepressed: {
    },
    bottom: {
        position: 'relative',
        marginBottom: -175,
    },
    bottomFlat: {
        width: 200,
        height: 200,
        marginTop: 5,
        borderRadius: 100,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: reflectionColor,
    },
    bottomRim: {
        position: 'absolute',
        top: 8,
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    bottomFlatOverlay: {
        position: 'absolute',
        width: 200,
        height: 200,
        marginTop: 5,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    bottomShadow: {
        position: 'absolute',
        top: 8,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: shadowColor,
    },
    bottomShadowUnder: {
        position: 'absolute',
        top: -3,
        left: -10,
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: bottomShadowColor,
        opacity: 0.1,
    }
})
