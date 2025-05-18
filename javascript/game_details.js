const supabaseUrl = 'https://ybhnycdthubalkkppgjo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliaG55Y2R0aHViYWxra3BwZ2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MzEzMzcsImV4cCI6MjA2MzEwNzMzN30.sLNKFFBfFDUUiow2V3Yv8pzipT5rtgNgL4jv22LImhc';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
const params = new URLSearchParams(window.location.search);
const gameID = params.get('id');

async function loadGameDetails() {
    try {
        const rawgKey = 'cf9076d03a164807b7a26e04838fd41f';
        const rawgResponse = await fetch(`https://api.rawg.io/api/games/${gameID}?key=${rawgKey}`);
        const rawgData = await rawgResponse.json();

        document.getElementById('gameTitle').innerText = rawgData.name;
        document.getElementById('gameImage').src = rawgData.background_image;
        document.getElementById('gameSummary').innerText = rawgData.description_raw;

        document.getElementById('saveFavorite').addEventListener('click', async () => {
            await saveToFavorites({
                id: rawgData.id,
                name: rawgData.name,
                background_image: rawgData.background_image,
            });
        });

        const cheapsharkSearchRes = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(rawgData.name)}`);
        const cheapsharkSearchData = await cheapsharkSearchRes.json();

        if (cheapsharkSearchData.length === 0) {
            document.getElementById('priceChart').style.display = 'none';
            const noDataMsg = document.createElement('p');
            noDataMsg.innerText = "Price data not available for this game.";
            document.getElementById('details').appendChild(noDataMsg);
            return;
        }

        const cheapsharkGameId = cheapsharkSearchData[0].gameID;

        const priceResponse = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${cheapsharkGameId}`);
        const priceData = await priceResponse.json();

        const deals = priceData.deals || [];

        if (deals.length === 0) {
            document.getElementById('priceChart').style.display = 'none';
            const noDataMsg = document.createElement('p');
            noDataMsg.innerText = "Price history not available.";
            document.getElementById('details').appendChild(noDataMsg);
            return;
        }

        const labels = deals.map(deal => {
            return deal.releaseDate ? new Date(deal.releaseDate * 1000).toLocaleDateString() : "Unknown Date";
        });

        const prices = deals.map(deal => parseFloat(deal.price));

        new Chart(document.getElementById('priceChart'), {
            type: 'line',
            data: {
            labels,
            datasets: [{
            label: 'Price',
            data: prices,
            borderColor: 'rgb(197, 115, 177)',
            }]
        }
    });

    } catch (error) {
        console.error('Error loading price chart', error);
    }
}

async function saveToFavorites(game) {
    const { data, error } = await supabase
        .from('favorites')
        .select()
        .eq('game_id', game.id);

    if (error) return alert('Error checking favorites: ' + error.message);
    if (data.length > 0) return alert('Game is already in favorites');

    const { error: insertError } = await supabase
        .from('favorites')
        .insert([{ game_id: game.id, name: game.name, background_image: game.background_image }]);

    if (insertError) return alert('Error saving favorite: ' + insertError.message);
        alert('Game saved to favorites!');
}

window.addEventListener('DOMContentLoaded', loadGameDetails);