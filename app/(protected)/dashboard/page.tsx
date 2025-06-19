"use client"
import { selectCurrentUser } from '@/redux/features/auth'
import { useAppSelector } from '@/redux/hooks/useSelectorHook'
import React from 'react'

const DashboardPage = () => {
  const admin = useAppSelector(selectCurrentUser)
  console.log(admin, "dashboard")
  return (
    <div>
      dashboard
    </div>
  )
}

export default DashboardPage
