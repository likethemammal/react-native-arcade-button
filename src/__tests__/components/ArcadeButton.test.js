import React from 'react'
import {shallow} from 'enzyme'

import general_components from '@likethemammal/general-components'

const shared = general_components.__tests__._shared.tests

import ArcadeButton from '../../ArcadeButton'
import { Touchable } from 'react-primitives'

const mockOut_func = jest.fn()
const mockIn_func = jest.fn()

const component = shallow(
    <ArcadeButton
        onPressIn={mockIn_func}
        onPressOut={mockOut_func}
    />
)

const empty_component = shallow(
    <ArcadeButton />
)

const disabled_mockDisabled_func = jest.fn()
const disabled_mockOut_func = jest.fn()
const disabled_mockIn_func = jest.fn()

const disabled_component = shallow(
    <ArcadeButton
        onDisabledOut={disabled_mockDisabled_func}
        onPressOut={disabled_mockOut_func}
        onPressIn={disabled_mockIn_func}
        disabled={true}
    />
)


describe('ArcadeButton', () => {

    shared.SNAPSHOTS_SHOULD_MATCH([
        component,
        disabled_component,
        empty_component,
    ])

    test(`if not disabled, mock funcs should  be called`, () => {
        component.find(Touchable).props().onPressIn()
        component.find(Touchable).props().onPressOut()

        expect(
            mockIn_func.mock.calls.length
        ).toEqual(1)

        expect(
            mockOut_func.mock.calls.length
        ).toEqual(1)
    })

    describe('if disabled, onPressOut should call onDisable mock function', () => {

        shared.SHOULD_CALL_MOCK_FROM_FUNCTION(
            disabled_component.find(Touchable).props().onPressOut,
            disabled_mockDisabled_func,
        )

    })

    test(`if disabled, onPressOut should not be called`, () => {
        disabled_component.find(Touchable).props().onPressOut()

        expect(
            disabled_mockOut_func.mock.calls.length
        ).toEqual(0)
    })

    test(`if disabled, onPressIn should not be called`, () => {
        disabled_component.find(Touchable).props().onPressIn()

        expect(
            disabled_mockIn_func.mock.calls.length
        ).toEqual(0)
    })

})