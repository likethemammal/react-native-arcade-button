import React from 'react'
import {shallow} from 'enzyme'

import general_components from '@likethemammal/general-components'

const shared = general_components.__tests__._shared.tests

import ArcadeButton from '../../ArcadeButton'

describe('ArcadeButton', () => {
    const component = shallow(
        <ArcadeButton
            action={() => {}}
        />
    )

    shared.SNAPSHOTS_SHOULD_MATCH([
        component
    ])
})