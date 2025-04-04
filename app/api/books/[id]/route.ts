import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  notionVersion: '2022-06-28', // Python の例と同等のバージョン
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const pageData = await notion.pages.retrieve({
      page_id: params.id,
    });
    const blocks = await notion.blocks.children.list({
      block_id: params.id,
    });
    return NextResponse.json({ ...pageData, content: blocks.results });
  } catch (error) {
    console.error("Error fetching page content:", error);
    return NextResponse.error();
  }
}