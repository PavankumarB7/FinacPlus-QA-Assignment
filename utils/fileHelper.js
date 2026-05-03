import { writeFile } from "fs/promises";
import { join } from "path";

export async function saveBookDetails({ title, author, publisher }) {
  const content = `Title     : ${title}\nAuthor    : ${author}\nPublisher : ${publisher}`;
  const filePath = join(process.cwd(), "output", "book-details.txt");
  await writeFile(filePath, content, "utf-8");
}
