function api(params, name) {
  return 'http://192.168.1.106:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
