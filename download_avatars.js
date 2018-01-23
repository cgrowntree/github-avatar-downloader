var request = require('request');
var github_token = require('./secrets');
var fs = require('fs');
var owner = process.argv[2];
var repo = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': github_token
    }
  };

  if (repoOwner && repoName) {
    request(options, function(err, res, body) {
      var parseBody = JSON.parse(body);
      cb(err, parseBody);
    });
  } else {
    console.log("!!!Please specify the 'owner' and 'repo' in two separate arguments after 'node download_avatars.js'!!!");
  }
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(owner, repo, function(err, result) {
  console.log("Errors:", err);
  for (var i = 0; i < result.length; i++) {
    var contributor = result[i];
    var url = contributor.avatar_url;
    var filePath = 'avatars/' + contributor.login + '.jpg';
    downloadImageByURL(url, filePath);
  }

});