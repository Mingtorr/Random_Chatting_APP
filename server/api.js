

function api(params,name) {
    return ('http://192.168.1.113:'+`${params}`+`/${name}`)
}


module.exports = {
    api
};