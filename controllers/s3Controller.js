const asyncHandler = require("express-async-handler");
const AWS = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");

const region = "us-east-2";
const bucketName = "lets-chat-images";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

const randomBytes = promisify(crypto.randomBytes);

exports.getS3Url = asyncHandler(async (req, res) => {
  const rawBytes = await randomBytes(16);
  const pictureName = rawBytes.toString("hex");
  const params = {
    Bucket: bucketName,
    Key: pictureName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);

  res.status(201).json(uploadURL);
});
