"use client"
import React, { FC } from 'react'
import { cookies } from 'next/headers'
import { COOKIE_NAME, routes } from '@/constants'
import { redirect } from 'next/navigation'
import axios from 'axios'
import SettingsForm from './components/settings-form'
import { useRequireAuth } from '../hooks/useAuth'

const SettingPage = () => {
useRequireAuth()
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm />
      </div>
    </div>
  )
}

export default SettingPage;
