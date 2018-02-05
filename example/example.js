import React, { Component } from 'react'

import ArcadeButton from '../bin/lib'
import { AppRegistry } from 'react-native-web'


class App extends Component {
    render() {
        return <ArcadeButton
            text={'Arcade'}
            color={'green'}
        />
    }
}

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
    rootTag: document.getElementById('root')
})