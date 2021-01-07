

function api(params,name) {
    return ('http://192.168.43.161:'+`${params}`+`/${name}`)
}
module.exports = {
  api,
};
