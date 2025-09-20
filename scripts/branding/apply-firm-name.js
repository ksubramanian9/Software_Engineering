import { FIRM_NAME, FIRM_NAME_POSSESSIVE } from './config.js';

const TOKEN_REPLACEMENTS = [
  ['{firm}', FIRM_NAME],
  ['{firmPossessive}', FIRM_NAME_POSSESSIVE],
];

const DATA_ATTRIBUTE_PREFIX = 'data-firm-name-';
const RESERVED_DATA_ATTRIBUTES = new Set([
  'data-firm-name',
  'data-firm-name-possessive',
  'data-firm-name-heading',
]);

function fillTemplate(template) {
  if (typeof template !== 'string') {
    return '';
  }

  return TOKEN_REPLACEMENTS.reduce(
    (result, [token, value]) => result.split(token).join(value),
    template,
  );
}

function applyTextContent(selector, value) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value;
  });
}

function applyHeadingContent() {
  document.querySelectorAll('[data-firm-name-heading]').forEach((element) => {
    const template = element.getAttribute('data-firm-name-heading');
    element.textContent = template ? fillTemplate(template) : FIRM_NAME;
  });
}

function applyAttributeTemplates(element) {
  Array.from(element.attributes).forEach((attribute) => {
    const { name, value } = attribute;
    if (!name.startsWith(DATA_ATTRIBUTE_PREFIX) || RESERVED_DATA_ATTRIBUTES.has(name)) {
      return;
    }

    const targetName = name.slice(DATA_ATTRIBUTE_PREFIX.length);
    if (!targetName) {
      return;
    }

    element.setAttribute(targetName, fillTemplate(value));
  });
}

function applyFirmName() {
  applyTextContent('[data-firm-name]', FIRM_NAME);
  applyTextContent('[data-firm-name-possessive]', FIRM_NAME_POSSESSIVE);
  applyHeadingContent();

  document.querySelectorAll('*').forEach(applyAttributeTemplates);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyFirmName);
} else {
  applyFirmName();
}
