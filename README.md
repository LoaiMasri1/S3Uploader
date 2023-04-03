# S3 Uploader

#### this is a simple app to upload files to S3 bucket using AWS SDK for `Node.js` and `Express.js`
##### Video Link [Click Here...](https://drive.google.com/file/d/1CR42xWqtwaO9gHlJj9-R8qjeNbcMrYfA/view?usp=sharing)

## Development Steps

- first thing first you need to create a s3 group and user with full access to s3 bucket to apply less privilege principle.

- then you need to create a bucket in s3 and enable CORS to allow cross origin requests.

- then you need to create a .env file and add the following variables to it:

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_URL=your_bucket_url
AWS_BUCKET_NAME=your_bucket_name
```

- then you need to install the dependencies such as `express`, `aws-sdk`, `multer`, `dotenv`, `cors`, `nodemon`

- the we add configuration to the `aws-sdk` to use the credentials from the .env file and configure the s3 bucket.

- I have added a simple form to upload the file and a button to upload the file to the s3 bucket.

- then we add the `multer` middleware to handle the file upload and store it in the `uploads` folder.

- make the controller to handle the upload request and upload the file to the s3 bucket.

- displaying the uploaded file in the browser using the `AWS_BUCKET_URL` and the file name from the request in the `ejs` file.

## Deployment Steps (EC2)

- first thing first you need to create an EC2 instance and install `nodejs` and `npm` on it.

```
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```

- then you need to clone the repo and install the dependencies.

```
git clone https://github.com/LoaiMasri1/S3Uploader.git
```

- then you need to create a `.env` file and add the following variables to it:

```
cd S3Uploader
touch .env
```

```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_BUCKET_URL=your_bucket_url
AWS_BUCKET_NAME=your_bucket_name
```

- then you need to install `pm2` to run the app as a service.

```
npm install pm2 -g
```

- then you need to install the dependencies and build the app.

```
npm install
npm run build
```

- then you need to run the app using `pm2` and make sure it's running.

```
cd S3Uploader
pm2 start npm --name "S3Uploader" ./dist/index.js
```

- make sure the pm2 service is running.

```
pm2 status
```

- then you need to add the port `3000` to the security group inbound rules.

- add the `public ip` of the EC2 instance to the `CORS` configuration in the s3 bucket.

- then you need to open the `public ip` in the browser and upload a file to the s3 bucket.

