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
import { useFilterStore, useModeStore } from '@/store'
import { MODES } from '@/constants'
import { Car } from '@/types'
import { useFileStore } from '../_stores/FileStore'

interface SubHeaderProps {
    car?: Car
}
const SubHeader = ({ car }: SubHeaderProps) => {
    const { activeMode } = useModeStore()
    const { fileType, updateActiveFileType } = useFileStore()
    const [isFavourited, setIsFavourited] = useState(false)

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

    const openLink = () => {
        const link = document.createElement('a')
        link.href = originalLink!
        link.download = fileName
        link.target = '_blank'
        link.click()
    }

    return (
        <div
            className={`sticky flex w-full flex-row items-center justify-between px-2 shadow-md md:px-2`}
            style={{ height: SUB_HEADER_HEIGHT + 'px' }}
        >
            <div className='flex w-3/6 flex-row flex-nowrap items-center md:w-4/6'>
                <div>
                    <BackButton
                        color='#FF385C'
                        className='mr-2 md:mr-4'
                        size={26}
                        strokeWidth={3}
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
                            <DropdownMenuItem>
                                <DatabaseZap
                                    className='mr-3'
                                    size={22}
                                    color='rgb(148 163 184)'
                                />
                                Make available offline
                            </DropdownMenuItem>
                            {originalLink && (
                                <DropdownMenuItem onClick={openLink}>
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
