import fs from 'fs';
import html from 'remark-html';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // /posts配下のファイル名取得
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // ".md"拡張子をファイル名から除去
        const id = fileName.replace(/\.md$/, '');

        // mdファイルを文字列として読み込む
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // gray-matterでメタデータセクションを変換
        const matterResult = matter(fileContents);

        // 変換したデータをIDと紐づける
        return {
            id,
            ...matterResult.data,
        };
    });
    // 日付でソート
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });

}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    // returnの例
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matterでメタデータセクションを変換
    const matterResult = matter(fileContents);

    // remarkでマークダウンをhtmlに変換
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // 変換したデータをIDと紐づける
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}