/**
 * If there are no rows return an empty object as http response
 * @param {object} rows 
 * @returns 
 */
function emptyOrRows(rows) {
    if (!rows) {
      return [];
    }
    return rows;
}

module.exports = {
    emptyOrRows
}