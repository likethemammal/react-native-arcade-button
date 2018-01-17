import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Animated,
    Touchable,
} from '@likethemammal/react-primitives'

import colors from '../constants/colors'

const reflectionColor = colors.malachite
const flatColor = colors.jade
const shadowColor = colors.green_haze
const shadowColorDark = colors.green_haze_dark
const bottomShadowColor = colors.silver

export default class ArcadeButton extends Component {
    state = {
        down: false,
        amountDown: new Animated.Value(0),
    }

    animationTimer = false

    onDown = () => {

        if (this.state.down) {
            return
        }

        const { onDown, disabled } = this.props

        this.setState({
            down: true
        })

        if (disabled) {
            return
        }

        this.animationTimer = Animated.timing(          // Uses easing functions
            this.state.amountDown,    // The value to drive
            {
                toValue: 1,
                delay: 0,
                duration: 42
            }            // Configuration
        );

        this.animationTimer.start()

        if (onDown) {
            onDown()
        }
    }

    onUp = () => {
        const { onUp, disabled, onDisabled, } = this.props

        this.setState({
            down: false
        })

        if (disabled) {
            onDisabled()
            return
        }

        //react native doesnt accect the value being reset to a new value of zero
        this.state.amountDown.setValue(0)

        if (onUp) {
            onUp()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.disabled && this.props.disabled) {
            this.state.amountDown.setValue(1)
        }

        if (prevProps.disabled && !this.props.disabled) {
            this.state.amountDown.setValue(0)
        }
    }

    render() {
        const topDepressed = {
            transform: [{
                translateY: this.state.amountDown.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 2]
                })
            }],
            zIndex: 1,
            opacity: this.state.amountDown.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.8]
            })
        }

        const disabled = this.props.disabled && {
                topFlat: {
                    backgroundColor: colors.silver_dark,
                    borderColor: colors.silver_dark,
                },
                topReflection: {
                    backgroundColor: colors.silver,
                },
                bottomFlat: {
                    borderColor: colors.silver,
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
                },
                text: {
                    textShadowColor: 'rgba(0,0,0,0.0)',
                    opacity: 0.5,
                }
            }

        return (
            <View style={styles.container}>
                <View style={styles.bottom}>
                    <View style={[styles.bottomShadowUnder, disabled && disabled.bottomShadowUnder]} />
                    <View style={[styles.bottomShadow, disabled && disabled.bottomShadow]} />
                    <View style={[styles.bottomFlat, disabled && disabled.bottomFlat]} />
                </View>

                <View style={styles.top}>

                    <View style={[styles.topShadow, disabled && disabled.topShadow]} />

                    <Animated.View style={topDepressed}>

                        <View style={[styles.topReflection, disabled && disabled.topReflection]} />

                        <Touchable onPressIn={this.onDown} onPressOut={this.onUp}>
                            <View style={[styles.topFlat, disabled && disabled.topFlat]}>
                                <Text style={[styles.text, disabled && disabled.text]}>Start</Text>
                            </View>
                        </Touchable>

                    </Animated.View>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 30,
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
        backgroundColor: flatColor,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: flatColor,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30,
        textShadowOffset: {
            width: 0,
            height: 1
        },
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowRadius: 5,
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
        backgroundColor: flatColor,
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
        opacity: 0.15,
    }
})
