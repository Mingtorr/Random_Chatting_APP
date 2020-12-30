

function api(params, name) {
  return 'http://192.168.1.112:' + `${params}` + `/${name}`;
}
module.exports = {
  api,
};
