let countryPlate;

let chartTagsTimeLine;
let chartStats;
let chartRank;
let chartDev;
let chartIncome;
let chartManpower;
let chartForceLimit;
let chartNbProvinces;
let chartLosses;
let chartProfessionalism;

let dataTagsTimeLines;
let dataStats;
let dataRank;
let dataDev;
let dataIncome;
let dataManpower;
let dataForceLimit;
let dataNbProvinces;
let dataLosses;
let dataProfessionalism;

window.onload = function () {
    google.charts.load('current', {'packages': ['corechart', 'bar', 'table', 'line', 'timeline']});
    google.charts.setOnLoadCallback(init);
};

let init = function () {
    countryPlate = document.getElementById("countryPlate");

    fillListPlayers(listPlayers);

    let chartTagsTimeLinesDiv = document.getElementById('tagsTimeLines');
    let chartStatsDiv = document.getElementById('chart-Stats');
    let chartRankDiv = document.getElementById('chart-Rank');
    let chartDevDiv = document.getElementById('chart-Dev');
    let chartIncomeDiv = document.getElementById('chart-Income');
    let chartManpowerDiv = document.getElementById('chart-Manpower');
    let chartForceLimitDiv = document.getElementById('chart-ForceLimit');
    let chartNbProvincesDiv = document.getElementById('chart-NbProvinces');
    let chartLossesDiv = document.getElementById('chart-Losses');
    let chartProfessionalismDiv = document.getElementById('chart-Professionalism');

    chartTagsTimeLine = new google.visualization.Timeline(chartTagsTimeLinesDiv);
    chartStats = new google.visualization.Table(chartStatsDiv);
    chartRank = new google.visualization.LineChart(chartRankDiv);
    chartDev = new google.visualization.ColumnChart(chartDevDiv);
    chartIncome = new google.visualization.ColumnChart(chartIncomeDiv);
    chartManpower = new google.visualization.ColumnChart(chartManpowerDiv);
    chartForceLimit = new google.visualization.ColumnChart(chartForceLimitDiv);
    chartNbProvinces = new google.visualization.ColumnChart(chartNbProvincesDiv);
    chartLosses = new google.visualization.ColumnChart(chartLossesDiv);
    chartProfessionalism = new google.visualization.ColumnChart(chartProfessionalismDiv);

    dataTagsTimeLines = new google.visualization.DataTable();
    dataStats = new google.visualization.DataTable();
    dataRank = new google.visualization.DataTable();
    dataDev = new google.visualization.DataTable();
    dataIncome = new google.visualization.DataTable();
    dataManpower = new google.visualization.DataTable();
    dataForceLimit = new google.visualization.DataTable();
    dataNbProvinces = new google.visualization.DataTable();
    dataLosses = new google.visualization.DataTable();
    dataProfessionalism = new google.visualization.DataTable();

    dataTagsTimeLines.addColumn({type: 'string', id: 'Count'});
    dataTagsTimeLines.addColumn({type: 'string', id: 'Session'});
    dataTagsTimeLines.addColumn({type: 'date', id: 'Start'});
    dataTagsTimeLines.addColumn({type: 'date', id: 'End'});

    dataStats.addColumn('string', 'Sessions');
    dataStats.addColumn('number', 'Developpement');
    dataStats.addColumn('number', 'Revenu');
    dataStats.addColumn('number', 'Reserve militaire');
    dataStats.addColumn('number', 'Limite terrestre');
    dataStats.addColumn('number', 'Nombre de provinces');
    dataStats.addColumn('number', 'Pertes');
    dataStats.addColumn('number', 'Emprun');
    dataStats.addColumn('number', 'Professionnalisme');

    dataRank.addColumn('string', 'Sessions');
    dataRank.addColumn('number', 'Classement développement');
    dataRank.addColumn({type: 'number', role: 'annotation'});
    dataRank.addColumn('number', 'Classement revenue');
    dataRank.addColumn({type: 'number', role: 'annotation'});
    dataRank.addColumn('number', 'Classement réserves militaire');
    dataRank.addColumn({type: 'number', role: 'annotation'});
    dataRank.addColumn('number', 'Classement limite terrestre');
    dataRank.addColumn({type: 'number', role: 'annotation'});

    dataDev.addColumn('string', 'Sessions');
    dataDev.addColumn('number', 'Développement');
    dataDev.addColumn({type: 'string', role: 'annotation'});

    dataIncome.addColumn('string', 'Sessions');
    dataIncome.addColumn('number', 'Revenue');
    dataIncome.addColumn({type: 'string', role: 'annotation'});

    dataManpower.addColumn('string', 'Sessions');
    dataManpower.addColumn('number', 'Réserves militaire');
    dataManpower.addColumn({type: 'string', role: 'annotation'});

    dataForceLimit.addColumn('string', 'Sessions');
    dataForceLimit.addColumn('number', 'Limite terrestre');
    dataForceLimit.addColumn({type: 'string', role: 'annotation'});

    dataNbProvinces.addColumn('string', 'Sessions');
    dataNbProvinces.addColumn('number', 'Nombre de provinces');
    dataNbProvinces.addColumn({type: 'string', role: 'annotation'});

    dataLosses.addColumn('string', 'Sessions');
    dataLosses.addColumn('number', 'Pertes');
    dataLosses.addColumn({type: 'string', role: 'annotation'});

    dataProfessionalism.addColumn('string', 'Sessions');
    dataProfessionalism.addColumn('number', 'Professionnalisme');
    dataProfessionalism.addColumn({type: 'string', role: 'annotation'});

    changePlayer(0);
};

let cleanTables = function () {
    dataTagsTimeLines.removeRows(0, dataTagsTimeLines.getNumberOfRows());
    dataStats.removeRows(0, dataStats.getNumberOfRows());
    dataRank.removeRows(0, dataRank.getNumberOfRows());
    dataDev.removeRows(0, dataDev.getNumberOfRows());
    dataIncome.removeRows(0, dataIncome.getNumberOfRows());
    dataManpower.removeRows(0, dataManpower.getNumberOfRows());
    dataForceLimit.removeRows(0, dataForceLimit.getNumberOfRows());
    dataNbProvinces.removeRows(0, dataNbProvinces.getNumberOfRows());
    dataLosses.removeRows(0, dataLosses.getNumberOfRows());
    dataProfessionalism.removeRows(0, dataProfessionalism.getNumberOfRows());
};

let addTagsTimeLine = function (num) {
    let lastChange = [];
    let numChange = 0;

    lastChange.push(0);

    dataTagsTimeLines.addRow([data.players[num].sessions[0].country, data.players[num].sessions[0].country, new Date(1444, 10, 11), new Date(data.sessions[0].startDate)]);

    for (let i = 1; i < data.nbSessions; i++) {
        if(data.players[num].sessions.length <= i) {
            dataTagsTimeLines.addRow([data.players[num].sessions[data.players[num].sessions.length - 1].country, 'Mort', new Date(data.sessions[data.players[num].sessions.length - 1].startDate),
                new Date(data.sessions[i].startDate)]);
            break;
        }

        if (data.players[num].sessions[i].country !== data.players[num].sessions[i - 1].country) {
            lastChange.push(i);
            numChange++;
            dataTagsTimeLines.addRow([data.players[num].sessions[i].country, data.players[num].sessions[i].country, new Date(data.sessions[i - 1].startDate), new Date(data.sessions[i].startDate)]);
        } else {
            if (numChange === 0) {
                dataTagsTimeLines.removeRows(0, 1);
                dataTagsTimeLines.addRow([data.players[num].sessions[0].country, data.players[num].sessions[0].country, new Date(1444, 10, 11), new Date(data.sessions[i].startDate)]);

            } else if (numChange === 1) {
                dataTagsTimeLines.removeRows(0, 2);
                dataTagsTimeLines.addRow([data.players[num].sessions[0].country, data.players[num].sessions[0].country,
                    new Date(1444, 10, 11), new Date(data.sessions[lastChange[lastChange.length - 1]].startDate)]);
                dataTagsTimeLines.addRow([data.players[num].sessions[i].country, data.players[num].sessions[i].country, new Date(data.sessions[lastChange[lastChange.length - 1]].startDate),
                    new Date(data.sessions[i].startDate)]);
            } else {
                dataTagsTimeLines.removeRows(0, dataTagsTimeLines.getNumberOfRows());
                dataTagsTimeLines.addRow([data.players[num].sessions[0].country, data.players[num].sessions[0].country,
                    new Date(1444, 10, 11), new Date(data.sessions[lastChange[1]].startDate)]);

                for(let j = 1; j < numChange; j++) {
                    dataTagsTimeLines.addRow([data.players[num].sessions[lastChange[j]].country, data.players[num].sessions[lastChange[j]].country,
                        new Date(data.sessions[lastChange[j]].startDate),
                        new Date(data.sessions[lastChange[j + 1]].startDate)]);
                }

                dataTagsTimeLines.addRow([data.players[num].sessions[data.players[num].sessions.length - 1].country, data.players[num].sessions[data.players[num].sessions.length - 1].country,
                    new Date(data.sessions[lastChange[lastChange.length - 1]].startDate),
                    new Date(data.sessions[data.players[num].sessions.length - 1].startDate)]);
            }
        }
    }

    let options = {
        timeline: {
            showRowLabels: false
        }
    };

    chartTagsTimeLine.draw(dataTagsTimeLines, options);
};

let changePlayer = function (num) {
    countryPlate.classList.remove("deadCountry");

    if (document.getElementById("deadCountryText")) {
        document.getElementById("deadCountryText").remove();
    }

    fillCountry(countryPlate, num);

    cleanTables();

    addTagsTimeLine(num);

    let i = 0;

    data.players[num].sessions.forEach((session) => {
        dataStats.addRow(['Session ' + (i), session.dev, session.income, session.manpower, session.forceLimit, session.nbProv, session.losses, session.loan, session.professionalism]);
        dataRank.addRow(['Session ' + (i), session.devRank, session.devRank, session.incomeRank, session.incomeRank, session.manpowerRank, session.manpowerRank, session.forceLimitRank, session.forceLimitRank]);
        dataDev.addRow(['Session ' + (i), session.dev,
            session.devEvol !== undefined ? (session.dev + ' (' + (session.devEvol >= 0 ? '+' : '') + session.devEvol + '%)') : session.dev.toString()]);
        dataIncome.addRow(['Session ' + (i), session.income,
            session.incomeEvol !== undefined ? (session.income + ' (' + (session.incomeEvol >= 0 ? '+' : '') + session.incomeEvol + '%)') : session.income.toString()]);
        dataManpower.addRow(['Session ' + (i), session.manpower,
            session.manpowerEvol !== undefined ? (session.manpower + ' (' + (session.manpowerEvol >= 0 ? '+' : '') + session.manpowerEvol + '%)') : session.manpower.toString()]);
        dataForceLimit.addRow(['Session ' + (i), session.forceLimit,
            session.forceLimitEvol !== undefined ? (session.forceLimit + ' (' + (session.forceLimitEvol >= 0 ? '+' : '') + session.forceLimitEvol + '%)') : session.forceLimit.toString()]);
        dataNbProvinces.addRow(['Session ' + (i), session.nbProv,
            session.nbProvEvol !== undefined ? (session.nbProv + ' (' + (session.nbProvEvol >= 0 ? '+' : '') + session.nbProvEvol + ')') : session.nbProv.toString()]);
        dataLosses.addRow(['Session ' + (i), session.losses,
            session.lossesEvol !== undefined ? (session.losses + ' (' + (session.lossesEvol >= 0 ? '+' : '') + session.lossesEvol + '%)') : session.losses.toString()]);
        dataProfessionalism.addRow(['Session ' + (i), session.professionalism,
            session.professionalismEvol !== undefined ? (session.professionalism + ' (' + (session.professionalismEvol >= 0 ? '+' : '') + session.professionalismEvol + ')') : session.professionalism.toString()]);
        i++;
    });

    chartRank.draw(dataRank, optionsLine);
    chartStats.draw(dataStats, optionsTable);
    chartDev.draw(dataDev, options);
    chartIncome.draw(dataIncome, options);
    chartManpower.draw(dataManpower, options);
    chartForceLimit.draw(dataForceLimit, options);
    chartNbProvinces.draw(dataNbProvinces, options);
    chartLosses.draw(dataLosses, options);
    chartProfessionalism.draw(dataProfessionalism, options);
};