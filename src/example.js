import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
    <window.ArcadeButton onUp={() => { console.log('click') }}/>,
    document.getElementById('app')
)