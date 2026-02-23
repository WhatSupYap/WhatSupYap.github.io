import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownItem {
  type: 'file' | 'folder';
  name: string;
  slug: string; // Relative path from content/[section]
  order: number;
  data: {
    title?: string;
    company?: string;
    description?: string; // Short summary/description for list view
    content_type?: string; // 'project', 'experience', etc.
    period?: string;
    date?: string;
    image?: string;
    thumbnail?: string;
    gallery?: string[];
    github?: string;
    public?: boolean;
    [key: string]: any;
  };
  contentHtml?: string;
  items?: MarkdownItem[]; // For folder items
}

/**
 * Helper to process a single file
 */
async function processFile(filePath: string, relativePath: string): Promise<MarkdownItem | null> {
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Filter out non-public items
  if (data.public === false) {
    return null;
  }

  // Generate description if not present and content_type is portfolio or experience
  // Or just always generate it for potential use
  let description = data.description;
  if (!description) {
    // Strip markdown syntax roughly to get plain text for description
    const plainText = content.replace(/[#*`\[\]()]/g, '').replace(/\n+/g, ' ').trim();
    description = plainText.length > 150 ? plainText.slice(0, 150) + '...' : plainText;
  }
  // Inject description into data so components can use it
  data.description = description;

  // Convert markdown to HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  // Normalize slug to use forward slashes for URL compatibility
  const normalizedSlug = relativePath.replace(/\\/g, '/').replace(/\.md$/, '');

  return {
    type: 'file',
    name: path.basename(filePath, '.md'),
    slug: normalizedSlug,
    order: data.order ?? 9999,
    data,
    contentHtml,
  };
}

/**
 * Helper to process a directory (folder)
 */
async function processDirectory(dirPath: string, relativePath: string): Promise<MarkdownItem | null> {
  const items = fs.readdirSync(dirPath);
  const folderItems: MarkdownItem[] = [];

  let folderMetadata: any = { title: path.basename(dirPath) };
  let folderOrder = 9999;

  // Check for index.md to define folder properties
  const indexFile = path.join(dirPath, 'index.md');
  if (fs.existsSync(indexFile)) {
    const fileContents = fs.readFileSync(indexFile, 'utf8');
    const { data } = matter(fileContents);
    if (data.public === false) return null;
    folderMetadata = { ...folderMetadata, ...data };
    if (data.order !== undefined) folderOrder = data.order;
  }

  for (const item of items) {
    if (item === 'index.md') continue;
    if (item.startsWith('.')) continue;

    const itemPath = path.join(dirPath, item);
    const itemRelativePath = path.join(relativePath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const subItem = await processDirectory(itemPath, itemRelativePath);
      if (subItem) folderItems.push(subItem);
    } else if (item.endsWith('.md')) {
      const fileItem = await processFile(itemPath, itemRelativePath);
      if (fileItem) folderItems.push(fileItem);
    }
  }

  if (folderItems.length === 0) {
    return null;
  }

  folderItems.sort((a, b) => a.order - b.order);

  const normalizedSlug = relativePath.replace(/\\/g, '/');

  return {
    type: 'folder',
    name: path.basename(dirPath),
    slug: normalizedSlug,
    order: folderOrder,
    data: folderMetadata,
    items: folderItems,
  };
}

/**
 * Main function to get data for a section (left/right)
 */
export async function getSectionData(section: 'left' | 'right'): Promise<MarkdownItem[]> {
  const sectionPath = path.join(contentDirectory, section);
  if (!fs.existsSync(sectionPath)) {
    return [];
  }

  const items = fs.readdirSync(sectionPath);
  const results: MarkdownItem[] = [];

  for (const item of items) {
    if (item.startsWith('.')) continue;

    const fullPath = path.join(sectionPath, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const folderItem = await processDirectory(fullPath, item);
      if (folderItem) results.push(folderItem);
    } else if (item.endsWith('.md')) {
      const fileItem = await processFile(fullPath, item);
      if (fileItem) results.push(fileItem);
    }
  }

  results.sort((a, b) => a.order - b.order);

  return results;
}

/**
 * Helper to recursively find all projects (items with content_type: 'project')
 */
export async function getAllPortfolioItems(): Promise<MarkdownItem[]> {
  const rightItems = await getSectionData('right');
  const portfolioItems: MarkdownItem[] = [];

  function traverse(items: MarkdownItem[]) {
    for (const item of items) {
      if (item.data.content_type === 'portfolio') {
        portfolioItems.push(item);
      }
      if (item.items) {
        traverse(item.items);
      }
    }
  }

  traverse(rightItems);
  return portfolioItems;
}

export async function getAllExperienceItems(): Promise<MarkdownItem[]> {
  const rightItems = await getSectionData('right');
  const experienceItems: MarkdownItem[] = [];

  function traverse(items: MarkdownItem[]) {
    for (const item of items) {
      if (item.data.content_type === 'experience') {
        experienceItems.push(item);
      }
      if (item.items) {
        traverse(item.items);
      }
    }
  }

  traverse(rightItems);
  return experienceItems;
}

export async function getAllEducationItems(): Promise<MarkdownItem[]> {
  const leftItems = await getSectionData('left');
  const educationItems: MarkdownItem[] = [];

  function traverse(items: MarkdownItem[]) {
    for (const item of items) {
      if (item.data.content_type === 'education') {
        educationItems.push(item);
      }
      if (item.items) {
        traverse(item.items);
      }
    }
  }

  traverse(leftItems);
  return educationItems;
}

export async function getAllCertificateItems(): Promise<MarkdownItem[]> {
  const leftItems = await getSectionData('left');
  const certificateItems: MarkdownItem[] = [];

  function traverse(items: MarkdownItem[]) {
    for (const item of items) {
      if (item.data.content_type === 'certificate') {
        certificateItems.push(item);
      }
      if (item.items) {
        traverse(item.items);
      }
    }
  }

  traverse(leftItems);
  return certificateItems;
}

export async function getAllIntroItems(): Promise<MarkdownItem[]> {
  const rightItems = await getSectionData('right');
  const introItems: MarkdownItem[] = [];

  function traverse(items: MarkdownItem[]) {
    for (const item of items) {
      if (item.data.content_type === 'intro') {
        introItems.push(item);
      }
      if (item.items) {
        traverse(item.items);
      }
    }
  }

  traverse(rightItems);
  return introItems;
}

/**
 * Helper to get a specific project by slug
 * slug is an array of path segments e.g. ['02-projects', '01-alpha']
 */
export async function getProjectBySlug(slugPlugin: string[]): Promise<MarkdownItem | null> {
  // Construct relative path from slug parts
  // We need to search in 'content/right' mainly, or 'content/left'?
  // Assuming projects are in 'right'

  // NOTE: This is a bit inefficient (scanning all to find one), 
  // but safe without hardcoding 'right'. 
  // We can try to construct the path directly if we know it's in 'right'.
  // But slug usually doesn't include 'right'.
  // Let's assume the slug matches the folder structure inside `content/right`.

  const rightPath = path.join(contentDirectory, 'right');
  const relativePath = slugPlugin.join(path.sep);
  const fullPath = path.join(rightPath, relativePath + '.md');

  if (fs.existsSync(fullPath)) {
    return processFile(fullPath, relativePath);
  }

  return null;
}

export async function getSiteConfig() {
  const siteConfigPath = path.join(contentDirectory, 'site.md');
  if (!fs.existsSync(siteConfigPath)) {
    return {
      title: 'My Resume',
      description: 'Built with Next.js',
    };
  }

  const fileContents = fs.readFileSync(siteConfigPath, 'utf8');
  const { data } = matter(fileContents);
  return data;
}
