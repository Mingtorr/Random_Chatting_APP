function api(params, name) {
  return 'http://34.64.151.54:' + `${params}` + `/${name}`;
<<<<<<< HEAD
    //return 'http://192.168.1.110:' + `${params}` + `/${name}`;
=======
  // return 'http://192.168.0.4:' + `${params}` + `/${name}`;
>>>>>>> 08830ead672ff2873d18453930097a0ef6757ec3
}
module.exports = {
  api,
};
