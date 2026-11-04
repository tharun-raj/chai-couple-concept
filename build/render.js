import { header, footer, bottomBar } from './partials.js';
import { bodies } from './bodies.js';

export function renderPage(html, page) {
  const body = bodies[page];
  if (!body) return html;
  return html
    .replace('<!--@header-->', () => header(page))
    .replace('<!--@body-->', () => body())
    .replace('<!--@footer-->', () => footer(page))
    .replace('<!--@bottombar-->', () => bottomBar(page));
}
