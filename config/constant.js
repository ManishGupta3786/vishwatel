var constant = {
  SENDER_EMAIL: "node@framework.infowindtech.biz",
  ResponseStatus: {
    Success: 200,
    NoContent: 204,
    NotFound: 404,
    AlreadyExist: 409,
    ERROR: 203,
    BadRequest: 400,
    InvalidData: 208,
    NotAcceptable: 406,
    Unathorised: 401,
    Forbidden: 403,
    Timeout: 504,
    LengthRequired: 411,

    ServerError: 500,
  },
  BASE_URL : "http://localhost:8000",
};
module.exports = constant;
