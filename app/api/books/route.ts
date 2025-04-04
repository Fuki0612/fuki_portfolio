import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_BOOKS_DATABASE_ID || '';

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.error();
  }
}