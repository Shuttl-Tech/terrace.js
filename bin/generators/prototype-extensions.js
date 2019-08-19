const TEMPLATE_VARIABLE_REGEX = /___([a-z]+)___/ig;

// Note: It is known that overriding native class prototypes isn't a good idea,
// so here's hoping that there's never a `process` method on the String prototype.
// Syntactical sugar y'all.
String.prototype.process = function (data) {
  return this.replace(TEMPLATE_VARIABLE_REGEX, (_, param) => data[param]);
};

Array.prototype.makePath = function () {
  return this.join('/');
};
