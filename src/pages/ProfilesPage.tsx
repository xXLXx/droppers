import React from 'react'
import { useQuery } from '@tanstack/react-query'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import ListSubheader from '@mui/material/ListSubheader'
import Switch from '@mui/material/Switch'
import { usePlayerState } from 'contexts/PlayerContext'
import Profile from 'models/Profile'
import fetcher from 'lib/fetcher'

const ProfilesPage: React.FC = () => {
  const { data: profiles = [] } = useQuery({
    queryFn: () => fetcher({ path: 'profiles', sort: { class: 1 } }),
    queryKey: ['getProfiles'],
  })

  return (
    <List>
      <ListSubheader>A</ListSubheader>
      {(profiles as Profile[]).map((profile) => (
        <ListItem key={profile._id}>
          <ListItemText primary={profile.name} />
          {/*<Switch
            edge="end"
            onChange={handleToggle('wifi')}
            checked={checked.indexOf('wifi') !== -1}
            inputProps={{
              'aria-labelledby': 'switch-list-label-wifi',
            }}
          />*/}
        </ListItem>
      ))}
    </List>
  )
}

export default ProfilesPage
