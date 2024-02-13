import React from 'react'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import { BODY_OFFSET, HOME_ROW } from '@/constants'
import { wait } from '@/lib/utils'

const HomePage = async () => {
    const BRANDS = [
        {
            url: '/brands/Mercedes-Benz.png',
            onClick: () => {},
        },
        {
            url: '/brands/BMW.png',
            onClick: () => {},
        },
        {
            url: '/brands/Toyota.png',
            onClick: () => {},
        },
        {
            url: '/brands/Honda.png',
            onClick: () => {},
        },
        {
            url: '/brands/Kia.png',
            onClick: () => {},
        },
        {
            url: '/brands/Hyundai.png',
            onClick: () => {},
        },
        {
            url: '/brands/Mazda.png',
            onClick: () => {},
        },
        {
            url: '/brands/Tesla.png',
            onClick: () => {},
        },
        {
            url: '/brands/Volvo.png',
            onClick: () => {},
        },
        {
            url: '/brands/Mitsubishi.png',
            onClick: () => {},
        },
    ]

    await wait(2000)

    return (
        <div className='grid grid-cols-2 gap-2 p-2 md:gap-4 md:p-4 lg:grid-cols-3'>
            {BRANDS.map(({ url }) => (
                <div
                    key={nanoid()}
                    className={`flex items-center justify-center rounded-lg border border-gray-200 bg-white shadow-md`}
                    style={{
                        height: `calc((100vh - ${BODY_OFFSET}rem - ${HOME_ROW + 1}rem) / ${HOME_ROW})`,
                    }}
                >
                    <div className='relative h-4/6 w-4/6'>
                        <Image
                            src={url}
                            fill={true}
                            className='object-contain'
                            alt='alternative...'
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default HomePage
