import computed from 'ember-addons/ember-computed-decorators';
import User from 'discourse/models/user';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ["poll-voters-list"],
  isExpanded: false,
  numOfVotersToShow: 20,

  @computed("pollsVoters", "option.voter_ids", "showMore", "isExpanded", "numOfVotersToShow")
  users(pollsVoters, voterIds, showMore, isExpanded, numOfVotersToShow) {
    var users = [];

    if (showMore && !isExpanded) {
      voterIds = voterIds.slice(0, numOfVotersToShow);
    }

    voterIds.forEach(voterId => {
      users.push(pollsVoters[voterId]);
    });

    return users;
  },

  @computed("option.votes", "numOfVotersToShow")
  showMore(numOfVotes, numOfVotersToShow) {
    return !(numOfVotes < numOfVotersToShow);
  },

  actions: {
    toggleExpand() {
      this.toggleProperty("isExpanded");
    }
  }
});
