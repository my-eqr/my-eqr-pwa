import React from 'react'
import { MODES } from '@/constants'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
interface ModeCardProps {
    Icon: JSX.Element
    title: string
    description: string
    selected: boolean
    onSelect: () => void
}

const ModeCard = ({
    Icon,
    title,
    description,
    selected,
    onSelect,
}: ModeCardProps) => (
    <Card
        className={`p-4 shadow-xl md:p-5 ${selected ? 'border-4 border-solid border-white bg-darkGrey' : 'border-4 border-solid border-transparent bg-white'}`}
        onClick={() => onSelect()}
        onDoubleClick={() => onSelect()}
    >
        <CardHeader className='p-0 py-2'>
            <div className='flex items-center justify-center'>{Icon}</div>
            <CardTitle
                className={`text-xl font-bold md:text-3xl ${selected ? 'text-white' : 'text-darkGrey'}`}
            >
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
            <CardDescription
                className={`text-md !leading-6 md:text-lg ${selected ? 'text-white' : ''}`}
            >
                {description}
            </CardDescription>
        </CardContent>
    </Card>
)

export default ModeCard
