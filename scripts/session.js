let titleDiv;
let mapRef;
let mapImg;
let saveFileRef;

let dashboardGeneral;
let chartDev;
let chartIncome;
let chartManpower;
let chartForceLimit;
let chartNbProvinces;
let chartLosses;
let chartProfessionalism;

let dataGeneral;
let dataDev;
let dataIncome;
let dataManpower;
let dataForceLimit;
let dataNbProvinces;
let dataLosses;
let dataProfessionalism;

let stringFilterGeneral;
let chartGeneral;

window.onload = function () {
    google.charts.load('current', {'packages': ['corechart', 'bar', 'table', 'controls']});
    google.charts.setOnLoadCallback(init);
};

let init = function () {
    titleDiv = document.getElementById('title');
    mapRef = document.getElementById('mapRef');
    mapImg = document.getElementById('mapImg');
    saveFileRef = document.getElementById('saveFile');

    fillListSessions();

    let dashboardGeneralDiv = document.getElementById('dashboard-General');
    let chartDevDiv = document.getElementById('chart-Dev');
    let chartIncomeDiv = document.getElementById('chart-Income');
    let chartManpowerDiv = document.getElementById('chart-Manpower');
    let chartForceLimitDiv = document.getElementById('chart-ForceLimit');
    let chartNbProvincesDiv = document.getElementById('chart-NbProvinces');
    let chartLossesDiv = document.getElementById('chart-Losses');
    let chartProfessionalismDiv = document.getElementById('chart-Professionalism');

    dashboardGeneral = new google.visualization.Dashboard(dashboardGeneralDiv);
    chartDev = new google.visualization.ColumnChart(chartDevDiv);
    chartIncome = new google.visualization.ColumnChart(chartIncomeDiv);
    chartManpower = new google.visualization.ColumnChart(chartManpowerDiv);
    chartForceLimit = new google.visualization.ColumnChart(chartForceLimitDiv);
    chartNbProvinces = new google.visualization.ColumnChart(chartNbProvincesDiv);
    chartLosses = new google.visualization.ColumnChart(chartLossesDiv);
    chartProfessionalism = new google.visualization.ColumnChart(chartProfessionalismDiv);

    dataGeneral = new google.visualization.DataTable();
    dataDev = new google.visualization.DataTable();
    dataIncome = new google.visualization.DataTable();
    dataManpower = new google.visualization.DataTable();
    dataForceLimit = new google.visualization.DataTable();
    dataNbProvinces = new google.visualization.DataTable();
    dataLosses = new google.visualization.DataTable();
    dataProfessionalism = new google.visualization.DataTable();

    dataGeneral.addColumn('string', 'Joueur (Pays)');
    dataGeneral.addColumn('number', 'Developpement');
    dataGeneral.addColumn('number', 'Revenu');
    dataGeneral.addColumn('number', 'Reserve militaire');
    dataGeneral.addColumn('number', 'Limite terrestre');
    dataGeneral.addColumn('number', 'Nombre de provinces');
    dataGeneral.addColumn('number', 'Pertes');
    dataGeneral.addColumn('number', 'Emprun');
    dataGeneral.addColumn('number', 'Professionnalisme');

    stringFilterGeneral = new google.visualization.ControlWrapper({
        "controlType": "StringFilter",
        "containerId": "control-General",
        "options": {
            "filterColumnIndex": 0,
            "matchType": "any",
            "ui": {
                "label": "Rechercher",
                "labelStacking": "vertical",
                "placeholder": "Joueur"
            }
        }
    }
    );

    chartGeneral = new google.visualization.ChartWrapper({
        "chartType": "Table",
        "containerId": "chart-General",
        "options": {
            "alternatingRowStyle": true,
            "showRowNumber": true,
            "width": "100%",
            "allowHtml": true,
            "cssClassNames": {
                "tableRow": "tableRow",
                "oddTableRow": "tableRow",
                "tableCell": "tableCell",
                "headerCell": "tableHeader"
            }
        }
    }
    );

    drawSession(data.nbSessions);
};


let changeSession = function (num) {
    drawSession(num);
};

let cleanTables = function () {
    dataGeneral.removeRows(0, dataGeneral.getNumberOfRows());
    dataDev.removeRows(0, dataDev.getNumberOfRows());
    dataIncome.removeRows(0, dataIncome.getNumberOfRows());
    dataManpower.removeRows(0, dataManpower.getNumberOfRows());
    dataForceLimit.removeRows(0, dataForceLimit.getNumberOfRows());
    dataNbProvinces.removeRows(0, dataNbProvinces.getNumberOfRows());
    dataLosses.removeRows(0, dataLosses.getNumberOfRows());
    dataProfessionalism.removeRows(0, dataProfessionalism.getNumberOfRows());

    dataDev.removeColumns(0, dataDev.getNumberOfColumns());
    dataIncome.removeColumns(0, dataIncome.getNumberOfColumns());
    dataManpower.removeColumns(0, dataManpower.getNumberOfColumns());
    dataForceLimit.removeColumns(0, dataForceLimit.getNumberOfColumns());
    dataNbProvinces.removeColumns(0, dataNbProvinces.getNumberOfColumns());
    dataLosses.removeColumns(0, dataLosses.getNumberOfColumns());
    dataProfessionalism.removeColumns(0, dataProfessionalism.getNumberOfColumns());
};

let fillListSessions = function () {
    let i = 1;
    let listSessions = document.getElementById("listSessions");

    data.sessions.forEach(() => {
        let option = document.createElement("option");
        option.text = 'Session ' + i;
        option.value = i;
        listSessions.add(option);

        if(i === data.nbSessions) {
            option.selected = true;
        }
        i++;
    });
};

let drawSession = function (num) {

    cleanTables();

    dataDev.addColumn('string', 'Joueur');
    dataDev.addColumn('number', 'Session ' + num);

    dataIncome.addColumn('string', 'Joueur');
    dataIncome.addColumn('number', 'Session ' + num);

    dataManpower.addColumn('string', 'Joueur');
    dataManpower.addColumn('number', 'Session ' + num);

    dataForceLimit.addColumn('string', 'Joueur');
    dataForceLimit.addColumn('number', 'Session ' + num);

    dataNbProvinces.addColumn('string', 'Joueur');
    dataNbProvinces.addColumn('number', 'Session ' + num);

    dataLosses.addColumn('string', 'Joueur');
    dataLosses.addColumn('number', 'Session ' + num);

    dataProfessionalism.addColumn('string', 'Joueur');
    dataProfessionalism.addColumn('number', 'Session ' + num);

    if(num === 1) {
        data.players.forEach((player) => {
            if (player.sessions.length >= num) {
                let sessionStats = player.sessions[num - 1];

                dataGeneral.addRow([player.pseudo, sessionStats.dev, sessionStats.income, sessionStats.manpower, sessionStats.forceLimit, sessionStats.nbProv, sessionStats.losses, sessionStats.loan, sessionStats.professionalism]);
                dataDev.addRow([player.pseudo, sessionStats.dev]);
                dataIncome.addRow([player.pseudo, sessionStats.income]);
                dataManpower.addRow([player.pseudo, sessionStats.manpower]);
                dataForceLimit.addRow([player.pseudo, sessionStats.forceLimit]);
                dataNbProvinces.addRow([player.pseudo, sessionStats.nbProv]);
                dataLosses.addRow([player.pseudo, sessionStats.losses]);
                dataProfessionalism.addRow([player.pseudo, sessionStats.professionalism]);
            }

        });

    } else {
        dataDev.addColumn({type: 'string', role: 'annotation'});
        dataDev.addColumn('number', 'Session ' + (num - 1));

        dataIncome.addColumn({type: 'string', role: 'annotation'});
        dataIncome.addColumn('number', 'Session ' + (num - 1));

        dataManpower.addColumn({type: 'string', role: 'annotation'});
        dataManpower.addColumn('number', 'Session ' + (num - 1));

        dataForceLimit.addColumn({type: 'string', role: 'annotation'});
        dataForceLimit.addColumn('number', 'Session ' + (num - 1));

        dataNbProvinces.addColumn({type: 'string', role: 'annotation'});
        dataNbProvinces.addColumn('number', 'Session ' + (num - 1));

        dataLosses.addColumn({type: 'string', role: 'annotation'});
        dataLosses.addColumn('number', 'Session ' + (num - 1 ));

        dataProfessionalism.addColumn({type: 'string', role: 'annotation'});
        dataProfessionalism.addColumn('number', 'Session ' + (num - 1));

        data.players.forEach((player) => {
            if (player.sessions.length >= num) {
                let sessionStats = player.sessions[num - 1];
                let previousSessionStats =  player.sessions[num - 2];

                dataGeneral.addRow([player.pseudo, sessionStats.dev, sessionStats.income, sessionStats.manpower, sessionStats.forceLimit, sessionStats.nbProv, sessionStats.losses, sessionStats.loan, sessionStats.professionalism]);
                dataDev.addRow([player.pseudo, sessionStats.dev, (sessionStats.devEvol >= 0 ? '+' : '') + sessionStats.devEvol + '%', previousSessionStats.dev]);
                dataIncome.addRow([player.pseudo, sessionStats.income, (sessionStats.incomeEvol >= 0 ? '+' : '') + sessionStats.incomeEvol + '%', previousSessionStats.income]);
                dataManpower.addRow([player.pseudo, sessionStats.manpower, (sessionStats.manpowerEvol >= 0 ? '+' : '') + sessionStats.manpowerEvol + '%', previousSessionStats.manpower]);
                dataForceLimit.addRow([player.pseudo, sessionStats.forceLimit, (sessionStats.forceLimitEvol >= 0 ? '+' : '') + sessionStats.forceLimitEvol + '%', previousSessionStats.forceLimit]);
                dataNbProvinces.addRow([player.pseudo, sessionStats.nbProv, (sessionStats.nbProvEvol >= 0 ? '+' : '') + sessionStats.nbProvEvol , previousSessionStats.nbProv]);
                dataLosses.addRow([player.pseudo, sessionStats.losses, (sessionStats.lossesEvol >= 0 ? '+' : '') + sessionStats.lossesEvol + '%', previousSessionStats.losses]);
                dataProfessionalism.addRow([player.pseudo, sessionStats.professionalism, (sessionStats.professionalismEvol >= 0 ? '+' : '') + sessionStats.professionalismEvol.toPrecision(sessionStats.professionalismEvol.toString().indexOf('.') >= 0 ? sessionStats.professionalismEvol.toString().indexOf('.') : sessionStats.professionalismEvol.toString().length) , previousSessionStats.professionalism]);
            }

        });
    }

    dataDev.sort({column: 1, desc: true});
    dataIncome.sort({column: 1, desc: true});
    dataManpower.sort({column: 1, desc: true});
    dataForceLimit.sort({column: 1, desc: true});
    dataNbProvinces.sort({column: 1, desc: true});
    dataLosses.sort({column: 1, desc: true});dataProfessionalism.sort({column: 1, desc: true});

    dashboardGeneral.bind(stringFilterGeneral, chartGeneral);

    titleDiv.innerText = 'Session ' + num;
    mapRef.href = './images/sessions/session' + num + '.jpg';
    mapImg.src = './images/sessions/session' + num + '.jpg';
    saveFileRef.href = './saves/session' + num + '.eu4';

    dashboardGeneral.draw(dataGeneral);
    chartDev.draw(dataDev, options);
    chartIncome.draw(dataIncome, options);
    chartManpower.draw(dataManpower, options);
    chartForceLimit.draw(dataForceLimit, options);
    chartNbProvinces.draw(dataNbProvinces, options);
    chartLosses.draw(dataLosses, options);
    chartProfessionalism.draw(dataProfessionalism, options);
};
