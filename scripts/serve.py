"""Serve the static export like a hosting would: /dir/ -> dir/index.html, anything missing -> 404.html with status 404.

Usage (from web/): python3 -I scripts/serve.py [PORT] [DIR]   (defaults: 3100, out)
"""
import functools
import http.server
import os
import sys
import urllib.parse


class Handler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        # Existing files and folders with an index go to the stock handler (it also redirects /dir to /dir/).
        if os.path.isfile(path) or os.path.isfile(os.path.join(path, "index.html")):
            return super().send_head()
        page = os.path.join(self.directory, "404.html")
        try:
            f = open(page, "rb")
        except OSError:
            return super().send_head()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(os.fstat(f.fileno()).st_size))
        self.end_headers()
        return f

    def log_message(self, fmt, *args):
        sys.stderr.write("%s %s\n" % (urllib.parse.unquote(self.path), args[1] if len(args) > 1 else ""))


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3100
    root = os.path.abspath(sys.argv[2] if len(sys.argv) > 2 else "out")
    server = http.server.ThreadingHTTPServer(("127.0.0.1", port), functools.partial(Handler, directory=root))
    print(f"Serving {root} on http://localhost:{port}/", flush=True)
    server.serve_forever()
