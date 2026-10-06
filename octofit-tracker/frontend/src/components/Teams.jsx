import { apiUrl } from '../api'
import ResourceView from './ResourceView'

const endpoint = '/api/teams/'

function fetchTeams(signal) {
  return fetch(apiUrl(endpoint), { signal }).then((response) => {
    if (!response.ok) throw new Error(`Request failed with ${response.status}`)
    return response.json()
  })
}

export default function Teams() {
  return (
    <ResourceView
      title="Teams"
      eyebrow="/api/teams/"
      endpoint={endpoint}
      loadResource={fetchTeams}
      columns={["Team", "Description", "Members"]}
      renderItem={(team) => [team.name, team.description, team.memberCount]}
    />
  )
}