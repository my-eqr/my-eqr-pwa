import React from 'react'
import BackButton from './_components/BackButton'
import { Card } from '@/components/ui/card'
import { CallSvg, EmailSvg } from '@/components/svgs'

const InfoPage = () => {
    return (
        <div className='flex min-h-full flex-col items-center justify-center gap-8 overflow-y-scroll !overscroll-y-none bg-primaryColor p-6 pb-20 pt-8 md:gap-12'>
            <div className='w-full'>
                <BackButton />
                <div className='grid grid-cols-7'>
                    <div className='col-span-3 justify-self-end text-8xl font-extrabold text-darkGrey md:text-9xl'>
                        My
                    </div>
                    <div className='col-span-4 justify-self-start text-8xl font-extrabold text-white md:text-9xl'>
                        EQR
                    </div>
                    <div className='col-span-4 col-start-4 text-xl text-white md:text-2xl'>
                        Emergency Quick Response
                    </div>
                </div>
            </div>
            <section className='flex w-full flex-col'>
                <div className='mb-2 flex flex-row justify-between px-2 text-2xl font-bold text-white'>
                    <span>About</span>
                    <span>v1.0</span>
                </div>
                <div>
                    <Card className='p-6 text-lg text-slate-600 shadow-xl md:text-xl'>
                        <p className='mb-4'>
                            MyEQR is a dedicated application designed to ensure
                            the safety of emergency responders and drivers by
                            providing crucial information on how to manage
                            accidents involving Battery Electric Vehicles (EVs),
                            Hybrid Electric Vehicles (HEVs), and Plug-In Hybrid
                            Electric Vehicles (PHEVs).
                        </p>
                        <p>
                            This app serves as an essential tool for the
                            Malaysian Rescue Agencies, offering quick access to
                            vehicle-specific emergency procedures to optimize
                            rescue efforts and minimize risk.
                        </p>
                    </Card>
                </div>
            </section>
            <section className='w-full'>
                <div className='mb-4 flex flex-col px-2 text-white'>
                    <span className='text-2xl font-bold'>Contact Us</span>
                    <span className='text-lg leading-6'>
                        You can get in touch with us through below platform. Our
                        team will reach out to you as soon as it would be
                        possible
                    </span>
                </div>
                <div>
                    <Card className='flex flex-row flex-wrap gap-4 p-6 text-xl text-slate-600 shadow-xl md:gap-0'>
                        <div className='w-full font-medium md:mb-4'>
                            Customer Support
                        </div>
                        <div className='flex w-full flex-row items-center justify-start gap-3 md:w-6/12'>
                            <CallSvg className='h-12 w-12' />
                            <div className='pt-1 text-lg font-light leading-4'>
                                Contact Number <br />
                                <span className='text-lg font-bold'>
                                    (+60)16 - 492 4151
                                </span>
                            </div>
                        </div>
                        <div className='flex w-full flex-row items-center justify-start gap-3 md:w-6/12'>
                            <EmailSvg className='h-12 w-12' />
                            <div className='pt-1 text-lg font-light leading-4'>
                                Email Address <br />
                                <span className='text-lg font-bold'>
                                    myeqr.team@gmail.com
                                </span>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    )
}

export default InfoPage
