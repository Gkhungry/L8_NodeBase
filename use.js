const { loadData } = require('./modules/fetch');
const { sortLinesWithoutSpaces } = require('./modules/sort');
const fs = require('fs');

async function main() {
    console.log('Загрузка users...');
    const result = await loadData('https://jsonplaceholder.typicode.com/users');

    if (result.error) {
        console.log('Ошибка загрузки:', result.error.message);
        return;
    }

    const names = sortLinesWithoutSpaces(result.data.map(u => u.name).join('\n'));
    const emails = result.data.map(u => u.email).join('\n');


    if (!fs.existsSync('users')) {
        fs.mkdirSync('users');
    }

    fs.writeFileSync('users/names.txt', names.join('\n'));
    fs.writeFileSync('users/emails.txt', emails);

    console.log('users/names.txt и users/emails.txt созданы');
}

main().catch(console.error);
