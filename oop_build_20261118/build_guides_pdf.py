#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 4 份实验指导书 markdown 转成排版良好的 PDF（pandoc → HTML → Chrome 打印）。

用法: python3 build_guides_pdf.py
输出: dist/Lab1_实验指导书.pdf … Lab4_实验指导书.pdf
"""
import subprocess
from pathlib import Path

import shutil

HERE = Path(__file__).resolve().parent
LABS = [
    ("Lab1_图书馆管理系统", "实验一 · 图书馆管理系统"),
    ("Lab2_JSON文件存储", "实验二 · JSON 文件存储"),
    ("Lab3_网页数据抓取", "实验三 · 网页数据抓取"),
    ("Lab4_Numpy数据分类", "实验四 · Numpy 数据分类"),
]
OUT = HERE / "dist"

CSS = """
body { font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;
       font-size: 13.5px; line-height: 1.75; color: #222; margin: 0; }
h1 { font-size: 26px; border-bottom: 3px solid #2f5bd3; padding-bottom: 10px; margin: 0 0 18px; }
h2 { font-size: 18px; margin: 26px 0 10px; color: #1a3f9e; page-break-after: avoid; }
h3 { font-size: 15.5px; margin: 18px 0 8px; page-break-after: avoid; }
table { border-collapse: collapse; width: 100%; margin: 10px 0 14px; page-break-inside: avoid; }
th, td { border: 1px solid #cfd6e4; padding: 6px 8px; text-align: left; vertical-align: top; }
th { background: #eef2fa; font-weight: 600; }
code { background: #f2f4f8; padding: 1px 4px; border-radius: 3px; font-size: 12.5px; }
pre { background: #f6f8fb; border: 1px solid #e1e6ef; border-radius: 6px; padding: 10px 12px;
      overflow-x: auto; page-break-inside: avoid; }
pre code { background: none; padding: 0; }
blockquote { border-left: 4px solid #b9c6e2; margin: 10px 0; padding: 4px 12px; color: #55617a;
             background: #f7f9fc; }
ul, ol { margin: 8px 0 12px 22px; }
li { margin: 3px 0; }
@page { size: A4; margin: 16mm 15mm; }
"""

HTML = """<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<style>{css}</style></head><body>{body}</body></html>"""


def to_html(md_path: Path) -> str:
    """pandoc 转 HTML 片段（保留表格）。"""
    r = subprocess.run(["pandoc", str(md_path), "-f", "markdown", "-t", "html"],
                       capture_output=True, text=True)
    if r.returncode != 0:
        raise SystemExit(f"× pandoc 失败: {r.stderr[:300]}")
    return r.stdout


def main():
    OUT.mkdir(exist_ok=True)
    chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    if not Path(chrome).exists():
        chrome = shutil.which("chromium") or shutil.which("google-chrome")
    for dirname, title in LABS:
        md = HERE / dirname / "实验指导书.md"
        if not md.exists():
            print("skip", md)
            continue
        html = HTML.format(css=CSS, body=to_html(md))
        tmp = OUT / f"{dirname}.html"
        tmp.write_text(html, encoding="utf-8")
        pdf = OUT / f"{dirname.split('_')[0]}_实验指导书.pdf"
        subprocess.run([chrome, "--headless", "--disable-gpu", "--no-sandbox",
                        "--no-pdf-header-footer", f"--print-to-pdf={pdf}",
                        f"file://{tmp}"], check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print(f"  {title} → {pdf.name} ({pdf.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
