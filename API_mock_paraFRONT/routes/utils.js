// utils.js
function showStatus(res) {
    console.log("Mensaje de estado: " + res.statusMessage);
    console.log("Código de estado: " + res.statusCode);
}

module.exports = { showStatus };
