module.exports = function(target, ...sources) {
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      const val = source[key];
      if (val !== undefined) {
        target[key] = val;
      }
    });
  });
  return target;
};
