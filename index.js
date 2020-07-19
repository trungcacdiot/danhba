var readlineSync = require('readline-Sync');
var fs = require('fs');
var danhba = [];

function addContact() {
    var name = readlineSync.question('name:');
    var sdt = readlineSync.question('sdt:');
    var tam = {
        name: name,
        sdt: parseInt(sdt)
    }
    danhba.push(tam);
    var content = JSON.stringify(danhba);
    fs.writeFileSync('./data.json', content, { encoding: 'utf8' });
}

function lookingContact() {
    var tencantim = readlineSync.question('nhap ten can tim:');
    for (var so of danhba) {
        if (tencantim === so.name) {
            console.log(so.name, so.sdt);
        }
    }
}


function loadData() {
    var fileContent = fs.readFileSync('./data.json');
    danhba = JSON.parse(fileContent);
}

function delContact() {
    var tencanxoa = readlineSync.question('nhap ten can xoa:');
    var danhBaMoi = danhba.filter(function(i) {
        return i.name !== tencanxoa;
    })
    danhba = danhBaMoi;
    var content = JSON.stringify(danhba);
    fs.writeFileSync('./data.json', content, { encoding: 'utf8' });
}

function lisContact() {
    for (var so of danhba) {
        console.log(so.name, so.sdt);
    }
}

function luaChon() {
    console.log('1. them du lieu contact');
    console.log('2. tim kiem contact, va hien len');
    console.log('3. xoa du lieu contact');
    console.log('4. list contact')
    var chucnang = readlineSync.question('>');
    switch (chucnang) {
        case '1':
            addContact();
            luaChon();
            break;
        case '2':
            lookingContact();
            luaChon();
            break;
        case '3':
            delContact();
            luaChon();
            break;
        case '4':
            lisContact();
            luaChon();
            break;
        default:
            console.log('chon sai roi');
            luaChon();

    }
}

function main() {
    loadData();
    luaChon();
}
main();