import React, { useState, useCallback } from 'react'
import { Link, Outlet } from 'react-router-dom'
import PlayerContext from 'contexts/PlayerContext'
import { getBracketKey } from 'models/Bracket'
import BottomNavigation from '@mui/material/BottomNavigation'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import AccountCircle from '@mui/icons-material/AccountCircle'
import SportsTennis from '@mui/icons-material/SportsTennis'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import { usePlayerState, usePlayerDispatch } from 'contexts/PlayerContext'

import type Bracket from 'models/Bracket'

const Layout: React.FC = () => {
  const theme = useTheme()
  const now = new Date()
  const [bracket, setBracket] = useState<Bracket>({
    date: now,
    key: getBracketKey(now),
  })

  const nextBracket = useCallback(() => {
    const date = new Date(bracket.date)
    date.setDate(date.getDate() + 1)
    setBracket({
      date,
      key: getBracketKey(date),
    })
  }, [setBracket, bracket])

  const prevBracket = useCallback(() => {
    const date = new Date(bracket.date)
    date.setDate(date.getDate() - 1)
    setBracket({
      date,
      key: getBracketKey(date),
    })
  }, [setBracket, bracket])

  return (
    <Box sx={{ pb: 7 }}>
      <Paper
        square
        sx={{
          position: 'fixed',
          right: 0,
          left: 0,
          p: 1,
          display: 'flex',
          alignItems: 'center',
        }}
        elevation={0}
      >
        <Button size="small" onClick={prevBracket} sx={{ flexGrow: 1 }}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </Button>
        <Typography component="strong" sx={{ px: 1 }}>
          {bracket.key}
        </Typography>
        <Button size="small" onClick={nextBracket} sx={{ flexGrow: 1 }}>
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      </Paper>
      <Box sx={{ pt: 4 }}>
        <PlayerContext bracket={bracket}>
          <Outlet />
        </PlayerContext>
      </Box>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            value="/profiles"
            label="Profiles"
            icon={<AccountCircle />}
            component={Link}
            to="/profiles"
          />
          <BottomNavigationAction
            value="/bracket"
            label="Bracket"
            icon={<SportsTennis />}
            component={Link}
            to="/bracket"
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default Layout
