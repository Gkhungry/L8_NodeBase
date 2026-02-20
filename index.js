require('dotenv').config();

console.log('Пользователь:', {
    firstname: process.env.FIRSTNAME,
    lastname: process.env.LASTNAME,
    group: process.env.GROUP,
    number: process.env.NUMBER
});

console.log('Режим:', process.env.MODE);

const bcrypt = require('bcryptjs');

async function hashPasswords() {
    console.log(' Старт хеширования 13 паролей (bcryptjs, 13 rounds)...');
    const passwords = Array.from({ length: 13 }, (_, i) => `password_${i + 1}`);

    const promises = passwords.map(async (pass, index) => {
        const start = Date.now();
        const hash = await bcrypt.hash(pass, 13); // 13 раундов — как в задании
        const time = Date.now() - start;
        console.log(`Пароль ${index + 1}: ${time} ms | ${hash}`);
        return time;
    });

    const times = await Promise.all(promises);
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    console.log(`\n Среднее время: ~${Math.round(avg)} ms на пароль.`);
}
hashPasswords();

console.log('Запуск use.js...');
require('./use');
