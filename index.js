var isGenerator = require('moko').utils.isGenerator;

module.exports = function(Model) {
  for(var attr in Model.attrs) {
    checkAttr(attr, Model.attrs[attr]);
  }
  Model.on('attr', checkAttr);

  function checkAttr(attr, options) {
    if(options.default !== undefined) {
      Model.on('initializing', function*(m, attrs) {
        if(attrs[attr] === undefined) {
          if(options.default instanceof Function) {
            if(isGenerator(options.default)) {
              attrs[attr] = yield options.default(m);
            } else {
              attrs[attr] = options.default(m);
            }
          } else {
            attrs[attr] = options.default;
          }
        }
      });
    }
  }
};

