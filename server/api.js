

function api(params,name) {
    return ('http://172.20.10.3:'+`${params}`+`/${name}`)
}


module.exports = {
    api
};