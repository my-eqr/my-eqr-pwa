import React from 'react'
import { Card } from '@/components/ui/card'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { STRAPI } from '@/constants'
import { Cars } from '@/types'
import { FavouriteSvg } from '@/components/svgs'
import { Badge } from '@/components/ui/badge'
import { Car, CircuitBoard, Warehouse } from 'lucide-react'

interface CarCardProps {
    contentOffset: number
    subHeaderHeight: number
    rows: number
    spacingXOffset: number
    spacingYOffset: number
    car: NonNullable<Cars>[number]
    isFavourite: boolean
    updateFavouritedCars: (id: string) => void
}
const CarCard = ({
    contentOffset,
    subHeaderHeight,
    rows,
    spacingXOffset,
    spacingYOffset,
    car,
    isFavourite,
    updateFavouritedCars,
}: CarCardProps) => {
    const router = useRouter()
    return (
        <Card
            style={{
                height: `calc((100vh - ${contentOffset}rem - ${subHeaderHeight}px - ${spacingYOffset}rem) / ${rows})`,
                // width: `calc((100vw - ${spacingXOffset}rem) / 2)`,
            }}
            className='relative grid w-[calc(50vw-1.5rem-1px)] cursor-pointer grid-rows-2 rounded-none rounded-l-lg rounded-br-lg shadow-lg transition duration-300 ease-out hover:shadow-xl lg:w-[calc(50vw-3.75rem-1px)] lg:grid-cols-2'
            onClick={() => {
                router.push('/cars/' + car.id)
            }}
        >
            <div className='relative row-span-1 flex items-center justify-center lg:row-span-full lg:border-r'>
                <Image
                    src={`${STRAPI}${car?.image?.url}` || ''}
                    fill={true}
                    className='object-contain p-2 pt-4'
                    alt='alternative...'
                    loading='eager'
                />
                <div className='absolute left-0 top-0 ml-1 mt-2 h-8 w-20'>
                    <Image
                        src={`${STRAPI}${car?.brand?.logo?.url}` || ''}
                        fill={true}
                        className='object-contain object-left'
                        alt='alternative...'
                        loading='eager'
                    />
                </div>
                <div
                    className='absolute right-0 top-0 block rounded-bl-lg border-b border-l bg-white p-1 lg:hidden'
                    onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        updateFavouritedCars(car?.id!)
                    }}
                >
                    <FavouriteSvg
                        className='h-6 w-6 md:h-5 md:w-5'
                        pathProps={{
                            fill: isFavourite ? '#FF385C' : 'rgb(148 163 184)',
                        }}
                    />
                </div>
            </div>
            <div className='text-md row-span-1 flex flex-col items-start gap-y-2 overflow-hidden px-2 sm:px-3 sm:pt-4 lg:row-span-full lg:pl-4 lg:pr-8 lg:pt-6 lg:text-lg'>
                <div className='truncate-2-lines text-lg font-medium sm:text-xl '>
                    {car?.name}
                    {/* Mercedes-Benz EQA 300 4MATIC Model H243 SUV, as of 2021 */}
                </div>
                <div className='flex flex-row flex-wrap items-start gap-1 sm:gap-2'>
                    <Badge variant={'secondary'} className='md:px-4'>
                        <Car className='mr-2 ' />
                        {car?.metadata?.bodyType}
                    </Badge>
                    <Badge variant={'secondary'} className='md:px-4'>
                        <CircuitBoard className='mr-2' />
                        {car?.metadata?.vehicleType}
                    </Badge>
                    <Badge variant={'secondary'} className='md:px-4'>
                        <Warehouse className='mr-2' />
                        {car?.metadata?.modelYear?.end ? (
                            <span>
                                {car?.metadata?.modelYear?.start} -{' '}
                                {car?.metadata?.modelYear?.end}
                            </span>
                        ) : (
                            <span>Since {car?.metadata?.modelYear?.start}</span>
                        )}
                    </Badge>
                </div>
            </div>
            <div
                className='absolute right-0 top-0 hidden rounded-bl-lg border-b border-l bg-white p-1 md:block'
                onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    updateFavouritedCars(car?.id!)
                }}
            >
                <FavouriteSvg
                    className='h-6 w-6 md:h-5 md:w-5'
                    pathProps={{
                        fill: isFavourite ? '#FF385C' : 'rgb(148 163 184)',
                    }}
                />
            </div>
        </Card>
    )
}

export default CarCard
