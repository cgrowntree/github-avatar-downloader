var request = require('request');
var github_token = require('./secrets');
var fs = require('fs');

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

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(process.argv[2], process.argv[3], function(err, result) {
  console.log("Errors:", err);
  for (var i = 0; i < result.length; i++) {
    var contributor = result[i];
    var url = contributor.avatar_url;
    var filePath = 'avatars/' + contributor.login + '.jpg';
    downloadImageByURL(url, filePath);
  }

});