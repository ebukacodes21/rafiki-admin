import { SignupForm } from '@/components/auth/signup'
import { routes } from '@/constants'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-white to-gray-900 flex items-center justify-center">
       <Link href={routes.HOME} className="absolute top-6 left-6 text-3xl font-bold text-gray-900">
        Rafiki
      </Link>

      <SignupForm />
    </div>
  )
}

export default page