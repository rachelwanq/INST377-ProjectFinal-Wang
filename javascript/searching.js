async function searchGames() {
  const query = document.getElementById('search').value;
  const rawgKey = 'cf9076d03a164807b7a26e04838fd41f';
  const res = await fetch(`https://api.rawg.io/api/games?search=${query}&key=${rawgKey}`);
  const data = await res.json();

  const results = document.getElementById('results');
  results.innerHTML = '';
  data.results.forEach(game => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${game.name}</h3>
      <img src="${game.background_image}" width="150"/>
      <p><a href="./game_detail.html?id=${game.id}">View Details</a></p>
    `;
    results.appendChild(div);
  });
}

if (annyang) {
  const commands = {
    'search for *term': (term) => {
      document.getElementById('search').value = term;
      searchGames();
    }
  };
  annyang.addCommands(commands);
  annyang.start();
}