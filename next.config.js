const { withFrameworkConfig } = require('./framework/common/config');

module.exports = withFrameworkConfig({
  i18n: { locales: ['en-US', 'es'], defaultLocale: 'en-US' },
});
