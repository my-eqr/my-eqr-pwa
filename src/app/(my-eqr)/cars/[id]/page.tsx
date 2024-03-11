import React from 'react'
import SubHeader from './_components/SubHeader'
import { wait } from '@/lib/utils'
import PdfViewer from './_components/PdfViewer'
import { getCar } from '@/actions'

const CarDetailPage = async ({
    params: { id },
}: {
    params: { id: string }
}) => {
    const { data, status } = await getCar(id)

    if (status !== 200) {
        throw new Error('Failed to fetch cars')
    }

    // await wait(5000)
    return (
        <div className='flex h-full flex-col overflow-y-hidden'>
            <SubHeader car={data} />
            <PdfViewer car={data} />
        </div>
    )
}

export default CarDetailPage
