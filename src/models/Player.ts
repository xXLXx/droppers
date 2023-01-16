import type Profile from 'models/Profile'

interface Player extends Profile {
  loggedIn: boolean
}

export default Player
