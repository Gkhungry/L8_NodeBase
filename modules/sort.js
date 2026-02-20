function sortLinesWithoutSpaces(lines) {
    return lines.split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .sort((a, b) => a.replace(/\s/g, '').localeCompare(b.replace(/\s/g, '')));
}

module.exports = { sortLinesWithoutSpaces };
