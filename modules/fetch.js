const fetch = require('node-fetch');

async function loadData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return { data, isLoading: false, error: null };
    } catch (error) {
        return { data: null, isLoading: false, error };
    }
}

module.exports = { loadData };
