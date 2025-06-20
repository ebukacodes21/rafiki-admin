import React, { useState } from 'react';

const DiarySettings = () => {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [outlookConnected, setOutlookConnected] = useState(false);
  const [syncAvailability, setSyncAvailability] = useState(true);

  const toggleGoogle = () => setGoogleConnected(prev => !prev);
  const toggleOutlook = () => setOutlookConnected(prev => !prev);
  const toggleSync = () => setSyncAvailability(prev => !prev);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <h2 className="text-xl font-semibold mb-6">Diary Settings</h2>

      {/* Calendar Connections */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium mb-2">Connect Calendars</h3>
        <p className="text-sm text-gray-500 mt-1">Set which calendars we use to check for court dates and appointments.</p>

        {/* Google */}
        <div className="flex items-center justify-between bg-white border rounded-md px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={"/meet.png"} alt="Google" className="w-6 h-6" />
            <span className="text-sm font-medium">Google Calendar</span>
          </div>
          <button
            onClick={toggleGoogle}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full ${
              googleConnected
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {googleConnected ? 'Connected' : 'Connect'}
          </button>
        </div>

        {/* Outlook */}
        <div className="flex items-center justify-between bg-white border rounded-md px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={"/outlook.png"} alt="Outlook" className="w-6 h-6" />
            <span className="text-sm font-medium">Outlook Calendar</span>
          </div>
          <button
            onClick={toggleOutlook}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full ${
              outlookConnected
                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            }`}
          >
            {outlookConnected ? 'Connected' : 'Connect'}
          </button>
        </div>
      </div>

      {/* Availability Sync */}
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-2">Availability</h3>
        <div className="flex items-center gap-3">
          <label htmlFor="syncToggle" className="text-sm text-gray-500 mt-1">
            Sync availability with connected calendars
          </label>
          <button
            id="syncToggle"
            onClick={toggleSync}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              syncAvailability ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                syncAvailability ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiarySettings;