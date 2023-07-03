

var ActiveDirectory = require("activedirectory");
const dotenv = require('dotenv');
dotenv.config();

// import ActiveDirectory from "activedirectory";

// import _ from "underscore";
var _ = require("underscore");

// create a constant for the query that will list all ldap users
const query = "(&(objectCategory=person)(objectClass=user))";

var opts = {
  includeMembership: ["all"], // Optionally can use 'all'
  includeDeleted: false,
};

var config = {
  url: process.env.LDAP_URL,
  baseDN: process.env.BASE_DOMAIN,
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
};

const ad = new ActiveDirectory(config);

ad.find(query, function (err, results) {
  console.log(results);

  if (err || !results) {
    console.log("ERROR: " + JSON.stringify(err));
    return;
  }

  console.log("Groups");
  _.each(results.groups, function (group) {
    console.log("  " + group.cn);
  });

  console.log("Users");
  _.each(results.users, function (user) {
    console.log("  " + user.cn);
  });

  console.log("Other");
  _.each(results.other, function (other) {
    console.log("  " + other.cn);
  });
});
