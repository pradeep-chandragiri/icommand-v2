import React from 'react'
import { Routes, Route } from 'react-router-dom'

// pages
import NotFound from '../pages/NotFound/NotFound.jsx'
import Welcome from '../pages/Welcome/Welcome.jsx'
import Chat from '../pages/Chat/Chat.jsx'
import Home from '../pages/Home/Home.jsx'
import HomeEmptyState from '../components/HomeEmptyState.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const AppRoutes = () => {
  return (
    <Routes>

      {/* Welcome Page */}
      <Route path="/" element={<Welcome />} />

      {/* Home Page */}
      <Route element={<ProtectedRoute />}>

        <Route element={<Home />}>
          <Route path="/chat" element={<HomeEmptyState />} />
          <Route path="/chat/:chatid" element={<Chat />} />
        </Route>
        
      </Route>

      {/* Not found */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default AppRoutes
