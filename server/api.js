
function api(params,name) {
    return ('http://192.168.1.132:'+`${params}`+`/${name}`)

}
module.exports = {
  api,
};
