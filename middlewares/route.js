const { ValidationError } = require('../lib/errors');
/**
 * validate req.body against a joi schema. Mutates req.body with the result of the
 * validation to pick up default values
 */
const validateBody = (schema, options = {}) => {
  return (req, res, next) => {
    const schemaResult = schema.validate(req.body, options);
    if (schemaResult.error) {
      next(new ValidationError(schemaResult.error.details[0].message));
      return;
    }
    req.body = schemaResult.value;
    next();
  };
};

module.exports = {
  validateBody,
}