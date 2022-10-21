import express from "express";
import {
  getProfiles,
  getProfilesById,
  saveProfiles,
  updateProfiles,
  deleteProfiles,
} from "../controllers/profileController.js";

const router = express.Router();

router.get("/profiles", getProfiles);
router.get("/profiles/:id", getProfilesById);
router.post("/profiles", saveProfiles);
router.patch("/profiles/:id", updateProfiles);
router.delete("/profiles/:id", deleteProfiles);

export default router;
