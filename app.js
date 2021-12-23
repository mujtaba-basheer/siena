const AWS = require("aws-sdk");
const minify = require("babel-minify");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const creds = new AWS.Credentials({
  accessKeyId: process.env.S3AccessKeyId,
  secretAccessKey: process.env.S3SecretAccessKey,
});

const S3 = new AWS.S3({ credentials: creds });

const filesToUpload = ["cart"];

const returnPromise = (file) => {
  return new Promise((res, rej) => {
    S3.upload(
      {
        Bucket: "ahaan-static-files",
        Key: `siena/${file}.js`,
        Body: fs.createReadStream(`${file}.js`),
        ACL: "public-read",
        ContentType: "application/javascript",
        CacheControl: "no-cache",
      },
      (err, data) => {
        if (err) rej(err);
        else {
          console.log(`uploaded: ${file}.js\t ✅`);
          console.log(`link: ${data.Location}\t ✅`);
          res(null);
        }
      }
    );
  });
};

for (const file of filesToUpload) {
  (async () => {
    const inputCode = fs.readFileSync(`${file}.js`, { encoding: "utf8" });
    const outputCode = minify(inputCode, {}).code;
    fs.writeFileSync(`${file}.min.js`, outputCode, { encoding: "utf8" });
    await returnPromise(file + ".min");
  })();
}
