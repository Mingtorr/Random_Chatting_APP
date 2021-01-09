function api(params, name) {
  return 'http://192.168.0.4:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
