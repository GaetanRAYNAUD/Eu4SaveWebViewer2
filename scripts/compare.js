let teams = {
    display: false,
    teams: [
    {
        players: [],
        totalDev: 0,
        totalForceLimit: 0,
        totalIncome: 0,
        totalLosses: 0,
        totalManpower: 0,
        totalNbProv: 0,
        totalProfessionalism: 0
    }, {
        players: [],
        totalDev: 0,
        totalForceLimit: 0,
        totalIncome: 0,
        totalLosses: 0,
        totalManpower: 0,
        totalNbProv: 0,
        totalProfessionalism: 0
    }],

    addPlayer: function (numTeam, numPlayer) {
        let player = data.players[numPlayer];
        this.teams[numTeam].players.push(player);
        this.teams[numTeam].totalDev += player.sessions[data.nbSessions - 1].dev;
        this.teams[numTeam].totalForceLimit += player.sessions[data.nbSessions - 1].forceLimit;
        this.teams[numTeam].totalIncome += player.sessions[data.nbSessions - 1].income;
        this.teams[numTeam].totalLosses += player.sessions[data.nbSessions - 1].losses;
        this.teams[numTeam].totalManpower += player.sessions[data.nbSessions - 1].manpower;
        this.teams[numTeam].totalNbProv += player.sessions[data.nbSessions - 1].nbProv;
        this.teams[numTeam].totalProfessionalism += player.sessions[data.nbSessions - 1].professionalism;
    }
};

window.onload = function () {
    init();
};

let init = function () {
    let team1Div = document.getElementById('selectTeam1');
    let team2Div = document.getElementById('selectTeam2');

    fillListPlayers(team1Div);
    fillListPlayers(team2Div);
};

let getResultCompareDiv = function () {
    let resultCompareDiv = document.createElement('div');

    resultCompareDiv.classList.add('countryPlate');
    resultCompareDiv.classList.add('countryPlateCompare');
    resultCompareDiv.id = 'countryPlate';

    resultCompareDiv.innerHTML = '<div class="heading headingCompare">'
        + '<span class="team1 resultHeading">Équipe 1</span>'
        + '<span class="vs resultHeading">VS</span>'
        + '<span class="team2 resultHeading">Équipe 2</span>'
        + '</div>'
        + '<div class="stat">'
        + '<span class="infoText textImage team1" id="devTeam1"></span>'
        + '<img alt="Dev.png" src="./images/info/Dev.png" width="36" height="36">'
        + '<span class="infoText textImage team2" id="devTeam2"></span>'
        + '</div>'
        + '<hr>'
        + '<div class="stat">'
        + '<span class="infoText textImage team1" id="incomeTeam1"></span>'
        + '<img alt="Gold.png" src="./images/info/Gold.png"  width="36"  height="36">'
        + '<span class="infoText textImage team2" id="incomeTeam2"></span>'
        + '</div>'
        + '<hr>'
        + '<div class="stat">'
        + '<span class="infoText textImage team1" id="manpowerTeam1"></span>'
        + '<img alt="Manpower.png" src="./images/info/Manpower.png" width="36" height="36">'
        + '<span class="infoText textImage team2" id="manpowerTeam2"></span>'
        + '</div>'
        + '<hr>'
        + '<div class="stat">'
        + '<span class="infoText textImage team1" id="forceLimitTeam1"></span>'
        + '<img alt="Land_forcelimit.png"  src="./images/info/Land_forcelimit.png" width="36" height="36">'
        + '<span class="infoText textImage team2" id="forceLimitTeam2"></span>'
        + '</div>'
        + '<hr>'
        + '<div class="stat">'
        + '<span class="infoText textImage team1" id="nbProvTeam1"></span>'
        + '<img alt="Province.png"  src="./images/info/Province.png" width="36" height="36">'
        + '<span class="infoText textImage team2" id="nbProvTeam2"></span>'
        + '</div>'
        + '<hr>'
        + '<div class="stat">'
        + '<span class="infoText textImage team1" id="lossesTeam1"></span>'
        + '<img alt="Losses.png" src="./images/info/Losses.png" width="36" height="36">'
        + '<span class="infoText textImage team2" id="lossesTeam2"></span>'
        + '</div>'
        + '<hr>'
        + '<div class="stat">'
        + '<span class="infoText textImage team1" id="professionalismTeam1"></span>'
        + '<img alt="Professionalism.png" src="./images/info/Professionalism.png" width="36" height="36">'
        + '<span class="infoText textImage team2" id="professionalismTeam2"></span>'
        + '</div>';

    return resultCompareDiv;
};

let getCountryPlateCompareDiv = function () {
    let countryPlateCompareDiv = document.createElement('div');

    countryPlateCompareDiv.classList.add('countryPlate');
    countryPlateCompareDiv.classList.add('countryPlateCompare');
    countryPlateCompareDiv.id = 'countryPlate';

    countryPlateCompareDiv.innerHTML = '<div class="heading headingCompare">'
        + '<div>'
        + '<img alt="Rank" id="rank" src="./images/government_ranks/2.png" width="36" height="36">'
        + '<span id="pseudo"></span>'
        + '</div>'
        + '</div>'
        + '<hr>'
        + '<b>Développement</b>'
        + '<div class="info">'
        + '<span class="infoText textImage" id="dev"></span>'
        + '<img alt="Dev.png" src="./images/info/Dev.png" width="36" height="36">'
        + '</div>'
        + '<hr>'
        + '<b>Revenu</b>'
        + '<div class="info">'
        + '<span class="infoText textImage" id="income"></span>'
        + '<img alt="Gold.png" src="./images/info/Gold.png" width="36" height="36">'
        + '</div>'
        + '<hr>'
        + '<b>Réserves militaire</b>'
        + '<div class="info">'
        + '<span class="infoText textImage" id="manpower"></span>'
        + '<img alt="Manpower.png" src="./images/info/Manpower.png" width="36" height="36">'
        + '</div>'
        + '<hr>'
        + '<b>Limite terrestre</b>'
        + '<div class="info">'
        + '<span class="infoText textImage" id="forceLimit"></span>'
        + '<img alt="Land_forcelimit.png" src="./images/info/Land_forcelimit.png" width="36" height="36">'
        + '</div>'
        + '<hr>'
        + '<b>Nombre de provinces</b>'
        + '<div class="info">'
        + '<span class="infoText textImage" id="nbProv"></span>'
        + '<img alt="Province.png" src="./images/info/Province.png" width="36" height="36">'
        + '</div>'
        + '<hr>'
        + '<b>Pertes</b>'
        + '<div class="info">'
        + '<span class="infoText textImage" id="losses"></span>'
        + '<img alt="Losses.png" src="./images/info/Losses.png" width="36" height="36">'
        + '</div>'
        + '<hr>'
        + '<b>Professionnalisme</b>'
        + '<div class="info">'
        + '<span class="infoText textImage" id="professionalism"></span>'
        + '<img alt="Professionalism.png" src="./images/info/Professionalism.png" width="36" height="36">'
        + '</div>';

    return countryPlateCompareDiv;
};

let fillCountryCompare = function (countryDiv, player) {
    let session = data.players[player].sessions[data.players[player].sessions.length - 1];

    countryDiv.querySelector('#rank').src = './images/government_ranks/' + session.rank + '.png';
    countryDiv.querySelector('#pseudo').innerHTML = data.players[player].pseudo + ' (' + data.players[player].sessions[data.nbSessions - 1].country + ')';
    countryDiv.querySelector('#dev').innerHTML = session.dev.toString() + ' (' + (session.devRank === 1 ? '1er)' : (session.devRank + 'ième)'));
    countryDiv.querySelector('#income').innerHTML = session.income.toString() + ' (' + (session.incomeRank === 1 ? '1er)' : (session.incomeRank + 'ième)'));
    countryDiv.querySelector('#manpower').innerHTML = session.manpower.toString() + ' (' + (session.manpowerRank === 1 ? '1er)' : (session.manpowerRank + 'ième)'));
    countryDiv.querySelector('#forceLimit').innerHTML = session.forceLimit.toString() + ' (' + (session.forceLimitRank === 1 ? '1er)' : (session.forceLimitRank + 'ième)'));
    countryDiv.querySelector('#nbProv').innerHTML = session.nbProv.toString() + ' (' + (session.nbProvRank === 1 ? '1er)' : (session.nbProvRank + 'ième)'));
    countryDiv.querySelector('#losses').innerHTML = session.losses.toString() + ' (' + (session.lossesRank === 1 ? '1er)' : (session.lossesRank + 'ième)'));
    countryDiv.querySelector('#professionalism').innerHTML = session.professionalism + '%' + ' (' + (session.professionalismRank === 1 ? '1er)' : (session.professionalismRank + 'ième)'));

    if (data.players[player].sessions.length < data.nbSessions) {
        countryDiv.classList.add("deadCountry");

        let deadCountryText = document.createElement('div');
        deadCountryText.innerHTML = 'Mort session ' + (data.players[player].sessions.length + 1);
        deadCountryText.classList.add('deadCountryText');
        deadCountryText.id = 'deadCountryText';
        countryDiv.appendChild(deadCountryText);
    }
};

let displayResult = function () {
    let resultDiv = document.getElementById('result');

    resultDiv.appendChild(getResultCompareDiv());
};

let fillResult = function () {
    let resultDiv = document.getElementById('result');

    resultDiv.querySelector('#incomeTeam1').innerHTML = teams.teams[0].totalIncome;
    resultDiv.querySelector('#manpowerTeam1').innerHTML = teams.teams[0].totalManpower;
    resultDiv.querySelector('#forceLimitTeam1').innerHTML = teams.teams[0].totalForceLimit;
    resultDiv.querySelector('#nbProvTeam1').innerHTML = teams.teams[0].totalNbProv;
    resultDiv.querySelector('#lossesTeam1').innerHTML = teams.teams[0].totalLosses;
    resultDiv.querySelector('#professionalismTeam1').innerHTML = teams.teams[0].totalProfessionalism;

    resultDiv.querySelector('#incomeTeam2').innerHTML = teams.teams[1].totalIncome;
    resultDiv.querySelector('#manpowerTeam2').innerHTML = teams.teams[1].totalManpower;
    resultDiv.querySelector('#forceLimitTeam2').innerHTML = teams.teams[1].totalForceLimit;
    resultDiv.querySelector('#nbProvTeam2').innerHTML = teams.teams[1].totalNbProv;
    resultDiv.querySelector('#lossesTeam2').innerHTML = teams.teams[1].totalLosses;
    resultDiv.querySelector('#professionalismTeam2').innerHTML = teams.teams[1].totalProfessionalism;


    if(teams.teams[0].totalDev > teams.teams[1].totalDev) {
        let percent = ((teams.teams[0].totalDev / teams.teams[1].totalDev) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#devTeam1').innerHTML = teams.teams[0].totalDev + ' (+' + percent + '%)';

        resultDiv.querySelector('#devTeam2').classList.add('compareLose');
        resultDiv.querySelector('#devTeam2').innerHTML = teams.teams[1].totalDev;

    } else {
        let percent = ((teams.teams[1].totalDev / teams.teams[0].totalDev) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#devTeam2').innerHTML = teams.teams[1].totalDev + ' (+' + percent + '%)';

        resultDiv.querySelector('#devTeam1').classList.add('compareLose');
        resultDiv.querySelector('#devTeam1').innerHTML = teams.teams[0].totalDev;
    }

    if(teams.teams[0].totalIncome > teams.teams[1].totalIncome) {
        let percent = ((teams.teams[0].totalIncome / teams.teams[1].totalIncome) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#incomeTeam1').innerHTML = teams.teams[0].totalIncome + ' (+' + percent + '%)';

        resultDiv.querySelector('#incomeTeam2').classList.add('compareLose');
        resultDiv.querySelector('#incomeTeam2').innerHTML = teams.teams[1].totalIncome;

    } else {
        let percent = ((teams.teams[1].totalIncome / teams.teams[0].totalIncome) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#incomeTeam2').innerHTML = teams.teams[1].totalIncome + ' (+' + percent + '%)';

        resultDiv.querySelector('#incomeTeam1').classList.add('compareLose');
        resultDiv.querySelector('#incomeTeam1').innerHTML = teams.teams[0].totalIncome;
    }

    if(teams.teams[0].totalManpower > teams.teams[1].totalManpower) {
        let percent = ((teams.teams[0].totalManpower / teams.teams[1].totalManpower) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#manpowerTeam1').innerHTML = teams.teams[0].totalManpower + ' (+' + percent + '%)';

        resultDiv.querySelector('#manpowerTeam2').classList.add('compareLose');
        resultDiv.querySelector('#manpowerTeam2').innerHTML = teams.teams[1].totalManpower;

    } else {
        let percent = ((teams.teams[1].totalManpower / teams.teams[0].totalManpower) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#manpowerTeam2').innerHTML = teams.teams[1].totalManpower + ' (+' + percent + '%)';

        resultDiv.querySelector('#manpowerTeam1').classList.add('compareLose');
        resultDiv.querySelector('#manpowerTeam1').innerHTML = teams.teams[0].totalManpower;
    }

    if(teams.teams[0].totalForceLimit > teams.teams[1].totalForceLimit) {
        let percent = ((teams.teams[0].totalForceLimit / teams.teams[1].totalForceLimit) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#forceLimitTeam1').innerHTML = teams.teams[0].totalForceLimit + ' (+' + percent + '%)';

        resultDiv.querySelector('#forceLimitTeam2').classList.add('compareLose');
        resultDiv.querySelector('#forceLimitTeam2').innerHTML = teams.teams[1].totalForceLimit;

    } else {
        let percent = ((teams.teams[1].totalForceLimit / teams.teams[0].totalForceLimit) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#forceLimitTeam2').innerHTML = teams.teams[1].totalForceLimit + ' (+' + percent + '%)';

        resultDiv.querySelector('#forceLimitTeam1').classList.add('compareLose');
        resultDiv.querySelector('#forceLimitTeam1').innerHTML = teams.teams[0].totalForceLimit;
    }

    if(teams.teams[0].totalNbProv > teams.teams[1].totalNbProv) {
        let percent = ((teams.teams[0].totalNbProv / teams.teams[1].totalNbProv) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#nbProvTeam1').innerHTML = teams.teams[0].totalNbProv + ' (+' + (teams.teams[0].totalNbProv - teams.teams[1].totalNbProv) + ')';

        resultDiv.querySelector('#nbProvTeam2').classList.add('compareLose');
        resultDiv.querySelector('#nbProvTeam2').innerHTML = teams.teams[1].totalNbProv;

    } else {
        resultDiv.querySelector('#nbProvTeam2').innerHTML = teams.teams[1].totalNbProv + ' (+' + (teams.teams[1].totalNbProv - teams.teams[0].totalNbProv) + ')';

        resultDiv.querySelector('#nbProvTeam1').classList.add('compareLose');
        resultDiv.querySelector('#nbProvTeam1').innerHTML = teams.teams[0].totalNbProv;
    }

    if(teams.teams[0].totalLosses > teams.teams[1].totalLosses) {
        let percent = ((teams.teams[0].totalLosses / teams.teams[1].totalLosses) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#lossesTeam1').innerHTML = teams.teams[0].totalLosses + ' (+' + percent + '%)';

        resultDiv.querySelector('#lossesTeam2').classList.add('compareLose');
        resultDiv.querySelector('#lossesTeam2').innerHTML = teams.teams[1].totalLosses;
    } else {
        let percent = ((teams.teams[1].totalLosses / teams.teams[0].totalLosses) - 1) * 100;
        percent = percent.toPrecision(percent.toString().split('.')[0].length);

        resultDiv.querySelector('#lossesTeam2').innerHTML = teams.teams[1].totalLosses + ' (+' + percent + '%)';

        resultDiv.querySelector('#lossesTeam1').classList.add('compareLose');
        resultDiv.querySelector('#lossesTeam1').innerHTML = teams.teams[0].totalLosses;
    }

    if(teams.teams[0].totalProfessionalism > teams.teams[1].totalProfessionalism) {
        let percent = teams.teams[0].totalProfessionalism - teams.teams[1].totalProfessionalism;
        percent = percent.toPrecision(percent.toString().split('.')[0].length + 3);

        resultDiv.querySelector('#professionalismTeam1').innerHTML = teams.teams[0].totalProfessionalism + ' (+' + percent + ')';

        resultDiv.querySelector('#professionalismTeam2').classList.add('compareLose');
        resultDiv.querySelector('#professionalismTeam2').innerHTML = teams.teams[1].totalProfessionalism;

    } else {
        let percent = teams.teams[1].totalProfessionalism - teams.teams[0].totalProfessionalism;
        percent = percent.toPrecision(percent.toString().split('.')[0].length + 3);

        resultDiv.querySelector('#professionalismTeam2').innerHTML = teams.teams[1].totalProfessionalism + ' (+' + percent + ')';

        resultDiv.querySelector('#professionalismTeam1').classList.add('compareLose');
        resultDiv.querySelector('#professionalismTeam1').innerHTML = teams.teams[0].totalProfessionalism;
    }
};

let addPlayerToTeam = function (numTeam, numPlayer) {
    if (data.players[numPlayer].sessions.length < data.nbSessions) {
        alert('Le joueur est mort !');

        return;
    }

    let newPlayer = getCountryPlateCompareDiv();
    document.getElementById('team' + numTeam).appendChild(newPlayer);

    fillCountryCompare(newPlayer, numPlayer);
    teams.addPlayer(numTeam - 1, numPlayer);

    if(teams.teams[0].players.length >= 1 && teams.teams[1].players.length >= 1 && !teams.display) {
        displayResult();
        teams.display = true;
    }

    if(teams.display) {
        fillResult();
    }
};

