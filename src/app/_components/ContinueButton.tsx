'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { EnterIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import { useModeStore } from '@/store'
import { COOKIES } from '@/types'

const ContinueButton = () => {
    const router = useRouter()
    const { activeMode } = useModeStore()

    const onSelectModeHandler = async () => {
        sessionStorage.setItem(COOKIES.ACTIVE_MODE, activeMode!)
        router.refresh()
    }
    return (
        <Button
            type='submit'
            className='h-14 w-3/6 rounded-xl px-6 text-lg font-bold shadow-lg md:w-48'
            onClick={onSelectModeHandler}
        >
            Continue
            <EnterIcon className='ml-auto h-6 w-6' />
        </Button>
    )
}

export default ContinueButton
