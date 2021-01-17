function api(params, name) {
  //return 'http://34.64.151.54:' + `${params}` + `/${name}`;
   return 'http://192.168.1.110:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
