'use client'
import React, {
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    MouseEventHandler,
} from 'react'
import { SearchSvg, FavouriteSvg, HomeSvg } from '@/components/svgs'
import SearchDrawer from './SearchDrawer'
import { cn } from '@/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useLayoutStore } from '@/store/LayoutStore'
import { useMediaQuery } from '@uidotdev/usehooks'
import { BOTTOM_HEIGHT } from '@/constants'
import { useFilterStore } from '@/store'
import { generateQueryString } from '@/lib/utils'

interface BottomNavBarProps {}
const BottomNavBar = ({}: BottomNavBarProps) => {
    const homeRef = useRef<HTMLDivElement>(null)
    const favRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const isLg = useMediaQuery('only screen and (min-width: 1024px)')
    const [indicatorLeft, setIndicatorLeft] = useState(0)
    const [indicatorWidth, setIndicatorWidth] = useState(0)
    const { bottomNavHeight, updateBottomNavHeight } = useLayoutStore()
    const { filters, updateFavouriteFilter } = useFilterStore()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useLayoutEffect(() => {
        setIndicatorLeft(homeRef.current?.offsetLeft || 0)
        setIndicatorWidth(homeRef.current?.offsetWidth || 0)
    }, [])

    useLayoutEffect(() => {
        if (searchParams.get('favourite') === 'true') {
            setIndicatorLeft(favRef.current?.offsetLeft || 0)
        }
    }, [searchParams])

    useLayoutEffect(() => {
        if (isLg) {
            updateBottomNavHeight(0)
        } else {
            updateBottomNavHeight(BOTTOM_HEIGHT)
        }
    }, [isLg, updateBottomNavHeight])

    const changeIndicator: MouseEventHandler<HTMLDivElement> = e => {
        setIndicatorLeft(e.currentTarget.offsetLeft || 0)
        router.replace('/home')
        sessionStorage.clear()
        router.refresh()
    }

    const onFavouriteClick = () => {
        if (!searchParams.get('favourite')) {
            updateFavouriteFilter(true)
            const updatedFilter = {
                ...filters,
                favouriteEnabled: true,
            }
            const queryString = generateQueryString(updatedFilter)
            router.push(`/cars?${queryString}`)
        }
    }

    return (
        <div
            className={`sticky bottom-0 z-10 w-full bg-white p-4 shadow-bottom-nav lg:hidden`}
            style={{ height: `${bottomNavHeight}rem` }}
        >
            <div
                className={cn(
                    'transition duration-300 ease-out',
                    `absolute top-0 h-1 rounded-full bg-primaryColor`
                )}
                style={{
                    width: `${indicatorWidth}px`,
                    transform: `translateX(calc(${indicatorLeft}px - 16px))`,
                }}
            ></div>
            <div className='flex h-full w-full flex-row items-center justify-around'>
                <div
                    ref={homeRef}
                    data-active='false'
                    className='flex items-center justify-center'
                    onClick={changeIndicator}
                >
                    <HomeSvg className='h-10 w-10 md:h-10 md:w-10' />
                </div>
                <SearchDrawer setIndicatorLeft={setIndicatorLeft} />
                <div
                    ref={favRef}
                    onClick={onFavouriteClick}
                    className='flex items-center justify-center'
                >
                    <FavouriteSvg className='h-10 w-10 md:h-10 md:w-10' />
                </div>
            </div>
        </div>
    )
}

export default BottomNavBar
