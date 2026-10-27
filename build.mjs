import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const root = new URL('./', import.meta.url);
const excluded = JSON.parse(readFileSync(new URL('excluded-variants.json', root), 'utf8'));
let page = readdirSync(new URL('src/', root)).filter(name => /^\d.*\.html$/.test(name)).sort()
  .map(name => readFileSync(new URL(`src/${name}`, root), 'utf8')).join('');
for (const id of excluded) {
  if (!/^[HBCTA][1-5]$/.test(id)) throw new Error(`Invalid variant: ${id}`);
  const article = new RegExp(`<!-- ${id} -->\\s*<article class="v" id="${id}"[^>]*>[\\s\\S]*?</article>\\s*`);
  if (!article.test(page)) throw new Error(`Variant not found: ${id}`);
  page = page.replace(article, '');
}
const count = [...page.matchAll(/<article class="v"/g)].length;
page = page.replace('{{VARIANT_COUNT}}', String(count));
writeFileSync(new URL('page.html', root), page);
writeFileSync(new URL('preview.html', root), `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>\n${page}\n</body></html>\n`);
console.log(`Built ${count} variants; excluded: ${excluded.join(', ') || 'none'}`);
