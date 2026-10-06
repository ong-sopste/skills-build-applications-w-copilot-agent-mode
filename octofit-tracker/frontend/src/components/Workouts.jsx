import { apiUrl } from '../api'
import ResourceView from './ResourceView'

const endpoint = '/api/workouts/'

function fetchWorkouts(signal) {
  return fetch(apiUrl(endpoint), { signal }).then((response) => {
    if (!response.ok) throw new Error(`Request failed with ${response.status}`)
    return response.json()
  })
}

export default function Workouts() {
  return (
    <ResourceView
      title="Workouts"
      eyebrow="/api/workouts/"
      endpoint={endpoint}
      loadResource={fetchWorkouts}
      columns={["Workout", "Focus", "Difficulty", "Minutes"]}
      renderItem={(workout) => [
        workout.name,
        workout.focus,
        workout.difficulty,
        workout.durationMinutes,
      ]}
    />
  )
}