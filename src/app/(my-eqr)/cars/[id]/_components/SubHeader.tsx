'use client'
import { FavouriteSvg, RescueSvg, TrainingSvg } from '@/components/svgs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
    FILE_TYPE,
    LOCAL_STORAGE,
    STRAPI,
    SUB_HEADER_HEIGHT,
} from '@/constants'
import React, { useEffect, useMemo, useState } from 'react'
import {
    ChevronDown,
    CornerUpLeft,
    DatabaseZap,
    Download,
    Link as LinkIcon,
} from 'lucide-react'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import BackButton from '@/app/_components/BackButton'
import { useDataStore, useFilterStore, useModeStore } from '@/store'
import { MODES } from '@/constants'
import { Car, Cars } from '@/types'
import { useFileStore } from '../_stores/FileStore'
import { userAgent } from 'next/server'
import { getFile } from '@/actions'
import { generateQueryString } from '@/lib/utils'

interface SubHeaderProps {
    car?: Car
}
const SubHeader = ({ car }: SubHeaderProps) => {
    const { activeMode } = useModeStore()
    const {
        offlineCars,
        carRescueSheets,
        addOfflineCars,
        updateOfflineCars,
        updateRescueSheets,
        removeRescueSheets,
    } = useDataStore()
    const { filters } = useFilterStore()
    const { fileType, updateActiveFileType } = useFileStore()
    const [isFavourited, setIsFavourited] = useState(false)
    console.log('offlineCars', { offlineCars, car, carRescueSheets })

    // =============================================================================================
    //                                      EFFECTS
    // =============================================================================================
    useEffect(() => {
        const favouritedCars: string[] = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE.FAVOURITED_CARS) || '[]'
        )
        setIsFavourited(favouritedCars.includes(car?.id || ''))
    }, [car?.id])

    useEffect(() => {
        switch (activeMode) {
            case MODES.RESCUE: {
                updateActiveFileType(FILE_TYPE.RESCUE_MANUAL)
                break
            }
            case MODES.REPAIR: {
                updateActiveFileType(FILE_TYPE.USER_MANUAL)
                break
            }
        }
    }, [activeMode, updateActiveFileType])

    const availableOffline = useMemo(() => {
        return (
            fileType &&
            fileType === FILE_TYPE.RESCUE_MANUAL &&
            offlineCars &&
            offlineCars.some(currentCar => currentCar.id === car?.id)
        )
    }, [car?.id, fileType, offlineCars])

    const [originalLink, fileUrl, fileName] = useMemo(() => {
        switch (fileType) {
            case FILE_TYPE.RESCUE_MANUAL: {
                return [
                    car?.rescueManual?.originalLink,
                    car?.rescueManual?.rescueSheet?.url,
                    `${car?.name} - Rescue Sheet.pdf`,
                ]
            }
            case FILE_TYPE.USER_MANUAL: {
                return [
                    car?.userManual?.originalLink,
                    car?.userManual?.userManual?.url,
                    `${car?.name} - User Manual.pdf`,
                ]
            }
        }
    }, [
        car?.name,
        car?.rescueManual?.originalLink,
        car?.rescueManual?.rescueSheet?.url,
        car?.userManual?.originalLink,
        car?.userManual?.userManual?.url,
        fileType,
    ])

    // =============================================================================================
    //                                      HANDLERS
    // =============================================================================================

    const toggleFavourite = () => {
        const favouritedCars: string[] = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE.FAVOURITED_CARS) || '[]'
        )
        favouritedCars.includes(car?.id!)
            ? setIsFavourited(() => {
                  const updatedFavs = favouritedCars.filter(
                      id => id !== car?.id
                  )
                  localStorage.setItem(
                      LOCAL_STORAGE.FAVOURITED_CARS,
                      JSON.stringify(updatedFavs)
                  )
                  return false
              })
            : setIsFavourited(() => {
                  const updatedFavs = [...favouritedCars, car?.id!]
                  localStorage.setItem(
                      LOCAL_STORAGE.FAVOURITED_CARS,
                      JSON.stringify(updatedFavs)
                  )
                  return true
              })
    }

    const downloadFile = async () => {
        const response = await fetch(`${STRAPI}${fileUrl}`)

        if (response.status !== 200) {
            console.error(response.status, response.statusText)
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        link.click()
    }

    const openLink = async () => {
        const userAgent = navigator.userAgent
        const isIos = userAgent.match(/iPhone|iPad|iPod|Macintosh/i)
        const isFileUrl =
            /\.pdf$/i.test(originalLink!) ||
            originalLink!.toLowerCase().includes('pdf') ||
            originalLink!.toLowerCase().includes('docs') ||
            originalLink!.toLowerCase().includes('viewer')
        originalLink!.toLowerCase().includes('upload')

        if (isFileUrl && !isIos) {
            const { data: url } = await getFile(originalLink!)

            const viewerUrl = `/pdfjs-4.0.379-dist/web/viewer.html?file=${url}`
            // const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${url}`
            window.open(viewerUrl, '_blank')
        } else {
            const link = document.createElement('a')
            link.href = originalLink!
            link.target = '_blank'
            link.click()
        }
    }

    const addRescueSheetForOffline = async () => {
        const response = await fetch(`${STRAPI}${fileUrl}`)
        if (!response.ok) {
            throw new Error('Failed to download rescue sheet')
        }

        // const blob = await response.blob()
        // const url = URL.createObjectURL(blob)
        addOfflineCars([car] as Cars)
        caches.open('rescue-sheet-cache').then(function (cache) {
            // Use the add method to fetch and cache the PDF
            console.log('${STRAPI}${fileUrl}', `${STRAPI}${fileUrl}`)
            cache
                .add(
                    `/pdfjs-4.0.379-dist/web/viewer.html?file=${STRAPI}${fileUrl}`
                )
                .then(function () {
                    console.log(`PDF ${car?.name} saved to cache!`)
                })
                .catch(function (error) {
                    // Handle any errors
                    console.error('Failed to save PDF to cache:', error)
                })
        })
        // updateRescueSheets({ [`${car?.id!}`]: url })
    }

    const removeRescueSheetForOffline = () => {
        updateOfflineCars(
            offlineCars?.filter(currentCar => currentCar.id !== car?.id) || []
        )
        caches.open('rescue-sheet-cache').then(function (cache) {
            // Use the delete method to remove the PDF
            cache
                .delete(`${STRAPI}${fileUrl}`)
                .then(function (response) {
                    if (response) {
                        // if true, deletion was successful
                        console.log(`PDF ${car?.name} deleted from cache!`)
                    } else {
                        // The file was not found in the cache
                        console.log('PDF not found in cache.')
                    }
                })
                .catch(function (error) {
                    // Handle any errors that occur during the delete process
                    console.error('Failed to remove PDF from cache:', error)
                })
        })
        // removeRescueSheets(car?.id!)
    }

    return (
        <div
            className={`sticky flex w-full flex-row items-center justify-between px-2 shadow-md md:px-2`}
            style={{ height: SUB_HEADER_HEIGHT + 'px' }}
        >
            <div className='flex w-3/6 flex-row flex-nowrap items-center md:w-4/6'>
                <div className='cursor-pointer'>
                    <BackButton
                        color='#FF385C'
                        className='mr-2 md:mr-4'
                        size={26}
                        strokeWidth={3}
                        returnRoute={`/cars?${generateQueryString(filters)}`}
                    />
                </div>
                <div className='overflow-hidden text-ellipsis whitespace-nowrap'>
                    <span className=' text-xl font-bold'>{car?.name}</span>
                </div>
            </div>
            <div className='flex w-3/6 flex-row items-center justify-end gap-2 md:w-2/6 md:gap-4'>
                <FavouriteSvg
                    className='hidden h-6 w-6 cursor-pointer md:inline md:h-7 md:w-7'
                    pathProps={{
                        fill: isFavourited ? '#FF385C' : 'rgb(148 163 184)',
                    }}
                    onClick={() => toggleFavourite()}
                />
                <div className='flex flex-row items-center'>
                    <Button
                        className='rounded-none rounded-l-md bg-primaryColor px-3 font-bold'
                        onClick={downloadFile}
                        disabled={!fileUrl}
                    >
                        <Download className='mr-2' size={20} />
                        Download as PDF
                    </Button>
                    <Separator orientation='vertical' className='w-[2px]' />
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex items-center'>
                            <div className='inline-flex h-9 items-center justify-center whitespace-nowrap rounded-none rounded-r-md bg-primaryColor px-2 py-2 text-sm font-medium text-slate-50 shadow transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300'>
                                <ChevronDown />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='mr-2 md:mr-4'>
                            {fileType === FILE_TYPE.RESCUE_MANUAL &&
                            !availableOffline ? (
                                <DropdownMenuItem
                                    onClick={async () =>
                                        await addRescueSheetForOffline()
                                    }
                                >
                                    <DatabaseZap
                                        className='mr-3'
                                        size={22}
                                        color='rgb(148 163 184)'
                                    />
                                    Enable Offline Access
                                </DropdownMenuItem>
                            ) : fileType === FILE_TYPE.RESCUE_MANUAL &&
                              availableOffline ? (
                                <DropdownMenuItem
                                    onClick={() =>
                                        removeRescueSheetForOffline()
                                    }
                                >
                                    <DatabaseZap
                                        className='mr-3'
                                        size={22}
                                        color='rgb(148 163 184)'
                                    />
                                    Disable Offline Access
                                </DropdownMenuItem>
                            ) : null}
                            {originalLink && (
                                <DropdownMenuItem
                                    // onClick={openLink}
                                    onClick={async () => await openLink()}
                                >
                                    <LinkIcon
                                        className='mr-3'
                                        size={22}
                                        color='rgb(148 163 184)'
                                    />
                                    Open Original
                                </DropdownMenuItem>
                            )}
                            {activeMode === MODES.TRAINING &&
                                fileType === FILE_TYPE.RESCUE_MANUAL && (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            updateActiveFileType(
                                                FILE_TYPE.USER_MANUAL
                                            )
                                        }
                                    >
                                        <TrainingSvg
                                            className='mr-3 h-[22px] w-[22px]'
                                            pathProps={{
                                                fill: 'rgb(148 163 184)',
                                            }}
                                        />
                                        Open User Manual
                                    </DropdownMenuItem>
                                )}
                            {activeMode === MODES.TRAINING &&
                                fileType === FILE_TYPE.USER_MANUAL && (
                                    <DropdownMenuItem
                                        onClick={() =>
                                            updateActiveFileType(
                                                FILE_TYPE.RESCUE_MANUAL
                                            )
                                        }
                                    >
                                        <RescueSvg
                                            className='mr-3 h-[22px] w-[22px]'
                                            pathProps={{
                                                fill: 'rgb(148 163 184)',
                                            }}
                                        />
                                        Open Rescue Sheet
                                    </DropdownMenuItem>
                                )}

                            <DropdownMenuItem
                                className='block md:hidden'
                                onClick={() => toggleFavourite()}
                            >
                                <FavouriteSvg
                                    className='mr-3 inline h-[22px] w-[22px] md:h-8 md:w-8'
                                    pathProps={{
                                        fill: isFavourited
                                            ? '#FF385C'
                                            : 'rgb(148 163 184)',
                                    }}
                                />
                                {isFavourited ? 'Unfavourite' : 'Favourite'}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default SubHeader
