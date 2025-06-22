import React, { FC } from 'react'
import { cookies } from 'next/headers'
import { COOKIE_NAME, routes } from '@/constants'
import { redirect } from 'next/navigation'
import axios from 'axios'
import SettingsForm from './components/settings-form'

type SettingProp = {
  params: any
}

const SettingPage: FC<SettingProp> = async ({ params }) => {

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm />
      </div>
    </div>
  )
}

export default SettingPage
