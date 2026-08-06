import xss from "xss";
export const sanitizeBody = (req, res, next) => {
  if (!req.body) return next();
  const { id, _id, ...attributes } = req.body;
  for (const key in attributes) {
    attributes[key] = xss(attributes[key], {
      whiteList: [],
      stripIgnoreTag: true,
      stripIgnoreTagBody: ["script"],
    });
  }
  req.sanitizedBody = attributes;
  //the sanitizedBody property added to the request object
  //so we can use it later as the safe data
  next();
};
