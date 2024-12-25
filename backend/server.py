from fastapi import FastAPI, Query
from typing import Optional, List
import requests
from config import TMDB_API_KEY, TMDB_BASE_URL
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def index():
  return {
    'data': {
      'name': 'Bodhisatta'
    }
  }
  
def fetch_from_tmdb(endpoint: str, params: dict) -> dict:
    """
    Helper function to make requests to the TMDB API.
    """
    url = f"{TMDB_BASE_URL}/{endpoint}"
    params["api_key"] = TMDB_API_KEY
    response = requests.get(url, params=params)
    response.raise_for_status()  # Raise an error for bad responses
    return response.json()

@app.get("/movies/")
async def get_movies(
    keyword: Optional[str] = "",
    type: str = Query("movie", enum=["movie", "tv"]),
    sort_by: str = Query("popularity.desc", enum=["popularity.desc", "popularity.asc", "release_date.desc", "release_date.asc", "original_title.asc", "original_title.desc"]),
    page: int = 1,
    limit: int = 10,
):
    """
    Fetch movies or TV shows based on filters.
    """
    endpoint = f"{TMDB_BASE_URL}/search/{type}" if keyword else f"{TMDB_BASE_URL}/discover/{type}"
    params = {
        "api_key": TMDB_API_KEY,
        "query": keyword,
        "page": page,
    }
    
    response = requests.get(endpoint, params=params)
    if response.status_code != 200:
        return {"error": response.json()}

    data = response.json()
    results = data.get("results", [])

    # Manual sorting if TMDB API doesn't handle it correctly
    if sort_by == "release_date.asc":
        results.sort(key=lambda x: x.get("release_date", ""), reverse=False)
    elif sort_by == "release_date.desc":
        results.sort(key=lambda x: x.get("release_date", ""), reverse=True)
    elif sort_by == "original_title.asc":
        results.sort(key=lambda x: x.get("title" if type == "movie" else "name", "").lower(), reverse=False)
    elif sort_by == "original_title.desc":
        results.sort(key=lambda x: x.get("title" if type == "movie" else "name", "").lower(), reverse=True)

    # Calculate total pages
    total_results = data.get("total_results", 0)
    total_pages = (total_results // limit) + (1 if total_results % limit != 0 else 0)

    return {
        "movies": results[:limit],  # Limit the results
        "total_pages": total_pages,
    }

@app.get("/genres/")
async def get_genres():
    """
    Fetch all genres for both movies and TV shows.
    """
    genres = {}
    for media_type in ["movie", "tv"]:
        response = requests.get(f"{TMDB_BASE_URL}/genre/{media_type}/list", params={"api_key": TMDB_API_KEY})
        if response.status_code == 200:
            genres[media_type] = response.json().get("genres", [])

    combined_genres = {genre["id"]: genre["name"] for media in genres.values() for genre in media}
    return {"genres": [{"id": key, "name": value} for key, value in combined_genres.items()]}


@app.get("/tv-series/")
async def get_tv_series(
    keyword: Optional[str] = Query(None, description="Search keyword for TV series"),
    genre: Optional[int] = Query(None, description="Genre ID (e.g., Action, Comedy)"),
    language: Optional[str] = Query("en", description="Language code (e.g., en, fr)"),
    limit: Optional[int] = Query(10, description="Number of TV series to return"),
    sort_by: Optional[str] = Query("popularity.desc", description="Sort series (e.g., popularity.desc, first_air_date.desc)"),
):
    """
    Endpoint to fetch TV series with optional filters.
    """
    params = {
        "language": language,
        "sort_by": sort_by,
        "page": 1,  # Pagination is handled below
        "with_genres": genre,
    }

    # Handle keyword search
    if keyword:
        search_results = fetch_from_tmdb("search/tv", {"query": keyword, "language": language})
        tv_series = search_results.get("results", [])
    else:
        tv_series = fetch_from_tmdb("discover/tv", params).get("results", [])
    
    # Limit the number of series returned
    return {"tv_series": tv_series[:limit]}
