import * as tagService from "../services/tagsServices.js";

// Create
export const createTag = async (req, res) => {
  try {
    const { TagName } = req.body;
    if (!TagName) return res.status(400).json({ error: "TagName is required" });

    const tag = await tagService.createTag(TagName);
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read All
export const getAllTags = async (req, res) => {
  try {
    const tags = await tagService.getAllTags();
    res.json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One
export const getTagById = async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await tagService.getTagById(id);
    res.json(tag);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Update
export const updateTag = async (req, res) => {
  try {
    const { id } = req.params;
    const { TagName } = req.body;
    if (!TagName) return res.status(400).json({ error: "TagName is required" });

    const tag = await tagService.updateTag(id, TagName);
    res.json(tag);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Delete
export const deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await tagService.deleteTag(id);
    res.json(result);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
