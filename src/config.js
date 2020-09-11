module.exports = {
  PORT: process.env.PORT || 5432,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgres://vaadjnvaopgava:885a007b19ae7cc36cef5fe5720543cde3e52edcdf56293fe1f33c39d88ef147@ec2-54-158-222-248.compute-1.amazonaws.com:5432/datkd2ur1h42k6',
  TEST_DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/nh-sources-test',
};