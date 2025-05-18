const supabaseUrl = 'https://ybhnycdthubalkkppgjo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliaG55Y2R0aHViYWxra3BwZ2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MzEzMzcsImV4cCI6MjA2MzEwNzMzN30.sLNKFFBfFDUUiow2V3Yv8pzipT5rtgNgL4jv22LImhc';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadFavorites() {
    const { data: favorites, error } = await supabase.from('favorites').select();
  
    const favContainer = document.getElementById('favoritesList');
    if (!favContainer) return;
  
    if (error) {
      favContainer.innerHTML = `<p>Error loading favorites: ${error.message}</p>`;
      return;
    }
  
    if (favorites.length === 0) {
      favContainer.innerHTML = '<p>No favorite games saved yet.</p>';
      return;
    }
  
    favContainer.innerHTML = '';
    favorites.forEach(game => {
      const div = document.createElement('div');
      div.classList.add('favorite-game');
      div.innerHTML = `
        <h4>${game.name}</h4>
        <img src="${game.background_image}" alt="${game.name}" width="120" />
        <p><a href="./game_detail.html?id=${game.game_id}">View Details</a></p>
      `;
      favContainer.appendChild(div);
    });
  }
  
  window.addEventListener('DOMContentLoaded', loadFavorites);