'use client'
import React from 'react'
import { useOrientation } from '@uidotdev/usehooks'
import { ORIENTATION } from '@/types'
import Mode from './Mode'
import ContinueButton from './ContinueButton'

const SelectMode = () => {
    const { type } = useOrientation()

    let SHOW_IN_LANSCAPE = 'flex'
    let SHOW_IN_POTRAIT = 'hidden'
    if (type === ORIENTATION.PORTRAIT) {
        SHOW_IN_LANSCAPE = 'hidden'
        SHOW_IN_POTRAIT = 'flex'
    }

    return (
        <main className=' flex min-h-screen w-full flex-col items-start justify-center overflow-auto bg-primaryColor p-12'>
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
                    className={`mt-14 items-center justify-end ${SHOW_IN_LANSCAPE}`}
                >
                    <ContinueButton />
                </div>
            </div>

            <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
                <Mode />
            </div>
            <div
                className={`mt-14 w-full items-center justify-end ${SHOW_IN_POTRAIT}`}
            >
                <ContinueButton />
            </div>
        </main>
    )
}

export default SelectMode
