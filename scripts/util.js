let fillCountry = function (countryDiv, player) {
    let session = data.players[player].sessions[data.players[player].sessions.length - 1];

    countryDiv.querySelector("#rank").src = './images/government_ranks/' + session.rank + '.png';
    countryDiv.querySelector("#pseudo").innerHTML = data.players[player].pseudo;
    countryDiv.querySelector("#flag").src = './images/flags/' + session.tag + '.png';
    countryDiv.querySelector("#culture").innerHTML = session.culture;
    countryDiv.querySelector("#capital").innerHTML = session.capital;
    countryDiv.querySelector("#government").innerHTML = session.government;
    countryDiv.querySelector("#religion").innerHTML = session.religion;
    countryDiv.querySelector("#religionImg").src = './images/religions/' + session.religion + '.png';
    countryDiv.querySelector("#dev").innerHTML = session.dev.toString() + ' (' + (session.devRank === 1 ? '1er)' : (session.devRank + 'ième)'));
    countryDiv.querySelector("#income").innerHTML = session.income.toString() + ' (' + (session.incomeRank === 1 ? '1er)' : (session.incomeRank + 'ième)'));
    countryDiv.querySelector("#manpower").innerHTML = session.manpower.toString() + ' (' + (session.manpowerRank === 1 ? '1er)' : (session.manpowerRank + 'ième)'));
    countryDiv.querySelector("#forceLimit").innerHTML = session.forceLimit.toString() + ' (' + (session.forceLimitRank === 1 ? '1er)' : (session.forceLimitRank + 'ième)'));
    countryDiv.querySelector("#nbProv").innerHTML = session.nbProv.toString() + ' (' + (session.nbProvRank === 1 ? '1er)' : (session.nbProvRank + 'ième)'));
    countryDiv.querySelector("#losses").innerHTML = session.losses.toString() + ' (' + (session.lossesRank === 1 ? '1er)' : (session.lossesRank + 'ième)'));
    countryDiv.querySelector("#loan").innerHTML = session.loan.toString() + ' (' + (session.loanRank === 1 ? '1er)' : (session.loanRank + 'ième)'));
    countryDiv.querySelector("#professionalism").innerHTML = session.professionalism + '%' + ' (' + (session.professionalismRank === 1 ? '1er)' : (session.professionalismRank + 'ième)'));
    countryDiv.querySelector("#innovativeness").innerHTML = session.innovativeness + '%' + ' (' + (session.innovativenessRank === 1 ? '1er)' : (session.innovativenessRank + 'ième)'));

    countryDiv.querySelector("#feudalism").classList.replace('institutionNotEmbraced',
        session.institutions.feudalism ? 'institutionEmbraced' : 'institutionNotEmbraced');
    countryDiv.querySelector("#renaissance").classList.replace('institutionNotEmbraced',
        session.institutions.renaissance ? 'institutionEmbraced' : 'institutionNotEmbraced');
    countryDiv.querySelector("#colonialism").classList.replace('institutionNotEmbraced',
        session.institutions.colonialism ? 'institutionEmbraced' : 'institutionNotEmbraced');
    countryDiv.querySelector("#printingPress").classList.replace('institutionNotEmbraced',
        session.institutions.printingPress ? 'institutionEmbraced' : 'institutionNotEmbraced');
    countryDiv.querySelector("#globalTrade").classList.replace('institutionNotEmbraced',
        session.institutions.globalTrade ? 'institutionEmbraced' : 'institutionNotEmbraced');
    countryDiv.querySelector("#manufactories").classList.replace('institutionNotEmbraced',
        session.institutions.manufactories ? 'institutionEmbraced' : 'institutionNotEmbraced');
    countryDiv.querySelector("#enlightenment").classList.replace('institutionNotEmbraced',
        session.institutions.enlightenment ? 'institutionEmbraced' : 'institutionNotEmbraced');

    if (data.players[player].sessions.length < data.nbSessions) {
        countryDiv.classList.add("deadCountry");

        let deadCountryText = document.createElement("div");
        deadCountryText.innerHTML = 'Mort session ' + (data.players[player].sessions.length + 1);
        deadCountryText.classList.add("deadCountryText");
        deadCountryText.id = 'deadCountryText';
        countryDiv.appendChild(deadCountryText);
    }
};

let options = {
    'legend': {
        'position': 'top'
    },
    'theme': 'material',
    'chartArea': {
        'left': 50,
        'top': 50,
        'width': '95%',
        'height': '85%'
    },
    'vAxis': {
        'format': 'decimal',
        'minorGridlines': {
            'count': 4
        }
    }
};

let optionsLine = {
    theme: 'material',
    legend: {
        position: 'top'
    },
    axisTitlesPosition: 'none',
    pointSize: 5,
    chartArea: {
        left: 50,
        top: 50,
        width: '95%',
        height: '85%'
    },
    vAxis: {
        format: 'decimal',
        minValue: 0,
        maxValue: data.players.length,
        minorGridlines: {
            count: 4
        }
    }
};

let optionsTable = {
    alternatingRowStyle: true,
    width: '79%',
    allowHtml: true,
    cssClassNames: {
        tableRow: 'tableRow',
        oddTableRow: 'tableRow',
        tableCell: 'tableCell',
        headerCell: 'tableHeader'
    }
};

let fillListPlayers = function (listPlayersDiv) {
    let i = 0;

    data.players.forEach((player) => {
        let option = document.createElement("option");
        option.text = player.pseudo;
        option.value = i;
        listPlayersDiv.add(option);
        i++;
    });
};