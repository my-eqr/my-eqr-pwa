import type { Metadata, Viewport } from 'next'
import Head from 'next/head'
import { Inter as FontSans, Roboto_Condensed } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import '@/styles/globals.css'
import { Apollo } from '@/components/wrappers/Apollo'

// const fontSans = FontSans({ subsets: ['cyrillic'], variable: '--font-sans' })
const robotoCondensed = Roboto_Condensed({
    subsets: ['cyrillic'],
    variable: '--font-sans',
})

const APP_NAME = 'MyEQR'
const APP_DEFAULT_TITLE = 'MyEQR'
const APP_TITLE_TEMPLATE = '%s - PWA App'
const APP_DESCRIPTION = 'Malaysia Emergency Quick Response Application'

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    // openGraph: {
    //     type: 'website',
    //     siteName: APP_NAME,
    //     title: {
    //         default: APP_DEFAULT_TITLE,
    //         template: APP_TITLE_TEMPLATE,
    //     },
    //     description: APP_DESCRIPTION,
    // },
    // twitter: {
    //     card: 'summary',
    //     title: {
    //         default: APP_DEFAULT_TITLE,
    //         template: APP_TITLE_TEMPLATE,
    //     },
    //     description: APP_DESCRIPTION,
    // },
}

export const viewport: Viewport = {
    themeColor: '#FF385C',
}
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const HeadMain = () => (
        <Head>
            <meta content='yes' name='apple-mobile-web-app-capable' />
            <meta content='yes' name='mobile-web-app-capable' />
            <link rel='apple-touch-icon' href='touch-icon-iphone.png' />
            <link
                rel='apple-touch-icon'
                sizes='152x152'
                href='touch-icon-ipad.png'
            />
            <link
                rel='apple-touch-icon'
                sizes='180x180'
                href='touch-icon-iphone-retina.png'
            />
            <link
                rel='apple-touch-icon'
                sizes='167x167'
                href='touch-icon-ipad-retina.png'
            />
            <link
                rel='stylesheet'
                href='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf_viewer.min.css'
                integrity='sha512-v7RQDI7qsfFNaXRzzylpsVV7ncQBdyozLze5YNgox/0z4Mc3Ellt2dBd0CbmufeD7IIh5TCJQ8ORAF/KvzVITg=='
                crossOrigin='anonymous'
                referrerPolicy='no-referrer'
            />
        </Head>
    )

    return (
        <html lang='en' className={robotoCondensed.className}>
            <HeadMain />
            <body className='bg-background font-geist-sans font-mono antialiased'>
                <Apollo>{children}</Apollo>
            </body>
        </html>
    )
}
