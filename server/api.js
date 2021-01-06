

function api(params,name) {
    return ('http://172.30.1.45:'+`${params}`+`/${name}`)
}


module.exports = {
    api
};