import { SVGProps } from 'react'

type HomeProps = SVGProps<SVGSVGElement> & {
    pathProps?: SVGProps<SVGPathElement>
}
const Home = ({ pathProps, ...props }: HomeProps) => {
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
                fillRule='evenodd'
                clipRule='evenodd'
                d='M50.2413 27.034L48.4167 25.5733V49.5833H51.3333C51.7975 49.5833 52.2426 49.7677 52.5708 50.0959C52.8989 50.4241 53.0833 50.8692 53.0833 51.3333C53.0833 51.7975 52.8989 52.2426 52.5708 52.5708C52.2426 52.899 51.7975 53.0833 51.3333 53.0833H4.66666C4.20253 53.0833 3.75741 52.899 3.42922 52.5708C3.10103 52.2426 2.91666 51.7975 2.91666 51.3333C2.91666 50.8692 3.10103 50.4241 3.42922 50.0959C3.75741 49.7677 4.20253 49.5833 4.66666 49.5833H7.58332V25.5733L5.76099 27.034C5.58143 27.1776 5.37535 27.2843 5.15452 27.3483C4.93369 27.4122 4.70244 27.432 4.47396 27.4065C4.24548 27.3811 4.02425 27.3108 3.82291 27.1999C3.62156 27.0889 3.44405 26.9394 3.30049 26.7598C3.15693 26.5803 3.05015 26.3742 2.98624 26.1534C2.92232 25.9325 2.90253 25.7013 2.92799 25.4728C2.95345 25.2443 3.02366 25.0231 3.13461 24.8218C3.24557 24.6204 3.3951 24.4429 3.57466 24.2993L22.533 9.13267C24.0846 7.89102 26.0127 7.21454 28 7.21454C29.9873 7.21454 31.9154 7.89102 33.467 9.13267L52.4253 24.2993C52.608 24.4417 52.7606 24.6189 52.8742 24.8206C52.9879 25.0224 53.0604 25.2446 53.0876 25.4746C53.1147 25.7046 53.0959 25.9377 53.0323 26.1603C52.9687 26.383 52.8616 26.5908 52.7171 26.7718C52.5726 26.9527 52.3936 27.1032 52.1905 27.2145C51.9874 27.3257 51.7642 27.3956 51.534 27.42C51.3037 27.4444 51.0708 27.4228 50.849 27.3565C50.6271 27.2903 50.4205 27.1807 50.2413 27.034ZM28 15.75C26.2982 15.75 24.6661 16.426 23.4627 17.6294C22.2594 18.8328 21.5833 20.4649 21.5833 22.1667C21.5833 23.8685 22.2594 25.5006 23.4627 26.7039C24.6661 27.9073 26.2982 28.5833 28 28.5833C29.7018 28.5833 31.3339 27.9073 32.5373 26.7039C33.7406 25.5006 34.4167 23.8685 34.4167 22.1667C34.4167 20.4649 33.7406 18.8328 32.5373 17.6294C31.3339 16.426 29.7018 15.75 28 15.75ZM32.074 31.0613C31.003 30.9167 29.666 30.9167 28.1143 30.9167H27.8857C26.334 30.9167 24.997 30.9167 23.926 31.0613C22.7803 31.2153 21.679 31.563 20.7877 32.4543C19.8963 33.3457 19.5487 34.447 19.3947 35.5927C19.25 36.6637 19.25 38.0007 19.25 39.5523V49.5833H36.75V39.263C36.75 37.835 36.7407 36.596 36.6053 35.5927C36.4513 34.447 36.1037 33.3457 35.2123 32.4543C34.321 31.563 33.222 31.2153 32.074 31.0613Z'
                fill='#FF385C'
                {...pathProps}
            />
            <g opacity='0.5'>
                <path
                    d='M25.0833 22.1667C25.0833 21.3931 25.3906 20.6513 25.9376 20.1043C26.4846 19.5573 27.2265 19.25 28 19.25C28.7736 19.25 29.5154 19.5573 30.0624 20.1043C30.6094 20.6513 30.9167 21.3931 30.9167 22.1667C30.9167 22.9402 30.6094 23.6821 30.0624 24.2291C29.5154 24.776 28.7736 25.0833 28 25.0833C27.2265 25.0833 26.4846 24.776 25.9376 24.2291C25.3906 23.6821 25.0833 22.9402 25.0833 22.1667Z'
                    fill='#FF385C'
                    {...pathProps}
                />
                <path
                    d='M25.0833 22.1667C25.0833 21.3931 25.3906 20.6513 25.9376 20.1043C26.4846 19.5573 27.2265 19.25 28 19.25C28.7736 19.25 29.5154 19.5573 30.0624 20.1043C30.6094 20.6513 30.9167 21.3931 30.9167 22.1667C30.9167 22.9402 30.6094 23.6821 30.0624 24.2291C29.5154 24.776 28.7736 25.0833 28 25.0833C27.2265 25.0833 26.4846 24.776 25.9376 24.2291C25.3906 23.6821 25.0833 22.9402 25.0833 22.1667Z'
                    fill='#FF385C'
                    {...pathProps}
                />
            </g>
            <path
                opacity='0.5'
                d='M28.1167 30.9167C29.666 30.9167 31.003 30.9167 32.074 31.0613C33.222 31.2153 34.321 31.563 35.2123 32.4543C36.1037 33.3457 36.4513 34.4447 36.6053 35.5927C36.7407 36.596 36.75 37.8327 36.75 39.263V49.5833H19.25V39.55C19.25 38.0007 19.25 36.6637 19.3947 35.5927C19.5487 34.4447 19.8963 33.3457 20.7877 32.4543C21.679 31.563 22.7803 31.2153 23.926 31.0613C24.997 30.9167 26.334 30.9167 27.8857 30.9167H28.1167ZM37.3333 7H43.1667C43.4761 7 43.7728 7.12292 43.9916 7.34171C44.2104 7.5605 44.3333 7.85725 44.3333 8.16667V17.8267L36.1667 11.2933V8.16667C36.1667 7.85725 36.2896 7.5605 36.5084 7.34171C36.7272 7.12292 37.0239 7 37.3333 7Z'
                fill='#FF385C'
                {...pathProps}
            />
        </svg>
    )
}

export default Home
