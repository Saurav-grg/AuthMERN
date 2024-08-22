const test = async (req, res) => {
  res.json({
    message: 'inside test',
  });
};
module.exports = {
  test,
};
