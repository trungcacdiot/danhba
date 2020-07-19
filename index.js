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

function lookingContactTen() {
    var tencantim = readlineSync.question('nhap ten can tim:');
    var tam = 0;
    for (var so of danhba) {
        if (tencantim === so.name) {
            console.log(so.name, so.sdt);
            tam += 1;
        }
    }
    if (tam === 0) {
        console.log('khong tim thay ten nay trong danh ba');
    }
}

function lookingContactSdt() {
    var sdtcantim = readlineSync.question('nhap sdt can tim:');
    var t = 0;
    for (var so of danhba) {
        if (parseInt(sdtcantim) === so.sdt) {
            console.log(so.name, so.sdt);
            t += 1;
        }
    }
    if (t === 0) {
        console.log('khong tim thay sdt nay trong danh ba');
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
    console.log('2. tim kiem contact theo ten, va hien len');
    console.log('3. tim kiem contact theo sdt, va hien len');
    console.log('4. xoa du lieu contact');
    console.log('5. list contact')
    var chucnang = readlineSync.question('>');
    switch (chucnang) {
        case '1':
            addContact();
            luaChon();
            break;
        case '2':
            lookingContactTen();
            luaChon();
            break;
        case '3':
            lookingContactSdt();
            luaChon();
            break;
        case '4':
            delContact();
            luaChon();
            break;
        case '5':
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
