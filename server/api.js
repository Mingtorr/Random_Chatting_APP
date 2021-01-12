function api(params, name) {
<<<<<<< HEAD
  return 'http://34.64.151.54:' + `${params}` + `/${name}`;
  // return 'http://192.168.1.132:' + `${params}` + `/${name}`;
=======
  // return 'http://34.64.151.54:' + `${params}` + `/${name}`;
  return 'http://192.168.43.161:' + `${params}` + `/${name}`;
  
>>>>>>> won
}
function dbPassWord(){
  return 'root'
}
module.exports = {
  api,
};
