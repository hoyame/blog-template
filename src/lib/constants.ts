import { getBlogConfig } from "@/lib/readConfig";
export const EXAMPLE_PATH = "blog";
export const CMS_NAME = "Markdown";
const blog = getBlogConfig();
export const HOME_OG_IMAGE_URL = blog.og_image_url;
