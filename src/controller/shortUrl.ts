import express from "express";
import { urlModel } from "../model/shortUrl";

export const createUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    console.log("The FullUrl is", req.body.fullUrl);
    const { fullUrl } = req.body;
    const urlFound = await urlModel.find({ fullUrl });
    console.log(urlFound);
    console.log("code is correct until here error from here ");

    if (urlFound.length > 0) {
      res.status(409);
      res.send(urlFound);
      console.log(res);
    } else {
      const shortUrl = await urlModel.create({ fullUrl });
      res.status(201).send(shortUrl);
    }

    console.log(urlFound);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong  CREATEURL" });
  }
};

// export const getAllUrl = async (
//   req: express.Request,
//   res: express.Response
// ) => {
//   try {
//     const shortUrls = await urlModel.find().sort({createAt:-1});
//     if (shortUrls.length < 0) {
//       res.status(404).send({ message: "short Urls Not Found!" });
//     } else {
//       res.status(200).send(shortUrls);
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Something went  wrong GETALLURLS" });
//   }
// };

export const getAllUrl = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const shortUrls = await urlModel.find().sort({ createAt: -1 }); // Ensure 'createAt' is the correct field name
    if (shortUrls.length === 0) { // Changed to check for empty array
      return res.status(404).send({ message: "Short URLs not found!" });
    } else {
      return res.status(200).send(shortUrls);
    }
  } catch (error) {
    console.error("Error fetching URLs:", error); // Log the error for debugging
    return res.status(500).send({ message: "Something went wrong in GETALLURLS" });
  }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
    console.log(req.params.id);
    if (!shortUrl) {
      return res.status(404).send({ message: "Url Not Found" });
    }
    
    shortUrl.clicks++;
    await shortUrl.save();
    return res.redirect(shortUrl.fullUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Something went wrong GET-ID-URL" });
  }
};


export const deleteUrl = async (req: express.Request, res: express.Response) => {
  try {
    const shortUrl = await urlModel.findByIdAndDelete(req.params.id); 
    if (!shortUrl) {
      return res.status(404).send({ message: "Url Not Found" });
    }
    return res.status(200).send({ message: "Requested URL Deleted Successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong DELETE-ID-URL" });
  }
};




