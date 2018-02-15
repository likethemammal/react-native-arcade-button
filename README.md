
react-native-arcade-button
=========

[![Build Status](https://travis-ci.org/likethemammal/react-native-arcade-button.svg?branch=master)](https://travis-ci.org/likethemammal/react-native-arcade-button)
[![Coverage Status](https://coveralls.io/repos/github/likethemammal/react-native-arcade-button/badge.svg?branch=master)](https://coveralls.io/github/likethemammal/react-native-arcade-button?branch=master)

[![screenshot](example/screenshot.png)](https://codesandbox.io/s/1rk8r5j1z4)

[Live Demo (CodeSandbox)](https://codesandbox.io/s/1rk8r5j1z4)

## Installation

```sh
npm i --save react-native-arcade-button
```

### Usage

```jsx
import React from 'react'

import ArcadeButton from 'react-native-arcade-button'

class Foo extends React.Component {

  onClick = (e) => {
    //...some code
  }

  render() {
    return (
      <ArcadeButton
        onPressOut={this.onClick}
      >
        <Text>Click</Text>
      </ArcadeButton>
    )
  }
}

```

### Props

| name        | type           | default  | desc 
--- | --- | --- | --- |
| *children* | Component | null | Traditional React `children` component(s) passed along to label the button. Can be text, icon, etc. |
| color | string | null | Any rgb, hex, hsv, etc. color supported by `StyleSheet`.
| disabled | bool | false | Disables the button presses, will call `onDisabledOut` when pressed anyway (for user experience use cases). |
| onDisabledOut | func | null | When `disabled` is true, function is called when button is pressed out anyway. |
| onPressIn | func | null | Function called when button press in. |
| onPressOut | func | null | Function called when button is released. |
