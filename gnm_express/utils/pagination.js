

const paginatedResults=async (model, req) =>{
  const page = parseInt(req.query.page) || 1;
  const limit = req.query.limit * 1 || 100;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let results = {};
  if (endIndex < await model.countDocuments().exec()) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  results = await model.find().skip(startIndex).limit(limit).exec();
  console.log(results);
  return results;
};


module.exports = {
  paginatedResults,
};
