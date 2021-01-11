function api(params, name) {
  return '192.168.1.149:' + `${params}` + `/${name}`;
  // return 'http://192.168.1.132:' + `${params}` + `/${name}`;
  
}
module.exports = {
  api,
};
