'use client'
import { FILE_TYPE, MODES, STRAPI } from '@/constants'
import { useLayoutStore, useModeStore } from '@/store'
import { Car } from '@/types'
import React, { useMemo, useTransition } from 'react'
import { useFileStore } from '../_stores/FileStore'

interface PdfViewerProps {
    car?: Car
}
const PdfViewer = ({ car }: PdfViewerProps) => {
    const { contentOffset, subHeaderHeight } = useLayoutStore()
    const { fileType } = useFileStore()

    const fileUrl = useMemo(() => {
        switch (fileType) {
            case FILE_TYPE.RESCUE_MANUAL: {
                return car?.rescueManual?.rescueSheet?.url
            }
            case FILE_TYPE.USER_MANUAL: {
                return car?.userManual?.userManual?.url
            }
        }
    }, [
        car?.rescueManual?.rescueSheet?.url,
        car?.userManual?.userManual?.url,
        fileType,
    ])

    return (
        <div
            className='relative flex w-full'
            style={{
                height: `calc(100vh - ${subHeaderHeight}rem - ${contentOffset}rem) !important`,
            }}
        >
            <iframe
                // src='https://rk.mb-qr.com/media/pdf/177.185/Mercedes-Benz_A-Class_250e_Sedan_2023_4d_Hybrid_EN_177.185v1.0.pdf'
                // src={`/pdfjs-4.0.379-dist/web/viewer.html?file=https://8347-2001-e68-541a-caf5-c430-c331-2b81-c4be.ngrok-free.app/uploads/mercedes_a_class_saloon_2022_march_v177_mbux_owners_manual_01_02c3560330.pdf`}
                // src={`https://view.officeapps.live.com/op/embed.aspx?src=[https://www.dickinson.edu/download/downloads/id/1076/sample_powerpoint_slides.pptx]`}
                // src={`https://view.officeapps.live.com/op/embed.aspx?src=[http://192.168.0.02:1337/uploads/Dickinson_Sample_Slides_969d7fd10d.pptx]`}
                // src={`/pdfjs-4.0.379-dist/web/viewer.html?file=http://172.20.10.11:1337/uploads/Model_3_Emergency_Response_Guide_en_a8e5743c59.pdf`}
                src={`/pdfjs-4.0.379-dist/web/viewer.html?file=${STRAPI}${fileUrl}`}
                // src={`/pdfjs-4.0.379-dist/web/viewer.html?file=${STRAPI}${fileUrl}`}
                // src={`/pdfjs-4.0.379-dist/web/viewer.html?file=http://192.168.0.02:1337/uploads/Model_3_Emergency_Response_Guide_en_a8e5743c59.pdf`}
                // src={`/pdfjs-4.0.379-dist/web/viewer.html?file=http://192.168.0.14:1337/uploads/Mercedes_Benz_A_Class_250e_Sedan_2023_4d_Hybrid_EN_177_185v1_0_eb5cf44383.pdf`}
                style={{
                    width: '100%',
                    height: `calc(100vh - ${contentOffset}rem - ${subHeaderHeight}px)`,
                }}
            />
            {fileUrl === undefined && (
                <div className='absolute flex h-full w-full items-center justify-center text-xl text-white'>
                    Document is not available...
                </div>
            )}
        </div>
    )
}

export default PdfViewer
