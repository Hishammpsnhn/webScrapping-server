import urlModal from "../model/urlModal.js";
import request from 'request';
import cherio from "cheerio";
import wordCount from 'html-word-count'
import mongoose from "mongoose";

// @desc    Get All url insights
// @route   GET /api/url
// @access  Private
export const allInsights = async (req, res) => {
    console.log("allInsights")
    try {
        const allInsights = await urlModal.find().sort({ _id: -1 });
        res.status(200).json(allInsights);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// @desc    Add url insights
// @route   POST /api/url
// @access  Private
export const getInsight = async (req, res) => {
    console.log("called insigjts")
    const data = req.body;
    try {
        if (data.domain) {
            const url = data.domain;
            request(url, (err, resp, html) => {
                let images = [];
                if (!err && resp.statusCode == 200) {
                    console.log("Request was success ");
                    const $ = cherio.load(html);
                    $("img").each((index, image) => {
                        var img = $(image).attr('src');
                        var baseUrl = url;
                        var Links = img;
                        if (Links !== undefined) {
                            images.push(Links);
                        }
                    })
                    console.log(images)
                    let words = wordCount(html);
                    const newUrl = new urlModal({ ...data, images: images, words: words, createdAt: new Date().toISOString() });
                    newUrl.save();
                    res.status(201).json(newUrl);
                } else {
                    res.status(404).json({ message: " error" });
                }
            });
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
}


// @desc    Update one url insights
// @route   PATCH /api/url/:id/update
// @access  Private
export const updateInsights = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    try {
        const updatedPost = await urlModal.findByIdAndUpdate(id, { favorite: favorite }, { new: true });
        res.json(updatedPost);
    } catch (error) {
        throw new Error("somewhere went wrong");
    }
}


// @desc    delete one url insights
// @route   DELETE /api/url/:id/delete
// @access  Private
export const deleteInsights = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    await urlModal.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
}