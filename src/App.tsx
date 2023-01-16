import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Loader from 'components/Loader'
import Layout from 'Layout'
import './App.css'

const BracketPage = lazy(() => import('pages/BracketPage'))
const ProfilesPage = lazy(() => import('pages/ProfilesPage'))
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1000,
    },
  },
})

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index path="profiles" element={<ProfilesPage />} />
                <Route path="bracket" element={<BracketPage />} />
                <Route path="/" element={<Navigate to="/profiles" />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </QueryClientProvider>
    </div>
  )
}

export default App
