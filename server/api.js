function api(params, name) {
  return 'http://192.168.200.109:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
