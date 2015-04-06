'use strict';


World.prototype.start = function (dTime) {

	this.timeUntilAnnouncement = ironbaneConstants.serverAnnouncementsTimeout;

	this.startTime = (new Date()).getTime();
};

World.prototype.update = function (dTime) {

	this.timeUntilAnnouncement -= dTime;
	if (this.timeUntilAnnouncement <= 0) {
		var messages = sharedIbUtil.chooseFromSequence([

			// Actually these shouldn't be done using arrays, I just don't know how to insert raw html (<br>)
			// and have angular not filter these out.
			// Would be cool though to have links etc to twitter and our homepage

            [
            	'Welcome to Ironbane ' + ironbaneConstants.GAME_VERSION + '!',
            	'Server uptime: ' + sharedIbUtil.timeSince(this.startTime)
        	],

            [
            	'Note that Ironbane is in pre-alpha stage.',
            	'Please report all bugs in the forum.'
        	],

            // TODO implement /stuck
            // 'Are you stuck? Type /stuck to be teleported back to town.',

            [
            	'Did you know Ironbane has a newsletter?',
            	'Simply go to our homepage to sign up.'
        	],

            [
            	'Follow us on Twitter! @IronbaneMMO'
        	],

            // Not sure if we should still add IRC
            // 'Join us on IRC! #ironbane on chat.freenode.net',

		]);

		messages.forEach(function (msg) {
			Meteor.call('chatAnnounce', msg, {server: true});
		});

		this.timeUntilAnnouncement = ironbaneConstants.serverAnnouncementsTimeout;
	}

};
