import copy
from html.parser import HTMLParser
from pathlib import Path
import unittest
from unittest.mock import patch

from markupsafe import escape

import app as app_module


ROOT = Path(app_module.app.root_path)
IMAGES = {
    "AnhTruongC3.jpg", "ThiSTEM.jpg", "HVKTMM.jpg",
    "baovedoantotnghiep.png", "dulich1.jpg", "dulich2.jpg",
    "dulich3.jpg", "dulich4.jpg", "yeudongvat.png",
}


class PageParser(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.images = set()
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "img" and attrs.get("src", "").startswith("/img/"):
            self.images.add(attrs["src"].removeprefix("/img/"))


class PortfolioRoutesTest(unittest.TestCase):
    def setUp(self):
        self.client = app_module.app.test_client()

    def test_home_renders_all_nine_original_images(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.mimetype, "text/html")
        self.assertEqual(PageParser(response.get_data(as_text=True)).images, IMAGES)

    def test_original_images_and_static_files(self):
        files = [("/img/" + name, ROOT / "img" / name) for name in sorted(IMAGES)]
        files += [
            ("/static/css/style.css", ROOT / "static/css/style.css"),
            ("/static/js/main.js", ROOT / "static/js/main.js"),
            ("/static/favicon.svg", ROOT / "static/favicon.svg"),
        ]
        files += [("/static/fonts/" + path.name, path) for path in (ROOT / "static/fonts").glob("*.ttf")]
        for url, path in files:
            with self.subTest(url=url):
                response = self.client.get(url)
                try:
                    self.assertEqual(response.status_code, 200)
                    self.assertEqual(response.data, path.read_bytes())
                    if url.startswith("/img/"):
                        self.assertEqual(response.mimetype, "image/png" if path.suffix == ".png" else "image/jpeg")
                finally:
                    response.close()

    def test_missing_and_traversal_paths_return_404(self):
        for url in (
            "/missing", "/img/missing.jpg", "/static/missing.js",
            "/img/../app.py", "/img/%2e%2e/app.py", "/img/..%2Fapp.py",
            "/img/..%5Capp.py", "/img/%2e%2e%5Capp.py",
            "/img/D:%5CCode%5CPythonMaster%5CGioiThieuBanThan%5Capp.py",
            "/static/../app.py", "/static/%2e%2e/app.py",
        ):
            with self.subTest(url=url):
                response = self.client.get(url)
                try:
                    self.assertEqual(response.status_code, 404)
                finally:
                    response.close()

    def test_profile_text_and_attributes_are_html_escaped(self):
        payload = '<script>alert("profile")</script><img src=x onerror="alert(1)">'
        profile = copy.deepcopy(app_module.PROFILE)
        profile["hero_title"] = payload
        profile["hero_description"] = payload
        profile["hero_alt"] = payload
        profile["timeline"][0]["caption"] = payload
        with patch.object(app_module, "PROFILE", profile):
            response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        html = response.get_data(as_text=True)
        self.assertNotIn(payload, html)
        self.assertIn(str(escape(payload)), html)
        self.assertIn('alt="' + str(escape(payload)) + '"', html)
        self.assertIn('data-caption="' + str(escape(payload)) + '"', html)


if __name__ == "__main__":
    unittest.main()
