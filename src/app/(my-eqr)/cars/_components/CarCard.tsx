import { Card } from '@/components/ui/card'
import React from 'react'
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
    spacingOffset: number
    car: NonNullable<Cars>[number]
    isFavourite: boolean
    updateFavouritedCars: (id: string) => void
}
const CarCard = ({
    contentOffset,
    subHeaderHeight,
    rows,
    spacingOffset,
    car,
    isFavourite,
    updateFavouritedCars,
}: CarCardProps) => {
    const router = useRouter()
    return (
        <Card
            style={{
                height: `calc((100vh - ${contentOffset}rem - ${subHeaderHeight}px - ${spacingOffset}rem) / ${rows})`,
            }}
            className='relative grid w-full cursor-pointer grid-rows-11 rounded-none rounded-l-lg rounded-br-lg shadow-lg transition duration-300 ease-out hover:shadow-xl lg:grid-cols-2'
            onClick={() => {
                router.push('/cars/' + car.id)
            }}
        >
            <div className='debug relative row-span-6 flex items-center justify-center lg:row-span-full lg:border-r'>
                <Image
                    src={`${STRAPI}${car?.image?.url}` || ''}
                    fill={true}
                    className='object-contain'
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
            <div className='debug text-md row-span-2 flex items-center overflow-hidden text-ellipsis whitespace-nowrap p-2 pr-36 font-medium md:px-4 md:text-lg lg:row-span-2 lg:text-lg'>
                {car?.name}
            </div>
            <div className='debug row-span-3 flex flex-row flex-wrap content-start gap-x-2 gap-y-1 overflow-y-auto p-2 md:gap-2 md:px-4 lg:row-span-9'>
                <Badge variant={'secondary'} className='h-fit md:px-4'>
                    <Car className='mr-2 ' />
                    {car?.metadata?.bodyType}
                </Badge>
                <Badge variant={'secondary'} className='h-fit md:px-4'>
                    <CircuitBoard className='mr-2' />
                    {car?.metadata?.vehicleType}
                </Badge>
                <Badge variant={'secondary'} className='h-fit md:px-4'>
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
