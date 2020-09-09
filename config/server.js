module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'caccd7af9600e73cdf71ff4b7970587b'),
    },
  },
  cron: {
    enabled: true
  }
});
