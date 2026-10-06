import { apiUrl } from '../api'
import ResourceView from './ResourceView'

const endpoint = '/api/users/'

function fetchUsers(signal) {
  return fetch(apiUrl(endpoint), { signal }).then((response) => {
    if (!response.ok) throw new Error(`Request failed with ${response.status}`)
    return response.json()
  })
}

export default function Users() {
  return (
    <ResourceView
      title="Users"
      eyebrow="/api/users/"
      endpoint={endpoint}
      loadResource={fetchUsers}
      columns={["Name", "Email", "Goal", "Team"]}
      renderItem={(user) => [user.name, user.email, user.fitnessGoal, user.team]}
    />
  )
}