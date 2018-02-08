import React from 'react'
import { mount, shallow, } from 'enzyme'

import general_components from '@likethemammal/general-components'

const shared = general_components.__tests__._shared.tests

import ArcadeButton from '../../ArcadeButton'
import { Touchable } from 'react-primitives'

const mockOut_func = jest.fn()
const mockIn_func = jest.fn()
const multiple_mockIn_func = jest.fn()

const component = shallow(
    <ArcadeButton
        onPressIn={mockIn_func}
        onPressOut={mockOut_func}
    />
)

const multiple_component = mount(
    <ArcadeButton
        onPressIn={multiple_mockIn_func}
    />
)

const empty_component = shallow(
    <ArcadeButton />
)

const disabled_mockDisabled_func = jest.fn()
const disabled_mockOut_func = jest.fn()
const disabled_mockIn_func = jest.fn()

const disabled_component = mount(
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
        multiple_component,
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

    test(`if not disabled, calling onPressIn multiple times should only call the mock once`, () => {

        multiple_component.find(Touchable).props().onPressIn()
        multiple_component.find(Touchable).props().onPressIn()
        multiple_component.find(Touchable).props().onPressIn()

        expect(
            multiple_mockIn_func.mock.calls.length
        ).toEqual(1)
    })

    test(`if disabled, onPressIn should not be called`, () => {
        disabled_component.find(Touchable).props().onPressIn()

        expect(
            disabled_mockIn_func.mock.calls.length
        ).toEqual(0)
    })

    test(`if disabled, onPressOut should not be called`, () => {
        disabled_component.find(Touchable).props().onPressOut()

        expect(
            disabled_mockOut_func.mock.calls.length
        ).toEqual(0)
    })

    test(`if disabled, onPressOut should call onDisabledOut mock function`, () => {
        disabled_component.find(Touchable).props().onPressOut()

        expect(
            disabled_mockDisabled_func.mock.calls.length
        ).toEqual(2)

        //twice, because of the earlier onPressOut
    })

})