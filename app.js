'use strict';

const hours = [
    '', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm',
    '5:00pm', '6:00pm', '7:00pm', '8:00pm', 'Daily Location Total'
];

const hourTotal = ['Totals By Hour',0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

const createTable = function() {
    const cookieSection = document.getElementById('cookie-section');
    const table = document.createElement('table');
    cookieSection.appendChild(table);
    table.setAttribute('id', 'cookie-table');
};

const buildTableHeader = function() {
    const table = document.getElementById('cookie-table');
    const tableHead = document.createElement('thead');
    table.appendChild(tableHead);

    const tableRow = document.createElement('tr');
    tableHead.appendChild(tableRow);

    for (let i = 0; i < hours.length; i++) {
        const tableCell = document.createElement('th');
        tableHead.appendChild(tableCell);
        tableCell.textContent = hours[i];
    }
};

const buildTableFooter = function () {
    const table = document.getElementById('cookie-table');
    const tableFoot = document.createElement('tfoot');
    table.appendChild(tableFoot);

    const tableRow = document.createElement('tr');
    tableFoot.appendChild(tableRow);

    for (let i = 0; i < hourTotal.length; i++) {
        const tableCell = document.createElement('td');
        tableFoot.appendChild(tableCell);
        tableCell.textContent = hourTotal[i];
    }
};

function Store(storeName, minCust, maxCust, avgCookiesPerCust) {
    this.storeName = storeName;
    this.minCust = minCust;
    this.maxCust = maxCust;
    this.avgCookiesPerCust = avgCookiesPerCust;
    this.estCookiesPerHour = [];
};

Store.prototype.calcCookiesHour = function() {
    const min = Math.ceil(this.minCust);
    const max = Math.floor(this.maxCust);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(randomNumber * this.avgCookiesPerCust);
};

Store.prototype.populateCookiesArray = function() {
    let totalCookies = 0;

    for (let i = 0; i < 15; i++) {
        const cookiesPerHour = this.calcCookiesHour();
        this.estCookiesPerHour[i] = cookiesPerHour;
        totalCookies += this.estCookiesPerHour[i];
        hourTotal[(i + 1)] += cookiesPerHour;
    }

    this.estCookiesPerHour.push(totalCookies);
};

Store.prototype.render = function () {
    const cookieSection = document.getElementById('cookie-table');
    const newTableRow = document.createElement('tr');
    cookieSection.appendChild(newTableRow);

    let newCell = document.createElement('td');
    newTableRow.appendChild(newCell);
    newCell.textContent = this.storeName;

    for (let i = 0; i < this.estCookiesPerHour.length; i++) {
        newCell = document.createElement('td');
        newTableRow.appendChild(newCell);
        newCell.textContent = this.estCookiesPerHour[i];
    }
};

const activateStore = function(object) {
    object.populateCookiesArray();
    object.render();
};

const storePDX = new Store('PDX Airport', 23, 65, 6.3);
const storePioneer = new Store('Pioneer Square', 3, 24, 1.2);
const storePowells = new Store('Powell\'s', 11, 38, 3.7);
const storeStJohns = new Store('St. John\'s', 20, 38, 2.3);
const storeWaterfront = new Store('Waterfront', 2, 16, 4.6);

const buildTable = function() {
    createTable();
    buildTableHeader();
    activateStore(storePDX);
    activateStore(storePioneer);
    activateStore(storePowells);
    activateStore(storeStJohns);
    activateStore(storeWaterfront);
    buildTableFooter();    
};

buildTable();