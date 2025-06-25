"use client"
import React from 'react'
import SettingsClient from './components/client'
import { useRequireAuth } from '../hooks/useAuth'

const SettingsPage = () => {
  useRequireAuth()
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsClient />
      </div>
    </div>
  );
};

export default SettingsPage;
