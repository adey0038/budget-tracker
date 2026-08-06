export const validateCrap = (req, res, next) => {
  const { title, description } = req.sanitizedBody || req.body;

  // title is required
  if (!title) return res.status(400).json({ error: "Title is required" });

  // title must be at least 3 characters
  if (title.length < 3)
    return res
      .status(400)
      .json({ error: "Title must be at least 3 characters" });

  // title must not exceed 255 characters
  if (title.length > 255)
    return res
      .status(400)
      .json({ error: "Title must be less than 255 characters" });

  // description is required
  if (!description)
    return res.status(400).json({ error: "Description is required" });

  // description must be at least 3 characters
  if (description.length < 3)
    return res
      .status(400)
      .json({ error: "Description must be at least 3 characters" });

  // description must not exceed 255 characters
  if (description.length > 255)
    return res
      .status(400)
      .json({ error: "Description must be less than 255 characters" });

  // check avatar instead of req.file
  if (!req.files.image)
    return res.status(400).json({ error: "Image is required" });

  next();
};

export const validateSuggest = (req, res, next) => {
  const { address, date, time } = req.sanitizedBody || req.body;

  // address is required for pickup suggestion
  if (!address) return res.status(400).json({ error: "Address is required" });

  // date is required for pickup suggestion
  if (!date) return res.status(400).json({ error: "Date is required" });

  // time is required for pickup suggestion
  if (!time) return res.status(400).json({ error: "Time is required" });

  next();
};
