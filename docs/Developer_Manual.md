Clone and install the application:
    git clone https://github.com/rachelwanq/INST377-ProjectFinal-Wang.git

Dependencies Used:
    For backend, Supabase was used.
    Please ensure you have a Supbase project set up with a table named "favorites" with these following columns:
        game_id (integer)
        name (text)
        background_image (text)
    RAWG anf SupaBase both require API Keys which can be given when making an account for both websites.

Run your application on a server
    To run this application, right click the home.html file and open with Live Server.

Tests you have written for your software
    Currently there are no test written for the software.

API for your server application - all GET, POST, PATCH, etc endpoints
    RAWG API
        - GET https://api.rawg.io/api/games/{id}?key=API_KEY
            - This allows PriceCTRL to fetch game details such as the image, summary and etc.
    CheapShark API
        - GET https://www.cheapshark.com/api/1.0/games?title={gameName}
            - This allows the user to search for a game.
        - GET https://www.cheapshark.com/api/1.0/games?id={cheapsharkGameId}
            - This allows PriceCTRL to gain access to price details.

Known Issues
    - Feedback from the website can be improved when saving games.
    - Some games may not have a price given.
    - All favorites are shared.
    - The UI for favorited games makes the screen longer.
    
Future Development
    - Add individual users so favorites are not shared
    - Add ability to remove favorites
