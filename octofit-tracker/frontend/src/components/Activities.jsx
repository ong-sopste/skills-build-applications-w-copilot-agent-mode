import { apiUrl } from '../api'
import ResourceView from './ResourceView'

const endpoint = '/api/activities/'

function fetchActivities(signal) {
  return fetch(apiUrl(endpoint), { signal }).then((response) => {
    if (!response.ok) throw new Error(`Request failed with ${response.status}`)
    return response.json()
  })
}

export default function Activities() {
  return (
    <ResourceView
      title="Activities"
      eyebrow="/api/activities/"
      endpoint={endpoint}
      loadResource={fetchActivities}
      columns={["Athlete", "Type", "Minutes", "Calories"]}
      renderItem={(activity) => [
        activity.user,
        activity.type,
        activity.durationMinutes,
        activity.caloriesBurned,
      ]}
    />
  )
}