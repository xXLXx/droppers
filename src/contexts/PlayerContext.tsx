import React, { createContext, useCallback, useContext, useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Bracket from 'models/Bracket'
import fetcher from 'lib/fetcher'

import type Profile from 'models/Profile'

const initialState = {
  players: [],
}

interface Props extends React.PropsWithChildren {
  bracket: Bracket
}

interface PlayerState {
  players: Profile[]
}

interface PlayerDispatch {
  addPlayer: (player: Profile) => void
  removePlayer: (player: Profile) => void
}

const PlayerStateContext = createContext<PlayerState | undefined>(undefined)

const PlayerDispatchContext = createContext<PlayerDispatch | undefined>(undefined)

const PlayerContextProvider: React.FC<Props> = ({ children, bracket }) => {
  const [players, setPlayers] = useState<Profile[]>(initialState.players)
  const queryClient = useQueryClient()

  const {
    data = [],
    refetch,
    isFetching,
  } = useQuery({
    queryFn: ({ signal }) => {
      if (isFetching) {
        queryClient.cancelQueries({ queryKey: ['getPlayers'] })
      }

      const date = new Date(bracket.date)
      date.setDate(date.getDate() + 1)

      return fetcher({
        path: 'players',
        query: {
          _changed: {
            $gt: {
              $date: bracket.key,
            },
            $lt: {
              $date: date,
            },
          },
        },
        signal,
      })
    },
    queryKey: ['getPlayers'],
    enabled: false,
  })

  const addPlayer = useCallback(
    (player: Profile) => {
      setPlayers([...players, player])
    },
    [setPlayers]
  )

  const removePlayer = useCallback(
    (player: Profile) => {
      const newPlayers = [...players]
      const deleteIndex = newPlayers.findIndex((x) => x._id === player._id)
      if (deleteIndex !== -1) {
        newPlayers.splice(deleteIndex, 1)
        setPlayers(newPlayers)
      }
    },
    [setPlayers]
  )

  useEffect(() => {
    refetch()
  }, [bracket])

  useEffect(() => {
    if (data.length !== players.length) {
      setPlayers(data)
    }
  }, [data])

  return (
    <PlayerDispatchContext.Provider
      value={{
        addPlayer,
        removePlayer,
      }}
    >
      <PlayerStateContext.Provider
        value={{
          players,
        }}
      >
        {children}
      </PlayerStateContext.Provider>
    </PlayerDispatchContext.Provider>
  )
}

export const usePlayerState = (): PlayerState => {
  const state = useContext(PlayerStateContext)
  return (state ?? initialState) as PlayerState
}

export const usePlayerDispatch = (): PlayerDispatch => {
  const dispatch = useContext(PlayerDispatchContext)
  return (dispatch ?? {}) as PlayerDispatch
}

export default PlayerContextProvider
