/* Python 面向对象编程实验（专业课）—— 4 个实验 / 33 关
   代码取自 13_专业课实验/项目实验 的参考项目；
   同一实验内按顺序拼接 = 完整源文件（library.py 217 行 / country_store.py 105 行 /
   scraper.py+merge.py 207 行 / 四件套 318 行）。
   版面：4 个模块 = 4 列（列头写章节），每课一个实验。
   生成：build_oopbank.py（源 oop_snippets.json） */
window.OOP_MODULES = ["第 7 章 类", "第 8 章 文件和异常", "第 9 章 网络爬虫", "第 10 章 Numpy"];
window.OOP_LESSONS = [
 {
  "no": 12,
  "mod": 0,
  "label": "实验一",
  "title": "图书馆管理系统",
  "src": "library.py",
  "p": 1,
  "n": 11
 },
 {
  "no": 13,
  "mod": 1,
  "label": "实验二",
  "title": "JSON 文件存储",
  "src": "country_store.py",
  "p": 1,
  "n": 4
 },
 {
  "no": 14,
  "mod": 2,
  "label": "实验三",
  "title": "网页数据抓取",
  "src": "scraper.py + merge.py",
  "p": 2,
  "n": 7
 },
 {
  "no": 15,
  "mod": 3,
  "label": "实验四",
  "title": "Numpy 数据分类",
  "src": "label/split/knn/evaluate",
  "p": 4,
  "n": 11
 }
];
window.OOP_SNIPPETS = [
 {
  "id": "oop-12-01",
  "lesson": 12,
  "tier": 2,
  "title": "library.py 1/11 导入与常量",
  "hint": "实验一 图书馆管理系统 · library.py 第 1 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"library.py —— 实验1 参考项目：图书馆管理系统的三个核心类。\n\n职责划分：\n    Book    只管\"这一本书\"自身的属性与库存\n    Reader  只管\"这一位读者\"的信息与借阅清单\n    Library 是管理中枢：馆藏/读者集合、检索、规则校验、借还业务、日志\n\"\"\"\n\nimport json\nimport os\nfrom datetime import date, timedelta\n\nLOAN_DAYS = 30          # 借期\nFINE_PER_DAY = 0.5      # 逾期每天罚金（元）\nLOG_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), \"library.log\")\n\n"
 },
 {
  "id": "oop-12-02",
  "lesson": 12,
  "tier": 2,
  "title": "library.py 2/11 today、Book",
  "hint": "实验一 图书馆管理系统 · library.py 第 2 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def today():\n    return date.today()\n\n\nclass Book:\n    def __init__(self, title, isbn, author, total_copies=1):\n        self.title = title\n        self.isbn = isbn\n        self.author = author\n        self.total_copies = int(total_copies)\n        self.available = int(total_copies)\n        self.borrow_times = 0          # 累计借阅次数（统计用）\n\n    def is_available(self):\n        return self.available > 0\n\n    def borrow_one(self):\n        \"\"\"可借数 -1。返回是否成功。\"\"\"\n        if not self.is_available():\n            return False\n        self.available -= 1\n        self.borrow_times += 1\n        return True\n"
 },
 {
  "id": "oop-12-03",
  "lesson": 12,
  "tier": 3,
  "title": "library.py 3/11 return_one、info",
  "hint": "实验一 图书馆管理系统 · library.py 第 3 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "    def return_one(self):\n        \"\"\"可借数 +1，但不会超过总馆藏。\"\"\"\n        self.available = min(self.available + 1, self.total_copies)\n\n    def info(self):\n        return (f\"《{self.title}》 {self.author} | ISBN {self.isbn} | \"\n                f\"馆藏 {self.available}/{self.total_copies} | 累计借出 {self.borrow_times}\")\n\n    def __str__(self):\n        return self.info()\n\n    def __repr__(self):\n        return f\"Book({self.isbn!r}, available={self.available})\"\n\n    def to_dict(self):\n        return {\"title\": self.title, \"isbn\": self.isbn, \"author\": self.author,\n                \"total_copies\": self.total_copies, \"available\": self.available,\n                \"borrow_times\": self.borrow_times}\n\n    @classmethod"
 },
 {
  "id": "oop-12-04",
  "lesson": 12,
  "tier": 3,
  "title": "library.py 4/11 from_dict、Reader",
  "hint": "实验一 图书馆管理系统 · library.py 第 4 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "    def from_dict(cls, d):\n        book = cls(d[\"title\"], d[\"isbn\"], d[\"author\"], d.get(\"total_copies\", 1))\n        book.available = d.get(\"available\", book.total_copies)\n        book.borrow_times = d.get(\"borrow_times\", 0)\n        return book\n\n\nclass Reader:\n    def __init__(self, reader_id, name, max_loans=3):\n        self.reader_id = reader_id\n        self.name = name\n        self.max_loans = int(max_loans)\n        self.loans = {}        # isbn -> 借出日期(date)\n        self.history = []      # [(isbn, 借出日, 归还日, 罚金)]\n\n    def can_borrow(self):\n        return len(self.loans) < self.max_loans\n"
 },
 {
  "id": "oop-12-05",
  "lesson": 12,
  "tier": 4,
  "title": "library.py 5/11 borrow、due_date",
  "hint": "实验一 图书馆管理系统 · library.py 第 5 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "    def borrow(self, book):\n        \"\"\"发起借阅。返回 (成功?, 提示)。\"\"\"\n        if not self.can_borrow():\n            return False, f\"{self.name} 已达最大可借上限 {self.max_loans} 本\"\n        if book.isbn in self.loans:\n            return False, f\"{self.name} 已借过《{book.title}》，请先归还\"\n        if not book.borrow_one():\n            return False, f\"《{book.title}》已全部借出（可借 0 本）\"\n        self.loans[book.isbn] = today()\n        return True, f\"{self.name} 借到《{book.title}》，应还日期 {self.due_date(book.isbn)}\"\n\n    def due_date(self, isbn):\n        return self.loans[isbn] + timedelta(days=LOAN_DAYS)\n\n    def overdue_days(self, isbn):\n        return max(0, (today() - self.due_date(isbn)).days)\n"
 },
 {
  "id": "oop-12-06",
  "lesson": 12,
  "tier": 4,
  "title": "library.py 6/11 return_book、current_loans",
  "hint": "实验一 图书馆管理系统 · library.py 第 6 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "    def return_book(self, book):\n        \"\"\"发起还书。返回 (成功?, 提示)。\"\"\"\n        if book.isbn not in self.loans:\n            return False, f\"{self.name} 没有借过《{book.title}》\"\n        borrow_day = self.loans.pop(book.isbn)\n        book.return_one()\n        days = max(0, (today() - borrow_day - timedelta(days=LOAN_DAYS)).days)\n        fine = days * FINE_PER_DAY\n        self.history.append((book.isbn, borrow_day, today(), fine))\n        msg = f\"{self.name} 归还《{book.title}》\"\n        if days:\n            msg += f\"，逾期 {days} 天，罚金 {fine:.1f} 元\"\n        return True, msg\n\n    def current_loans(self, library):\n        \"\"\"查看个人借阅清单（需要 Library 提供书名）。\"\"\"\n        if not self.loans:\n            return []\n        return [(library.books[isbn].title, d, d + timedelta(days=LOAN_DAYS))\n                for isbn, d in self.loans.items()]\n"
 },
 {
  "id": "oop-12-07",
  "lesson": 12,
  "tier": 5,
  "title": "library.py 7/11 to_dict、from_dict",
  "hint": "实验一 图书馆管理系统 · library.py 第 7 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "    def to_dict(self):\n        return {\"reader_id\": self.reader_id, \"name\": self.name,\n                \"max_loans\": self.max_loans,\n                \"loans\": {k: v.isoformat() for k, v in self.loans.items()}}\n\n    @classmethod\n    def from_dict(cls, d):\n        r = cls(d[\"reader_id\"], d[\"name\"], d.get(\"max_loans\", 3))\n        r.loans = {k: date.fromisoformat(v) for k, v in d.get(\"loans\", {}).items()}\n        return r\n\n\nclass Library:\n    def __init__(self, log_path=LOG_PATH):\n        self.books = {}        # isbn -> Book\n        self.readers = {}      # reader_id -> Reader\n        self.log_path = log_path\n\n    # ---------- 馆藏与读者 ----------"
 },
 {
  "id": "oop-12-08",
  "lesson": 12,
  "tier": 5,
  "title": "library.py 8/11 add_book、register_reader",
  "hint": "实验一 图书馆管理系统 · library.py 第 8 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "    def add_book(self, book):\n        if book.isbn in self.books:\n            self.books[book.isbn].total_copies += book.total_copies\n            self.books[book.isbn].available += book.available\n            self._log(f\"增补馆藏 {book.isbn} +{book.total_copies}\")\n        else:\n            self.books[book.isbn] = book\n            self._log(f\"入库 {book.isbn}《{book.title}》x{book.total_copies}\")\n\n    def register_reader(self, reader):\n        if reader.reader_id in self.readers:\n            return False, f\"读者编号 {reader.reader_id} 已注册\"\n        self.readers[reader.reader_id] = reader\n        self._log(f\"注册读者 {reader.reader_id} {reader.name}\")\n        return True, f\"已注册 {reader.name}（{reader.reader_id}）\"\n\n    # ---------- 检索 ----------"
 },
 {
  "id": "oop-12-09",
  "lesson": 12,
  "tier": 5,
  "title": "library.py 9/11 find_book、process_borrow",
  "hint": "实验一 图书馆管理系统 · library.py 第 9 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "    def find_book(self, keyword, field=\"any\"):\n        \"\"\"多条件模糊检索：field 取 title/author/isbn/any。\"\"\"\n        kw = keyword.strip().lower()\n        result = []\n        for book in self.books.values():\n            target = {\"title\": book.title, \"author\": book.author,\n                      \"isbn\": book.isbn}.get(field, f\"{book.title} {book.author} {book.isbn}\")\n            if kw in target.lower():\n                result.append(book)\n        return result\n\n    # ---------- 借还业务 ----------\n    def process_borrow(self, reader_id, isbn):\n        \"\"\"全流程校验：读者存在 → 图书存在 → 借阅规则。\"\"\"\n        reader = self.readers.get(reader_id)\n        if reader is None:\n            return False, f\"读者编号 {reader_id} 不存在\"\n        book = self.books.get(isbn)\n        if book is None:\n            return False, f\"ISBN {isbn} 不在馆藏中\"\n        ok, msg = reader.borrow(book)\n        self._log(f\"借书 {reader_id} {isbn} -> {'成功' if ok else '失败: ' + msg}\")\n        return ok, msg\n"
 },
 {
  "id": "oop-12-10",
  "lesson": 12,
  "tier": 5,
  "title": "library.py 10/11 process_return、save",
  "hint": "实验一 图书馆管理系统 · library.py 第 10 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "    def process_return(self, reader_id, isbn):\n        reader = self.readers.get(reader_id)\n        if reader is None:\n            return False, f\"读者编号 {reader_id} 不存在\"\n        book = self.books.get(isbn)\n        if book is None:\n            return False, f\"ISBN {isbn} 不在馆藏中\"\n        ok, msg = reader.return_book(book)\n        self._log(f\"还书 {reader_id} {isbn} -> {'成功' if ok else '失败: ' + msg}\")\n        return ok, msg\n\n    # ---------- 持久化 ----------\n    def save(self, path):\n        data = {\"books\": [b.to_dict() for b in self.books.values()],\n                \"readers\": [r.to_dict() for r in self.readers.values()]}\n        with open(path, \"w\", encoding=\"utf-8\") as f:\n            json.dump(data, f, ensure_ascii=False, indent=2)\n\n    @classmethod"
 },
 {
  "id": "oop-12-11",
  "lesson": 12,
  "tier": 5,
  "title": "library.py 11/11 load、_log",
  "hint": "实验一 图书馆管理系统 · library.py 第 11 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "    def load(cls, path):\n        lib = cls()\n        if not os.path.exists(path):\n            return lib\n        with open(path, \"r\", encoding=\"utf-8\") as f:\n            data = json.load(f)\n        for d in data.get(\"books\", []):\n            book = Book.from_dict(d)\n            lib.books[book.isbn] = book\n        for d in data.get(\"readers\", []):\n            reader = Reader.from_dict(d)\n            lib.readers[reader.reader_id] = reader\n        return lib\n\n    def _log(self, msg):\n        line = f\"{today().isoformat()} {msg}\"\n        with open(self.log_path, \"a\", encoding=\"utf-8\") as f:\n            f.write(line + \"\\n\")\n"
 },
 {
  "id": "oop-13-01",
  "lesson": 13,
  "tier": 2,
  "title": "country_store.py 1/4 load_countries",
  "hint": "实验二 JSON 文件存储 · country_store.py 第 1 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"country_store.py —— 实验2 参考项目：国家数据的 JSON 读写与校验。\n\n数据 Schema（与实验3 爬虫产物一致）:\n    [{\"name\": str, \"capital\": str, \"population\": int, \"area\": float}, ...]\n\"\"\"\n\nimport json\nimport os\nimport shutil\n\nDEFAULT_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), \"data.json\")\n\nREQUIRED_FIELDS = (\"name\", \"capital\", \"population\", \"area\")\n\n\ndef load_countries(path=DEFAULT_PATH):\n    \"\"\"读文件。文件不存在返回 []；JSON 损坏时把坏文件改名 .bak 并返回 []。\"\"\"\n    if not os.path.exists(path):\n        return []\n    try:\n        with open(path, \"r\", encoding=\"utf-8\") as f:\n            data = json.load(f)\n    except (json.JSONDecodeError, UnicodeDecodeError) as e:\n        backup = path + \".bak\"\n        shutil.move(path, backup)\n        print(f\"[警告] {path} 解析失败（{e}），已备份为 {backup}\")\n        return []\n    if not isinstance(data, list):\n        print(f\"[警告] {path} 顶层不是列表，已忽略\")\n        return []\n    return [c for c in data if isinstance(c, dict)]\n\n"
 },
 {
  "id": "oop-13-02",
  "lesson": 13,
  "tier": 2,
  "title": "country_store.py 2/4 save_countries、validate_coun",
  "hint": "实验二 JSON 文件存储 · country_store.py 第 2 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def save_countries(countries, path=DEFAULT_PATH):\n    \"\"\"全量写回，人类可读格式。\"\"\"\n    with open(path, \"w\", encoding=\"utf-8\") as f:\n        json.dump(countries, f, ensure_ascii=False, indent=2)\n\n\ndef validate_country(c):\n    \"\"\"返回错误描述列表；空列表表示合法。\"\"\"\n    errors = []\n    for field in REQUIRED_FIELDS:\n        if field not in c or c[field] in (\"\", None):\n            errors.append(f\"缺少字段 {field}\")\n    if errors:\n        return errors\n    if not isinstance(c[\"name\"], str) or not c[\"name\"].strip():\n        errors.append(\"name 必须是非空字符串\")\n    if not isinstance(c[\"capital\"], str) or not c[\"capital\"].strip():\n        errors.append(\"capital 必须是非空字符串\")\n    for field in (\"population\", \"area\"):\n        try:\n            value = float(c[field])\n        except (TypeError, ValueError):\n            errors.append(f\"{field} 必须是数字\")\n            continue\n        if value <= 0:\n            errors.append(f\"{field} 必须大于 0\")\n    return errors\n\n"
 },
 {
  "id": "oop-13-03",
  "lesson": 13,
  "tier": 3,
  "title": "country_store.py 3/4 find_country、add_country",
  "hint": "实验二 JSON 文件存储 · country_store.py 第 3 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def find_country(countries, name):\n    \"\"\"按国家名精确查找，返回索引或 -1。\"\"\"\n    for i, c in enumerate(countries):\n        if c.get(\"name\", \"\").lower() == name.strip().lower():\n            return i\n    return -1\n\n\ndef add_country(countries, country):\n    \"\"\"新增；同名已存在时返回 (False, 提示)。\"\"\"\n    errors = validate_country(country)\n    if errors:\n        return False, \"数据不合法：\" + \"；\".join(errors)\n    if find_country(countries, country[\"name\"]) >= 0:\n        return False, f\"{country['name']} 已存在\"\n    countries.append({\n        \"name\": country[\"name\"].strip(),\n        \"capital\": country[\"capital\"].strip(),\n        \"population\": int(float(country[\"population\"])),\n        \"area\": float(country[\"area\"]),\n    })\n    return True, f\"已录入 {country['name']}\"\n\n"
 },
 {
  "id": "oop-13-04",
  "lesson": 13,
  "tier": 3,
  "title": "country_store.py 4/4 remove_country、summary",
  "hint": "实验二 JSON 文件存储 · country_store.py 第 4 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def remove_country(countries, name):\n    idx = find_country(countries, name)\n    if idx < 0:\n        return False, f\"未找到 {name}\"\n    countries.pop(idx)\n    return True, f\"已删除 {name}\"\n\n\ndef summary(countries):\n    \"\"\"统计信息：条数、总人口、最大国。\"\"\"\n    if not countries:\n        return \"当前没有数据\"\n    total_pop = sum(c[\"population\"] for c in countries)\n    biggest = max(countries, key=lambda c: c[\"area\"])\n    return (f\"共 {len(countries)} 个国家，总人口 {total_pop:,}，\"\n            f\"面积最大：{biggest['name']}（{biggest['area']:,} km²）\")\n"
 },
 {
  "id": "oop-14-01",
  "lesson": 14,
  "tier": 2,
  "title": "scraper.py 1/4 导入与常量",
  "hint": "实验三 网页数据抓取 · scraper.py 第 1 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"scraper.py —— 实验3 参考项目：抓取 scrapethissite.com 世界国家数据。\n\n目标页：https://www.scrapethissite.com/pages/simple/\n该页一次性渲染全部 250 个国家（无分页），每行 4 个字段：\n    country-name / country-capital / country-population / country-area\n输出：data_scraped.json，Schema 与实验2 的 data.json 完全一致。\n\n运行： python3 scraper.py [--out data_scraped.json]\n\"\"\"\n\nimport argparse\nimport json\nimport re\nimport sys\nimport time\nimport urllib.error"
 },
 {
  "id": "oop-14-02",
  "lesson": 14,
  "tier": 2,
  "title": "scraper.py 2/4 fetch_page",
  "hint": "实验三 网页数据抓取 · scraper.py 第 2 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "import urllib.request\n\nURL = \"https://www.scrapethissite.com/pages/simple/\"\nHEADERS = {\n    \"User-Agent\": \"Mozilla/5.0 (X11; Linux x86_64) XMU-CourseLab/1.0 (educational crawler)\",\n    \"Accept-Language\": \"en-US,en;q=0.9\",\n}\n\n# 每个国家是一个 <div class=\"col-md-4 country\"> ... </div> 块\nBLOCK_RE = re.compile(\n    r'<div class=\"col-md-4 country\">(.*?)</div>\\s*</div>', re.S)\nNAME_RE = re.compile(r'class=\"country-name\">\\s*(?:<i[^>]*></i>)?\\s*(.*?)\\s*</h3>', re.S)\nCAPITAL_RE = re.compile(r'class=\"country-capital\">(.*?)</span>', re.S)\nPOP_RE = re.compile(r'class=\"country-population\">(.*?)</span>', re.S)\nAREA_RE = re.compile(r'class=\"country-area\">(.*?)</span>', re.S)\n\n\ndef fetch_page(url=URL, retries=3, timeout=20):\n    \"\"\"带重试的 GET，返回 HTML 文本。\"\"\"\n    last_error = None\n    for attempt in range(1, retries + 1):\n        try:\n            req = urllib.request.Request(url, headers=HEADERS)\n            with urllib.request.urlopen(req, timeout=timeout) as resp:\n                if resp.status != 200:\n                    raise urllib.error.HTTPError(url, resp.status, \"非 200\", resp.headers, None)\n                charset = resp.headers.get_content_charset() or \"utf-8\"\n                return resp.read().decode(charset, errors=\"replace\")\n        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, OSError) as e:\n            last_error = e\n            wait = 2 ** attempt\n            print(f\"[重试 {attempt}/{retries}] {e}，{wait}s 后重试\", file=sys.stderr)\n            time.sleep(wait)\n    raise RuntimeError(f\"抓取失败：{url}（{last_error}）\")\n\n"
 },
 {
  "id": "oop-14-03",
  "lesson": 14,
  "tier": 3,
  "title": "scraper.py 3/4 clean_text、to_number",
  "hint": "实验三 网页数据抓取 · scraper.py 第 3 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def clean_text(s):\n    \"\"\"去标签残留、压缩空白。\"\"\"\n    s = re.sub(r\"<[^>]+>\", \"\", s)\n    return re.sub(r\"\\s+\", \" \", s).strip()\n\n\ndef to_number(s):\n    \"\"\"'1,234.5' -> 1234.5；解析失败返回 0.0。\"\"\"\n    s = clean_text(s).replace(\",\", \"\").replace(\" \", \"\")\n    try:\n        return float(s)\n    except ValueError:\n        return 0.0\n\n\ndef parse_page(html):\n    \"\"\"把整页 HTML 解析成国家字典列表。\"\"\"\n    countries = []\n    for block in BLOCK_RE.findall(html):\n        m_name = NAME_RE.search(block)\n        if not m_name:\n            continue\n        name = clean_text(m_name.group(1))\n        if not name:\n            continue\n        capital = CAPITAL_RE.search(block)\n        pop = POP_RE.search(block)\n        area = AREA_RE.search(block)\n        countries.append({\n            \"name\": name,\n            \"capital\": clean_text(capital.group(1)) if capital else \"\",\n            \"population\": int(to_number(pop.group(1))) if pop else 0,\n            \"area\": to_number(area.group(1)) if area else 0.0,\n        })\n    return countries\n\n"
 },
 {
  "id": "oop-14-04",
  "lesson": 14,
  "tier": 3,
  "title": "scraper.py 4/4 scrape、save",
  "hint": "实验三 网页数据抓取 · scraper.py 第 4 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def scrape():\n    html = fetch_page()\n    countries = parse_page(html)\n    if not countries:\n        raise RuntimeError(\"解析到 0 条记录：页面结构可能变了\")\n    return countries\n\n\ndef save(countries, path):\n    with open(path, \"w\", encoding=\"utf-8\") as f:\n        json.dump(countries, f, ensure_ascii=False, indent=2)\n\n\ndef main():\n    ap = argparse.ArgumentParser()\n    ap.add_argument(\"--out\", default=\"data_scraped.json\")\n    args = ap.parse_args()\n\n    start = time.time()\n    print(f\"抓取 {URL} ...\")\n    countries = scrape()\n    elapsed = time.time() - start\n    save(countries, args.out)\n\n    missing = [c[\"name\"] for c in countries if not c[\"capital\"] or c[\"area\"] <= 0]\n    print(f\"完成：{len(countries)} 条记录，耗时 {elapsed:.1f}s，已写入 {args.out}\")\n    if missing:\n        print(f\"注意：{len(missing)} 条存在缺失字段，例如 {missing[:3]}\")\n    print(f\"抽样：{countries[0]}\")\n\n\nif __name__ == \"__main__\":\n    main()\n"
 },
 {
  "id": "oop-14-05",
  "lesson": 14,
  "tier": 4,
  "title": "merge.py 1/3 load",
  "hint": "实验三 网页数据抓取 · merge.py 第 1 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"merge.py —— 把爬虫结果与实验2 手工录入的 data.json 合并去重。\n\n规则：\n  - 以国家名（忽略大小写、去首尾空格）为唯一键；\n  - 两边都有时保留手工录入那份（人工核对过，更可信）；\n  - 面积缺失（<=0）的记录默认丢弃，可用 --keep-missing 保留。\n\n运行： python3 merge.py --scraped data_scraped.json --manual ../Lab2_JSON文件存储/参考项目/data.json --out data.json\n\"\"\"\n\nimport argparse\nimport json\nimport os\n\n\ndef load(path):\n    if not os.path.exists(path):\n        print(f\"[提示] {path} 不存在，按空表处理\")\n        return []\n    with open(path, \"r\", encoding=\"utf-8\") as f:\n        return json.load(f)\n\n"
 },
 {
  "id": "oop-14-06",
  "lesson": 14,
  "tier": 4,
  "title": "merge.py 2/3 key、merge",
  "hint": "实验三 网页数据抓取 · merge.py 第 2 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def key(country):\n    return country.get(\"name\", \"\").strip().lower()\n\n\ndef merge(scraped, manual, keep_missing=False):\n    \"\"\"返回 (合并结果, 统计信息)。\"\"\"\n    result, seen = [], set()\n    stats = {\"manual\": 0, \"scraped\": 0, \"duplicate\": 0, \"dropped\": 0}\n\n    for c in manual:\n        k = key(c)\n        if not k or k in seen:\n            continue\n        seen.add(k)\n        result.append(c)\n        stats[\"manual\"] += 1\n\n    for c in scraped:\n        k = key(c)\n        if not k:\n            continue\n        if k in seen:\n            stats[\"duplicate\"] += 1\n            continue\n        if not keep_missing and (c.get(\"area\", 0) <= 0 or not c.get(\"capital\")):\n            stats[\"dropped\"] += 1\n            continue\n        seen.add(k)\n        result.append(c)\n        stats[\"scraped\"] += 1\n\n    return result, stats\n\n"
 },
 {
  "id": "oop-14-07",
  "lesson": 14,
  "tier": 5,
  "title": "merge.py 3/3 main",
  "hint": "实验三 网页数据抓取 · merge.py 第 3 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def main():\n    ap = argparse.ArgumentParser()\n    ap.add_argument(\"--scraped\", default=\"data_scraped.json\")\n    ap.add_argument(\"--manual\", default=\"data.json\")\n    ap.add_argument(\"--out\", default=\"data.json\")\n    ap.add_argument(\"--keep-missing\", action=\"store_true\")\n    args = ap.parse_args()\n\n    scraped = load(args.scraped)\n    manual = load(args.manual)\n    result, stats = merge(scraped, manual, args.keep_missing)\n\n    with open(args.out, \"w\", encoding=\"utf-8\") as f:\n        json.dump(result, f, ensure_ascii=False, indent=2)\n\n    print(f\"手工 {stats['manual']} 条 + 爬虫新增 {stats['scraped']} 条 \"\n          f\"= 合并 {len(result)} 条\")\n    print(f\"去重跳过 {stats['duplicate']} 条，丢弃缺字段 {stats['dropped']} 条 → {args.out}\")\n\n\nif __name__ == \"__main__\":\n    main()\n"
 },
 {
  "id": "oop-15-01",
  "lesson": 15,
  "tier": 2,
  "title": "label_data.py 1/2 label_of",
  "hint": "实验四 Numpy 数据分类 · label_data.py 第 1 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"label_data.py —— 实验4 参考项目：给 data.json 加分类标签 y。\n\n规则：area > 100000 km² → y=1（大国），否则 y=0（小国）。\n边界说明：正好等于 100000 时按\"不大于\"归 0（严格大于才记 1）。\n\n运行： python3 label_data.py [--in data.json] [--out data_labeled.json]\n\"\"\"\n\nimport argparse\nimport json\n\nTHRESHOLD = 100000.0\n\n\ndef label_of(area):\n    return 1 if float(area) > THRESHOLD else 0\n\n"
 },
 {
  "id": "oop-15-02",
  "lesson": 15,
  "tier": 2,
  "title": "label_data.py 2/2 label_countries、distribution",
  "hint": "实验四 Numpy 数据分类 · label_data.py 第 2 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def label_countries(countries):\n    labeled = []\n    for c in countries:\n        item = dict(c)\n        item[\"y\"] = label_of(c.get(\"area\", 0))\n        labeled.append(item)\n    return labeled\n\n\ndef distribution(labeled):\n    big = sum(1 for c in labeled if c[\"y\"] == 1)\n    return big, len(labeled) - big\n\n\ndef main():\n    ap = argparse.ArgumentParser()\n    ap.add_argument(\"--in\", dest=\"src\", default=\"data.json\")\n    ap.add_argument(\"--out\", default=\"data_labeled.json\")\n    args = ap.parse_args()\n\n    with open(args.src, \"r\", encoding=\"utf-8\") as f:\n        countries = json.load(f)\n\n    labeled = label_countries(countries)\n    with open(args.out, \"w\", encoding=\"utf-8\") as f:\n        json.dump(labeled, f, ensure_ascii=False, indent=2)\n\n    big, small = distribution(labeled)\n    print(f\"共 {len(labeled)} 条：大国 y=1 {big} 条，小国 y=0 {small} 条 \"\n          f\"（阈值 area > {THRESHOLD:,.0f} km²）→ {args.out}\")\n\n\nif __name__ == \"__main__\":\n    main()\n"
 },
 {
  "id": "oop-15-03",
  "lesson": 15,
  "tier": 3,
  "title": "split_data.py 1/2 split",
  "hint": "实验四 Numpy 数据分类 · split_data.py 第 1 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"split_data.py —— 实验4 参考项目：80/20 划分训练集与测试集。\n\n用固定随机种子保证每次运行划分一致（可复现），\n并输出 train.json / test.json 两个文件供检查。\n\"\"\"\n\nimport argparse\nimport json\n\nimport numpy as np\n\n\ndef split(items, test_ratio=0.2, seed=42):\n    \"\"\"按比例随机划分，返回 (train, test)。\"\"\"\n    rng = np.random.default_rng(seed)\n    idx = rng.permutation(len(items))\n    n_test = max(1, int(round(len(items) * test_ratio)))\n    test_idx = set(idx[:n_test].tolist())\n    train = [it for i, it in enumerate(items) if i not in test_idx]\n    test = [it for i, it in enumerate(items) if i in test_idx]\n    return train, test\n\n"
 },
 {
  "id": "oop-15-04",
  "lesson": 15,
  "tier": 3,
  "title": "split_data.py 2/2 main",
  "hint": "实验四 Numpy 数据分类 · split_data.py 第 2 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def main():\n    ap = argparse.ArgumentParser()\n    ap.add_argument(\"--in\", dest=\"src\", default=\"data_labeled.json\")\n    ap.add_argument(\"--ratio\", type=float, default=0.2)\n    ap.add_argument(\"--seed\", type=int, default=42)\n    args = ap.parse_args()\n\n    with open(args.src, \"r\", encoding=\"utf-8\") as f:\n        items = json.load(f)\n\n    train, test = split(items, args.ratio, args.seed)\n    for name, part in ((\"train.json\", train), (\"test.json\", test)):\n        with open(name, \"w\", encoding=\"utf-8\") as f:\n            json.dump(part, f, ensure_ascii=False, indent=2)\n\n    print(f\"总计 {len(items)} 条 → train {len(train)} 条 / test {len(test)} 条 \"\n          f\"（ratio={args.ratio}, seed={args.seed}）\")\n\n\nif __name__ == \"__main__\":\n    main()\n"
 },
 {
  "id": "oop-15-05",
  "lesson": 15,
  "tier": 4,
  "title": "knn.py 1/3 minmax_normalize、euclidean_d",
  "hint": "实验四 Numpy 数据分类 · knn.py 第 1 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"knn.py —— 实验4 参考项目：用 numpy 手写 KNN 与评估指标（禁用 sklearn）。\"\"\"\n\nimport numpy as np\n\n\ndef minmax_normalize(X):\n    \"\"\"按列做 min-max 归一化：x' = (x - min) / (max - min)。\n\n    population 是百万级、area 是千~百万级，量纲相差极大，\n    不归一化时距离完全被面积主导，KNN 形同虚设。\n    \"\"\"\n    X = np.asarray(X, dtype=float)\n    lo = X.min(axis=0)\n    hi = X.max(axis=0)\n    span = np.where(hi - lo == 0, 1.0, hi - lo)  # 常数列防除零\n    return (X - lo) / span\n\n\ndef euclidean_distances(X_train, x):\n    \"\"\"返回训练集每行到样本 x 的欧氏距离，形状 (n_train,)。\"\"\"\n    diff = X_train - np.asarray(x, dtype=float)\n    return np.sqrt((diff ** 2).sum(axis=1))\n\n"
 },
 {
  "id": "oop-15-06",
  "lesson": 15,
  "tier": 4,
  "title": "knn.py 2/3 knn_predict、knn_predict_all",
  "hint": "实验四 Numpy 数据分类 · knn.py 第 2 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def knn_predict(X_train, y_train, x, k=3, weighted=False):\n    \"\"\"KNN 预测单个样本的类别（0/1 或任意整数标签）。\n\n    weighted=True 时用距离倒数加权投票（距离为 0 时给最大权重）。\n    \"\"\"\n    if k > len(X_train):\n        k = len(X_train)\n    dists = euclidean_distances(X_train, x)\n    idx = np.argsort(dists)[:k]\n    labels = np.asarray(y_train)[idx]\n\n    if not weighted:\n        counts = np.bincount(labels)\n        return int(counts.argmax())\n\n    w = 1.0 / (dists[idx] + 1e-9)\n    scores = np.bincount(labels, weights=w)\n    return int(scores.argmax())\n\n\ndef knn_predict_all(X_train, y_train, X_test, k=3, weighted=False):\n    \"\"\"对测试集批量预测。\"\"\"\n    return np.array([knn_predict(X_train, y_train, x, k, weighted) for x in X_test])\n\n"
 },
 {
  "id": "oop-15-07",
  "lesson": 15,
  "tier": 5,
  "title": "knn.py 3/3 accuracy、confusion_matrix",
  "hint": "实验四 Numpy 数据分类 · knn.py 第 3 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def accuracy(y_true, y_pred):\n    \"\"\"准确率 = 预测正确的样本数 / 总样本数。\"\"\"\n    y_true = np.asarray(y_true)\n    y_pred = np.asarray(y_pred)\n    return float((y_true == y_pred).mean())\n\n\ndef confusion_matrix(y_true, y_pred, labels=(0, 1)):\n    \"\"\"返回 {(真实, 预测): 数量} 的 2x2 混淆矩阵。\"\"\"\n    cm = np.zeros((len(labels), len(labels)), dtype=int)\n    index = {label: i for i, label in enumerate(labels)}\n    for t, p in zip(y_true, y_pred):\n        cm[index[int(t)], index[int(p)]] += 1\n    return cm\n"
 },
 {
  "id": "oop-15-08",
  "lesson": 15,
  "tier": 5,
  "title": "evaluate.py 1/4 导入与常量",
  "hint": "实验四 Numpy 数据分类 · evaluate.py 第 1 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "#!/usr/bin/env python3\n# -*- coding: utf-8 -*-\n\"\"\"evaluate.py —— 实验4 参考项目主流程。\n\n流程：读带标签数据 → 特征矩阵 → min-max 归一化 → 80/20 划分\n      → KNN 预测 → 准确率 + 混淆矩阵 → K 值对比 → 特征消融 → 写 report.txt\n\n运行： python3 evaluate.py\n前置： python3 label_data.py   （生成 data_labeled.json）\n\"\"\"\n\nimport json\n\nimport numpy as np\n\nimport knn\nimport split_data\n"
 },
 {
  "id": "oop-15-09",
  "lesson": 15,
  "tier": 5,
  "title": "evaluate.py 2/4 load_labeled、build_matrix",
  "hint": "实验四 Numpy 数据分类 · evaluate.py 第 2 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "FEATURE_SETS = {\n    \"area\": [\"area\"],\n    \"population\": [\"population\"],\n    \"population+area\": [\"population\", \"area\"],\n    \"population+area+density\": [\"population\", \"area\", \"density\"],\n}\nK_VALUES = [1, 3, 5, 7]\n\n\ndef load_labeled(path=\"data_labeled.json\"):\n    with open(path, \"r\", encoding=\"utf-8\") as f:\n        return json.load(f)\n\n\ndef build_matrix(items, features):\n    \"\"\"构造特征矩阵；density 为派生特征（人口/面积）。\"\"\"\n    X = np.array([_raw_row(it, features) for it in items], dtype=float)\n    return knn.minmax_normalize(X)\n\n"
 },
 {
  "id": "oop-15-10",
  "lesson": 15,
  "tier": 5,
  "title": "evaluate.py 3/4 _raw_row、_spans",
  "hint": "实验四 Numpy 数据分类 · evaluate.py 第 3 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def _raw_row(it, features):\n    pop = float(it[\"population\"])\n    area = float(it[\"area\"]) or 1.0\n    value = {\"population\": pop, \"area\": area, \"density\": pop / area}\n    return [value[f] for f in features]\n\n\ndef _spans(X):\n    \"\"\"打印每列跨度，直观看出量纲差异。\"\"\"\n    return \"  \".join(f\"{X[:, i].max() - X[:, i].min():,.0f}\" for i in range(X.shape[1]))\n\n\ndef run_once(items, features, k, seed=42, weighted=False):\n    \"\"\"一次完整实验：划分 → 训练 → 预测 → 指标。\"\"\"\n    train, test = split_data.split(items, 0.2, seed)\n    X_train = build_matrix(train, features)\n    X_test = build_matrix(test, features)\n    y_train = [it[\"y\"] for it in train]\n    y_test = [it[\"y\"] for it in test]\n    y_pred = knn.knn_predict_all(X_train, y_train, X_test, k, weighted)\n    return {\n        \"k\": k, \"features\": \"+\".join(features),\n        \"accuracy\": knn.accuracy(y_test, y_pred),\n        \"cm\": knn.confusion_matrix(y_test, y_pred),\n        \"test\": test, \"y_test\": y_test, \"y_pred\": y_pred,\n    }\n\n"
 },
 {
  "id": "oop-15-11",
  "lesson": 15,
  "tier": 5,
  "title": "evaluate.py 4/4 main",
  "hint": "实验四 Numpy 数据分类 · evaluate.py 第 4 段（打完按顺序拼接即得完整文件）",
  "alt": false,
  "code": "def main():\n    items = load_labeled()\n    big = sum(1 for it in items if it[\"y\"] == 1)\n    lines = []\n    log = lines.append\n\n    log(\"=\" * 62)\n    log(\"实验4 · KNN 国家大小分类报告\")\n    log(\"=\" * 62)\n    log(f\"样本总数 {len(items)}，其中大国(y=1) {big}、小国(y=0) {len(items) - big}\")\n    log(\"特征归一化：min-max；距离：欧氏；划分：80/20（seed=42）\")\n    log(\"\")\n\n    # 1) 主实验：人口+面积，K=3\n    main_run = run_once(items, FEATURE_SETS[\"population+area\"], k=3)\n    log(f\"[主实验] 特征 population+area，K=3 → 准确率 {main_run['accuracy']:.2%}\")\n    log(f\"混淆矩阵（行=真实 0/1，列=预测 0/1）：\\n{main_run['cm']}\")\n    log(\"\")\n\n    # 2) K 值对比\n    log(\"[K 值对比] 特征 population+area\")\n    log(f\"{'K':>3}  {'准确率':>8}\")\n    k_results = []\n    for k in K_VALUES:\n        r = run_once(items, FEATURE_SETS[\"population+area\"], k)\n        k_results.append(r)\n        log(f\"{k:>3}  {r['accuracy']:>8.2%}\")\n    log(\"\")\n\n    # 3) 特征消融\n    log(\"[特征消融] K=3\")\n    log(f\"{'特征组合':<28}{'准确率':>8}\")\n    feat_results = []\n    for name, feats in FEATURE_SETS.items():\n        r = run_once(items, feats, 3)\n        feat_results.append(r)\n        log(f\"{name:<28}{r['accuracy']:>8.2%}\")\n    log(\"\")\n\n    # 4) 归一化消融：用 population+density（量纲差 10^9 倍），density 不归一化会被彻底淹没\n    train, test = split_data.split(items, 0.2, 42)\n    feats = FEATURE_SETS[\"population+area+density\"]\n    X_train_raw = np.array([_raw_row(it, feats) for it in train], dtype=float)\n    X_test_raw = np.array([_raw_row(it, feats) for it in test], dtype=float)\n    y_train = [it[\"y\"] for it in train]\n    y_test = [it[\"y\"] for it in test]\n    raw_acc = knn.accuracy(y_test, knn.knn_predict_all(X_train_raw, y_train, X_test_raw, 3))\n    norm_acc = run_once(items, feats, 3)[\"accuracy\"]\n    log(\"[归一化消融] 特征 population+area+density，K=3\")\n    log(f\"{'不归一化':<28}{raw_acc:>8.2%}\")\n    log(f\"{'min-max 归一化':<28}{norm_acc:>8.2%}\")\n    log(f\"各列取值跨度：{_spans(X_train_raw)}\")\n    log(\"→ 不归一化时 area（百万级）独裁距离，density（0~10^4）几乎不起作用。\")\n    log(\"\")\n\n    # 5) 逐样本预测（前 8 条）\n    log(\"[逐样本预测] 主实验测试集前 8 条\")\n    log(f\"{'国家':<24}{'面积':>12}{'真实':>5}{'预测':>5}\")\n    for it, t, p in list(zip(main_run[\"test\"], main_run[\"y_test\"], main_run[\"y_pred\"]))[:8]:\n        log(f\"{it['name']:<24}{it['area']:>12,.0f}{t:>5}{p:>5}\")\n    log(\"\")\n\n    # 6) 加权投票对比（提高任务）\n    w_run = run_once(items, FEATURE_SETS[\"population+area\"], 3, weighted=True)\n    log(f\"[加权投票] 距离倒数加权，K=3 → 准确率 {w_run['accuracy']:.2%}\")\n    log(\"\")\n\n    log(\"[结论]\")\n    best_k = max(k_results, key=lambda r: r[\"accuracy\"])\n    log(f\"- 最佳 K = {best_k['k']}（准确率 {best_k['accuracy']:.2%}）；\"\n        \"K 过小易受噪声影响，K 过大则把远处样本拉进投票。\")\n    best_f = max(feat_results, key=lambda r: r[\"accuracy\"])\n    log(f\"- 最佳特征组合：{best_f['features']}（{best_f['accuracy']:.2%}）\")\n    log(f\"- 归一化把 accuracy 从 {raw_acc:.2%} 提到 {norm_acc:.2%}：不归一化时量纲大的列独裁距离，小量纲特征等于没加。\")\n\n    text = \"\\n\".join(lines)\n    print(text)\n    with open(\"report.txt\", \"w\", encoding=\"utf-8\") as f:\n        f.write(text + \"\\n\")\n\n\nif __name__ == \"__main__\":\n    main()\n"
 }
];
