'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const [apiInfo, setApiInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
        const response = await axios.get(`${apiUrl}/api/info`)
        setApiInfo(response.data)
      } catch (error) {
        console.error('Error fetching API:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Project 580</h1>
        <p className="text-xl mb-4">Full-Stack Application</p>
        <p className="text-lg text-gray-600 mb-8">Frontend + Backend</p>
        
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Backend API Status</h2>
          {loading ? (
            <p>Connecting to backend...</p>
          ) : apiInfo ? (
            <div className="space-y-2">
              <p><strong>Project:</strong> {apiInfo.project}</p>
              <p><strong>Version:</strong> {apiInfo.version}</p>
              <p><strong>Environment:</strong> {apiInfo.environment}</p>
              <p><strong>Backend:</strong> {apiInfo.backend ? 'Connected' : 'Not connected'}</p>
            </div>
          ) : (
            <p className="text-red-600">Unable to connect to backend API</p>
          )}
        </div>
      </div>
    </main>
  )
}