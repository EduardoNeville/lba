#!/usr/bin/env python3
"""Compare EN docx copy (texts/text.docx) against current app data strings.
Usage: python3 check_docx_app.py  (run from repo root)
"""
import re, zipfile, sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
DOCX = ROOT / 'texts' / 'text.docx'
SRC = ROOT / 'app' / 'src'


def docx_paras(path: Path) -> list[str]:
    xml = zipfile.ZipFile(path).read('word/document.xml').decode('utf-8')
    out = []
    for p in re.findall(r'<w:p[ >].*?</w:p>', xml, re.S):
        t = ''.join(re.findall(r'<w:t[^>]*>(.*?)</w:t>', p, re.S))
        t = t.replace('&amp;', '&')
        if t.strip():
            out.append(t)
    return out


def app_strings() -> set[str]:
    out = set()
    for f in (SRC / 'data').glob('*.ts'):
        txt = f.read_text(encoding='utf-8')
        for m in re.findall(r"'(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\"", txt):
            s = m[1:-1]
            if len(s) >= 4 and not s.startswith('.') and '/' not in s[:1] and 'http' not in s:
                out.add(s)
    return out


def norm(s: str) -> str:
    # docx stores labels in ALL CAPS; app stores sentence case (CSS .micro uppercases)
    return re.sub(r'[^a-z0-9]', '', s.lower())


def main():
    docx = docx_paras(DOCX)
    app = app_strings()
    appn = {norm(s): s for s in app}
    missing = []  # docx strings with no app counterpart
    for d in docx:
        dn = norm(d)
        if len(dn) < 4 or dn in {'legalboutiqueadvisers'}:
            continue
        if dn not in appn:
            missing.append(d)
    print(f'--- docx paras: {len(docx)} | app data strings: {len(app)}')
    print(f'--- docx strings NOT found in app data ({len(missing)}):')
    for m in missing:
        print('  •', m)


if __name__ == '__main__':
    main()
