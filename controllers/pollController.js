const Poll = require('../models/Poll');

exports.addPoll = (req, res) => {
  res.render('addPoll', {
    title: 'Add Poll'
  });
}

exports.addPollSubmit = async (req, res) => {
  let data = {}
  data.question = req.body.question;
  data.answers = req.body.answers.map((answer) =>  {
    return { answer, 'votes': 0 }
  });
  const poll = new Poll(data);
  const result = await poll.save();
  // TODO: slugs and redirect to new poll
  res.redirect(`/poll/${result.slug}`);
}
