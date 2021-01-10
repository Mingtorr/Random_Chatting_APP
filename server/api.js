function api(params, name) {
  return 'http://192.168.1.149:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
