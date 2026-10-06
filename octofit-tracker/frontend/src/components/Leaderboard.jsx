import { apiUrl } from '../api'
import ResourceView from './ResourceView'

const endpoint = '/api/leaderboard/'

function fetchLeaderboard(signal) {
  return fetch(apiUrl(endpoint), { signal }).then((response) => {
    if (!response.ok) throw new Error(`Request failed with ${response.status}`)
    return response.json()
  })
}

export default function Leaderboard() {
  return (
    <ResourceView
      title="Leaderboard"
      eyebrow="/api/leaderboard/"
      endpoint={endpoint}
      loadResource={fetchLeaderboard}
      columns={["Rank", "Athlete", "Team", "Points"]}
      renderItem={(entry) => [entry.rank, entry.user, entry.team, entry.points]}
    />
  )
}