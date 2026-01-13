import requests
import json
import os
from dotenv import load_dotenv

# 🔄 Load environment variables from .env file
load_dotenv()

# 🔑 Get your API key & access token
API_KEY = os.getenv("TMDB_API_KEY")
ACCESS_TOKEN = os.getenv("TMDB_ACCESS_TOKEN")
ACCOUNT_ID = os.getenv("TMDB_USER_ID")  

# 🌍 Endpoint for your rated movies
# url = f"https://api.themoviedb.org/3/account/{ACCOUNT_ID}/rated/tv/episodes?language=en-US&page=1&sort_by=created_at.asc"
# url = f"https://api.themoviedb.org/3/account/{ACCOUNT_ID}/rated/movies?language=en-US&page=1&sort_by=created_at.asc"

# headers = {
#     "accept": "application/json",
#     "Authorization": f"Bearer {ACCESS_TOKEN}"
# }

url = "https://api.themoviedb.org/3/account/22378031/rated/tv/episodes?language=en-US&page=1&sort_by=created_at.asc"

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YzI2YjYxYjk5OWUyZjM3MTc0NmZmMWZjNGE3OWY0NSIsIm5iZiI6MTc2MDIyNTY2Mi4xNDQsInN1YiI6IjY4ZWFlOTdlNTNiNzJmNGY2NDFmNjdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zdD6y8WirOLDw4vQtc0inZ2Fnwe-bchbK-j8xWM9MVA"
}

response = requests.get(url, headers=headers)

print(response.text)

# 🚀 Make the request
# response = requests.get(url, headers=headers)

# ✅ Check and save
if response.status_code == 200:
    data = response.json()

    # Print a short summary
    print(f"✅ Retrieved {len(data.get('results', []))} rated movies.")

    # Save to JSON file
    with open("rated_shows.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    print("📁 Rated movies saved to 'rated_movies.json'")
else:
    print("❌ Error:", response.status_code, response.text)
