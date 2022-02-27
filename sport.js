const loadDetail = () => {
    const searchInput = document.getElementById('search-box');
    const searchValue = searchInput.value;

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPlayers(data.player));
    searchInput.value = '';
}

const displayPlayers = (players) => {
    const playerdiv = document.getElementById('player-container');
    playerdiv.textContent = '';
    for (const player of players) {
        // console.log(player)

        const div = document.createElement("div");

        div.innerHTML = `<div class="cards w-75 mx-auto my-4 p-4">
         <img class="w-50 p-2" src="${player.strThumb}" alt="img">
         <h2>Name: ${player.strPlayer}</h2>
         <h4>Country: ${player.strNationality}</h4>
         <h4>Player: ${player.strSport}</h4>
         <div class="allbutton">
           <button class="btn-danger px-2 rounded mx-2">Delete</button>
           <button onclick="playerDetail('${player.idPlayer}')" class="btn-success px-2 rounded mx-2">Details</button>
         </div>
         </div>`
        playerdiv.appendChild(div)
    }
}

const playerDetail = (info) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${info}`
    fetch(url)
        .then(res => res.json())
        .then(data => singlePlayerDetail(data.players[0]))

}

const singlePlayerDetail = (details) => {
    const showDetails = document.getElementById('single-detail');
    showDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
           <div>
                <div>
                <h2 class="fw-bold">${details.strPlayer}</h2>
                <img class="w-50" src="${details.strThumb}" alt="">
                </div>
                <div>
                    <h2>Name: ${details.strPlayer}</h2>
                    <h4>Sports: ${details.strSport}</h4>
                    <h4>Nationality: ${details.strNationality}</h4>
                    <h4>BirthDate: ${details.dateBorn}</h4>
                    <p>Description: ${details.strDescriptionEN}</p>
                </div>
            </div>`
    showDetails.appendChild(div)
    console.log(details)
}