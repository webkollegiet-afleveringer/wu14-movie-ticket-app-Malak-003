const apiKey = import.meta.env.VITE_TMDB_API_KEY

const baseUrl = "https://api.themoviedb.org/3"

export async function getUpcomingMovies() {
  const url = `${baseUrl}/movie/upcoming?api_key=${apiKey}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch movies")
  }

  return response.json()
}


export async function nowPlayingMovies() {
  const url = `${baseUrl}/movie/now_playing?api_key=${apiKey}`
  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch top movies")

  return response.json()

}


export async function movieDetails(id) {
    const url = `${baseUrl}/movie/${id}?api_key=${apiKey}`
    const response = await fetch(url)
    if (!response.ok) throw new Error("Failed to fetch movie details")
    return response.json()
}




