import s3 from "../config/s3";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { Params } from "../models/params";

export const uploadImage = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const d = new Date();
  const fileName = `${d.getFullYear()}_${d.getMonth()}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}`;

  const params: Params = {
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Body: fs.createReadStream(file.path),
    Key: "Images/" + fileName + path.extname(file.originalname),
    ACL: "public-read",
  };

  try {
    await uploadImageToS3(params);
    const data = (await getAllImages()) as any;
    const images = prepareImageList(data);

    res.render("index", {
      images,
      success: "Image Uploaded Successfully!!",
      error: null,
    });
  } catch (err: any) {
    res.render("index", {
      error: "Ops Something Went Wrong!!",
      images: [],
      success: null,
    });
  }
};

const uploadImageToS3 = async (params: Params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err: any, data: any) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

export const getAllImages = async () => {
  return new Promise((resolve, reject) => {
    s3.listObjects(
      { Bucket: process.env.AWS_BUCKET_NAME as string, Prefix: "Images/" },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
};

export const prepareImageList = (images: any) => {
  const imageList: string[] = [];
  images.Contents.forEach((image: any) =>
    imageList.push(`${process.env.AWS_BUCKET_URL}/${image.Key}`)
  );
  return imageList;
};
