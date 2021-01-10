function api(params, name) {
  // return 'http://34.64.151.54:' + `${params}` + `/${name}`;
  return 'http://172.30.1.53:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
