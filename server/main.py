
from http.server import HTTPServer, BaseHTTPRequestHandler

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)

        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.end_headers()

        html = "<h1>Welcome to my account system!</h1>"
        self.wfile.write(html.encode("utf-8"))

server = HTTPServer(("127.0.0.1", 8000), MyHandler)

print("Server running at http://localhost:8000")
server.serve_forever()
