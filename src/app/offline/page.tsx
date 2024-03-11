'use client'
import { SESSION_STORAGE } from '@/constants'
import { useDataStore } from '@/store'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import CarList from './_components/CarList'

const OfflinePage = () => {
    const { brands, offlineCars, carRescueSheets } = useDataStore()
    // const [fileUrl, setFileUrl] = useState('')

    // useEffect(() => {
    //     caches.open('rescue-sheet-cache').then(function (cache) {
    //         cache
    //             .match(
    //                 'http://192.168.0.2:1337/uploads/Model_3_Emergency_Response_Guide_en_a8e5743c59.pdf'
    //             )
    //             .then(function (response) {
    //                 console.log('response', response)
    //                 if (response) {
    //                     response.blob().then(blob => {
    //                         const url = URL.createObjectURL(blob)
    //                         const a = document.createElement('a')
    //                         a.href = url
    //                         a.download = 'downloaded.pdf' // Specify the download file name
    //                         document.body.appendChild(a)
    //                         a.click()
    //                         document.body.removeChild(a)
    //                         URL.revokeObjectURL(url) // Clean up the URL object
    //                     })
    //                 }
    //                 // if (!response) {
    //                 //     console.error('PDF not found in cache.')
    //                 //     return
    //                 // }
    //                 // response.blob().then(function (pdfBlob) {
    //                 //     const pdfUrl = URL.createObjectURL(pdfBlob)

    //                 //     // Proceed to display the PDF using PDF.js in an iframe
    //                 //     const viewerUrl = `/pdfjs-4.0.379-dist/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`

    //                 //     // Set the iframe's source to the viewer URL
    //                 //     setFileUrl(viewerUrl)
    //                 // })
    //             })
    //     })
    // }, [])

    // const fileUrl = useMemo(() => {
    //     console.log('carRescueSheets', carRescueSheets)
    //     return carRescueSheets['1']
    // }, [carRescueSheets])

    console.log('offline page brands', {
        brands,
        offlineCars,
        carRescueSheets,
        // fileUrl,
    })
    // const [isOnline, setIsOnline] = useState('testla')

    // useEffect(() => {
    //     setIsOnline('buto pak hang')
    // }, [])
    return (
        <div className='debug fixed inset-0'>
            <CarList cars={offlineCars} />
            {/* <Link href={'/offline/cars'}>Wiiieieie</Link> */}
            {/* <iframe
                id='pdfIframe'
                src={fileUrl}
                width='100%'
                height='600px'ß
            ></iframe> */}
            {/* <iframe
                src={`/pdfjs-4.0.379-dist/web/viewer.html?file=http://192.168.0.2:1337/uploads/Mercedes_Benz_S_Class_580e_Sedan_2021_4d_Hybrid_EN_223_068v2_1_333d3a9b37.pdf`}
                style={{
                    width: '100%',
                    height: `100vh`,
                }}
            /> */}
        </div>
    )
}

export default OfflinePage
