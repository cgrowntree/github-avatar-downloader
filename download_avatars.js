var request = require('request');
var github_token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': github_token
    }
  };

  request(options, function(err, res, body) {
    var parseBody = JSON.parse(body);
    cb(err, parseBody);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (var i = 0; i < result.length; i++) {
    var contributor = result[i];
    console.log(contributor.avatar_url);
  }

});