'use client'
import { useState } from 'react'
import { RescueSvg, RepairSvg, TrainingSvg } from '@/components/svgs'
import ModeCard from './ModeCard'
import { MODES } from '@/types'
import { useModeStore } from '@/store'

type MyEqrModes = {
    id: MODES
    icon: JSX.Element
    title: string
    description: string
    selected: boolean
    onSelect: () => void
}[]

const Mode = () => {
    const { activeMode, updateActiveMode } = useModeStore()
    const [selectedMode, setSelectedMode] = useState(activeMode || MODES.RESCUE)

    const onSelectHandler = (mode: MODES) => {
        updateActiveMode(mode)
        setSelectedMode(mode)
    }

    const myEqrModes: MyEqrModes = [
        {
            id: MODES.RESCUE,
            icon: (
                <RescueSvg
                    className='h-16 w-16 md:h-24 md:w-24'
                    pathProps={{
                        fill:
                            selectedMode === MODES.RESCUE
                                ? '#FFFFFF'
                                : '#222222',
                    }}
                />
            ),
            title: 'Rescue',
            description:
                'Access emergency information and guidelines critical for safely handling electric vehicles in emergency situations.',
            selected: selectedMode === MODES.RESCUE,
            onSelect: () => onSelectHandler(MODES.RESCUE),
        },
        {
            id: MODES.REPAIR,
            icon: (
                <RepairSvg
                    className='h-16 w-16 md:h-24 md:w-24'
                    pathProps={{
                        fill:
                            selectedMode === MODES.REPAIR
                                ? '#FFFFFF'
                                : '#222222',
                    }}
                />
            ),
            title: 'Repair',
            description:
                'Find detailed maintenance manuals and service instructions for a wide range of electric vehicle models.',
            selected: selectedMode === MODES.REPAIR,
            onSelect: () => onSelectHandler(MODES.REPAIR),
        },
        {
            id: MODES.TRAINING,
            icon: (
                <TrainingSvg
                    className='h-16 w-16 md:h-24 md:w-24'
                    pathProps={{
                        fill:
                            selectedMode === MODES.TRAINING
                                ? '#FFFFFF'
                                : '#222222',
                    }}
                />
            ),
            title: 'Training',
            description:
                'Explore instructional materials and resources designed for educating and training on electric vehicle features and service',
            selected: selectedMode === MODES.TRAINING,
            onSelect: () => onSelectHandler(MODES.TRAINING),
        },
    ]

    return (
        <>
            {myEqrModes.map(mode => (
                <ModeCard
                    key={mode.id}
                    Icon={mode.icon}
                    title={mode.title}
                    description={mode.description}
                    selected={mode.selected}
                    onSelect={mode.onSelect}
                />
            ))}
        </>
    )
}

export default Mode
