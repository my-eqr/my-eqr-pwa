import { SVGProps } from 'react'

type FavouriteProps = SVGProps<SVGSVGElement> & {
    pathProps?: SVGProps<SVGPathElement>
}
const Favourite = ({ pathProps, ...props }: FavouriteProps) => {
    return (
        <svg
            width='56'
            height='56'
            viewBox='0 0 56 56'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M28 49.8167L24.6167 46.7367C12.6 35.84 4.66669 28.6533 4.66669 19.8333C4.66669 12.6467 10.3134 7 17.5 7C21.56 7 25.4567 8.89 28 11.8767C30.5434 8.89 34.44 7 38.5 7C45.6867 7 51.3334 12.6467 51.3334 19.8333C51.3334 28.6533 43.4 35.84 31.3834 46.76L28 49.8167Z'
                fill='#FF385C'
                {...pathProps}
            />
        </svg>
    )
}

export default Favourite
