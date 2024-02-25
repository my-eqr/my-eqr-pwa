import React from 'react'
import Mode from './Mode'
import ContinueButton from './ContinueButton'

const SelectMode = () => {
    return (
        <div className='absolute inset-0 w-full flex-col items-start justify-center overflow-y-scroll overscroll-auto bg-primaryColor px-12 py-12 md:flex'>
            <div className='mb-10 text-8xl font-extrabold text-darkGrey md:text-9xl'>
                My<span className='text-white'>EQR</span>
            </div>
            <div className='flex w-full flex-row items-center justify-between'>
                <div>
                    <div className='flex-grow text-5xl font-extrabold text-white md:text-6xl'>
                        Let&apos;s get started
                    </div>
                    <div className='mt-2 text-3xl font-light leading-10 text-white md:text-[32px]'>
                        Choose one of the mode below to continue
                    </div>
                </div>
                <div
                    className={`mt-14 hidden items-center justify-end lg:flex`}
                >
                    <ContinueButton />
                </div>
            </div>

            <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-6'>
                <Mode isEntry />
            </div>
            <div
                className={`mt-14 flex w-full items-center justify-end lg:hidden`}
            >
                <ContinueButton />
            </div>
        </div>
    )
}

export default SelectMode
