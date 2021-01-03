function api(params, name) {
  return 'http://192.168.42.191:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
