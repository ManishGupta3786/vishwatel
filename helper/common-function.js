const url = require("url");
const path = require("path");
const bcrypt = require("bcrypt");

//const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
// functio to save images
exports.uploadFileFunc = async (file, flag) => {
  try {
    let save_path;
    if (flag === "userProfile") {
      save_path = "../public/uploads/userProfile";
    } else {
      save_path = "../public/uploads/propertyImages";
    }
    let fileName = Date.now() + "-" + file.name;
    let upload_path = path.join(__dirname, save_path, fileName);
    file.mv(upload_path);
    return fileName;
  } catch (err) {
    return err;
  }
};

// to check if coming id is objectId or not
exports.checkObjectId = (id) => {
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return true;
  } else {
    return false;
  }
};

// function to encrypted any string or password
exports.encryptedValue = async (value) => {
  let encrytedValue = await bcrypt.hash(value, 10);
  return encrytedValue;
};

//  function to compare original string from encrypted string
exports.compareValue = async (value, hash) => {
  console.log("value", value, "hash", hash);
  return bcrypt.compare(value, hash);
};
