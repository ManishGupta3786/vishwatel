const validator = require("../helper/validate");
var CONST = require("../config/constant");
const { ResponseStatus } = CONST;

// Sign up validate
const signup = (req, res, next) => {
  let validationRule = {
    email: "required|email",
    username: "required|string",
    password: "required|string|min:8",
    account_type: "required|string",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.json({
        status: ResponseStatus.NoContent,
        message: errorResponse[0],
        // 'data':[]
      });
    } else {
      next();
    }
  });
};

const socialsignup = (req, res, next) => {
  let validationRule = {
    username: "required|string",
    provider_id: "required|string",
    account_type: "required|string",
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.json({ status: ResponseStatus.NoContent, message: errorResponse[0] });
    } else {
      next();
    }
  });
};

const propertyComment = (req, res, next) => {
  const validationRule = {
    property_id: "required",
    comment: "required",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.json({ status: ResponseStatus.NoContent, message: errorResponse[0] });
    } else {
      next();
    }
  });
};

// Login validate.
const login = (req, res, next) => {
  const validationRule = {
    username: "required|string",
    password: "required|string|min:6",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.json({ status: ResponseStatus.NoContent, message: errorResponse[0] });
    } else {
      next();
    }
  });
};

// User social login
const socialLogin = (req, res, next) => {
  const validationRule = {
    // "type": "required",
    // "first_name": "required",
    // "last_name": "required",
    // "email": "required",
    // "profile": "required",
    // "role": "required",
    provider_id: "required",
    provider_type: "required",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.status(422).send({
        status: ResponseStatus.NoContent,
        message: errorResponse[0],
        // data: []
      });
    } else {
      next();
    }
  });
};

const userIdValidation = (req, res, next) => {
  const validationRule = {
    user_id: "required",
  };
  validator(req.query, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.status(422).send({
        status: ResponseStatus.NoContent,
        message: errorResponse[0],
        // data: []
      });
    } else {
      next();
    }
  });
};
//
const changePassword = (req, res, next) => {
  const validationRule = {
    current_password: "required",
    new_password: "required",
    confirm_password: "required",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.status(422).send({
        status: ResponseStatus.NoContent,
        message: errorResponse[0],
        // data: []
      });
    } else {
      next();
    }
  });
};

const addFeature = (req, res, next) => {
  const validationRule = {
    name: "required",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.json({ success: false, message: errorResponse[0], data: [] });
    } else {
      next();
    }
  });
};

const idRequired = (req, res, next) => {
  const validationRule = {
    id: "required|numeric",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.json({ success: false, message: errorResponse[0], data: [] });
    } else {
      next();
    }
  });
};

const imageValidation = (req, res, next) => {
  const validationRule = {
    images: "required",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.json({ success: false, message: errorResponse[0], data: [] });
    } else {
      next();
    }
  });
};

const updateFeature = (req, res, next) => {
  const validationRule = {
    id: "required|numeric",
    name: "required|string",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.json({ success: false, message: errorResponse[0], data: [] });
    } else {
      next();
    }
  });
};

const addProperty = (req, res, next) => {
  const validationRule = {
    type: "required",
    // "lat": "required|numeric",
    // "long": "required|numeric",
    title: "required|string",
    description: "required|string",
    price: "required|numeric",
    is_negotiable: "required",
    property_for: "required|string",
    furnished: "required|string",
    built_year: "required|numeric",
    area: "required|numeric",
    no_floor: "required|numeric",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      var errorResponse = [];
      for (const [key, value] of Object.entries(err["errors"])) {
        errorResponse.push(value[0]);
      }
      res.json({ success: false, message: errorResponse[0], data: [] });
    } else {
      next();
    }
  });
};

module.exports = {
  signup,
  socialsignup,
  userIdValidation,
  login,
  socialLogin,
  changePassword,
  addFeature,
  addProperty,
  idRequired,
  imageValidation,
  updateFeature,
  propertyComment,
};
