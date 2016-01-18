angular.module("listApp", [])
	.controller("ListController", function() {
		var list = this;
		list.items = [
		{text: "YouTube", url: "http://youtube.com/"},
		{text: "Facebook", url: "http://facebook.com/"},
		{text: "Twitter", url: "http://twitter.com/"},
		{text: "Quora", url: "http://quora.com/"},
		{text: "FCC Gitter", url: "http://gitter.im/freecodecamp/freecodecamp"},
		{text: "Code Newbie Slack", url: "http://codenewbie.slack.com/"},
		{text: "Github", url: "http://github.com/"},
		{text: "Linkedin", url: "http://linkedin.com/"},
		{text: "Free Code Camp", url: "http://freecodecamp.com/"},
		{text: "GMail - PDS", url: "https://mail.google.com/mail/u/0/"},
		{text: "GMail - Trash", url: "https://mail.google.com/mail/u/1/"},
		{text: "Spotify", url: "https://spotify.com"}];
	});