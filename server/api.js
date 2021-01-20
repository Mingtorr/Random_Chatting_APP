function api(params, name) {
  return 'http://34.64.151.54:' + `${params}` + `/${name}`;
   //return 'http://172.20.10.2:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
