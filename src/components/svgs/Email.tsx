import { SVGProps } from 'react'

type EmailProps = SVGProps<SVGSVGElement> & {
    pathProps?: SVGProps<SVGPathElement>
}
const Email = ({ pathProps, ...props }: EmailProps) => {
    return (
        <svg
            width='48'
            height='38'
            viewBox='0 0 48 38'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
        >
            <path
                d='M42.6667 0.333344H5.33335C2.76669 0.333344 0.69002 2.43334 0.69002 5.00001L0.666687 33C0.666687 35.5667 2.76669 37.6667 5.33335 37.6667H42.6667C45.2333 37.6667 47.3333 35.5667 47.3333 33V5.00001C47.3333 2.43334 45.2333 0.333344 42.6667 0.333344ZM42.6667 9.66668L24 21.3333L5.33335 9.66668V5.00001L24 16.6667L42.6667 5.00001V9.66668Z'
                fill='#FF385C'
                {...pathProps}
            />
        </svg>
    )
}

export default Email
