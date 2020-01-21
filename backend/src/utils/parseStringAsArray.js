module.exports =  function parseStringAsArray(arrayAsString){
    return arrrayAsString = arrayAsString.split(',').map(tech => tech.trim());
}