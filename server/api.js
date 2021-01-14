function api(params, name) {
  // return 'http://34.64.151.54:' + `${params}` + `/${name}`;
  return 'http://192.168.43.161:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
