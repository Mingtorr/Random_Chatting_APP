

function api(params,name) {
    return ('http://172.20.10.2:'+`${params}`+`/${name}`)
}


module.exports = {
    api
};