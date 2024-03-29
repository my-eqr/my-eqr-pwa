import { SVGProps } from 'react'

type FavouriteProps = SVGProps<SVGSVGElement> & {
    pathProps?: SVGProps<SVGPathElement>
}
const Favourite = ({ pathProps, ...props }: FavouriteProps) => {
    return (
        <svg
            width='48'
            height='48'
            viewBox='0 0 48 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M36.062 33.234L44.628 41.798L41.798 44.628L33.234 36.062C30.0475 38.6164 26.084 40.0058 22 40C12.064 40 4 31.936 4 22C4 12.064 12.064 4 22 4C31.936 4 40 12.064 40 22C40.0058 26.084 38.6164 30.0475 36.062 33.234ZM32.05 31.75C34.5882 29.1398 36.0057 25.6409 36 22C36 14.266 29.734 8 22 8C14.266 8 8 14.266 8 22C8 29.734 14.266 36 22 36C25.6409 36.0057 29.1398 34.5882 31.75 32.05L32.05 31.75Z'
                fill='white'
                {...pathProps}
            />
        </svg>
    )
}

export default Favourite
