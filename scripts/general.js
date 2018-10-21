let generalOptions = {
    legend: {
        position: 'none'
    },
    theme: 'material',
    chartArea: {
        width: '95%',
        top: '30',
        bottom: '30'
    },
    vAxis: {
        format: 'short',
        minorGridlines: {
            'count': 4
        },
        textStyle: {
            color: 'black',
            fontName: 'Roboto',
            fontSize: 18,
            bold: true
        }
    },
    hAxis: {
        textStyle: {
            color: 'black',
            fontName: 'Roboto',
            fontSize: 18,
            bold: true
        }
    },
    annotations: {
        textStyle: {
            fontName: 'Roboto',
            fontSize: 18,
            bold: true,
        }
    }
};

window.onload = function () {
    document.getElementById("title").innerText = data.title;

    google.charts.load('current', {'packages': ['timeline', 'corechart']});
    google.charts.setOnLoadCallback(addTimeLine);
    google.charts.setOnLoadCallback(addTotalDev);
    google.charts.setOnLoadCallback(addTotalLosses);
};

let addTimeLine = function () {
    let sessionsTimeLinesDiv = document.getElementById('sessionsTimeLines');
    let sessionsTimeLinesChart = new google.visualization.Timeline(sessionsTimeLinesDiv);
    let sessionsTimeLinesTable = new google.visualization.DataTable();

    sessionsTimeLinesTable.addColumn({type: 'string', id: 'Count'});
    sessionsTimeLinesTable.addColumn({type: 'string', id: 'Session'});
    sessionsTimeLinesTable.addColumn({type: 'date', id: 'Start'});
    sessionsTimeLinesTable.addColumn({type: 'date', id: 'End'});

    sessionsTimeLinesTable.addRow(['Session', 'Session 0', new Date(1444, 10, 11), new Date(data.sessions[0].startDate)]);

    for (let i = 1; i < data.sessions.length; i++) {
        sessionsTimeLinesTable.addRow(['Session', 'Session ' + (i), new Date(data.sessions[i - 1].startDate), new Date(data.sessions[i].startDate)]);
    }

    let options = {
        timeline: {
            showRowLabels: false
        }
    };

    sessionsTimeLinesChart.draw(sessionsTimeLinesTable, options);
};

let addTotalDev = function () {
    let totalDevDiv = document.getElementById('totalDev');
    let totalDevChart = new google.visualization.ColumnChart(totalDevDiv);
    let totalDevTable = new google.visualization.DataTable();

    totalDevTable.addColumn('string', 'Sessions');
    totalDevTable.addColumn('number', 'Développement total');
    totalDevTable.addColumn({type: 'string', role: 'annotation'});

    totalDevTable.addRow(['Session 0', data.sessions[0].totalDev, data.sessions[0].totalDev.toString()]);

    for (let i = 1; i < data.sessions.length; i++) {
        totalDevTable.addRow(['Session ' + (i), data.sessions[i].totalDev, data.sessions[i].totalDev + ' (' + (data.sessions[i].totalDevEvol > 0 ? '+' : '-') + data.sessions[i].totalDevEvol + '%' + ')']);
    }

    totalDevChart.draw(totalDevTable, generalOptions);
};

let addTotalLosses = function () {
    let totalLossesDiv = document.getElementById('totalLosses');
    let totalLossesChart = new google.visualization.ColumnChart(totalLossesDiv);
    let totalLossesTable = new google.visualization.DataTable();

    totalLossesTable.addColumn('string', 'Sessions');
    totalLossesTable.addColumn('number', 'Pertes total');
    totalLossesTable.addColumn({type: 'string', role: 'annotation'});

    totalLossesTable.addRow(['Session 0', data.sessions[0].totalLosses, data.sessions[0].totalLosses.toString()]);

    for (let i = 1; i < data.sessions.length; i++) {
        totalLossesTable.addRow(['Session ' + (i), data.sessions[i].totalLosses, data.sessions[i].totalLosses + ' (' + (data.sessions[i].totalLossesEvol > 0 ? '+' : '-') + data.sessions[i].totalLossesEvol + '%' + ')']);
    }

    totalLossesChart.draw(totalLossesTable, generalOptions);
};