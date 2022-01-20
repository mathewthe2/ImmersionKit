from unittest import TextTestRunner
from .server.config import config
from .server.run_server import Server
from aqt.webview import AnkiWebView
from aqt import mw
from aqt.qt import *

s = Server('0.0.0.0', 5006, dev_mode=config['dev_mode'])

class ImmersionKitWebView(AnkiWebView):
    def __init__(self):
        AnkiWebView.__init__(self, title="Immersion Kit")
        url = QUrl("http://localhost:5006/search.html")
        # self.set_open_links_externally(False)
        self.load_url(url)

def showApp():
    mw.immersionKitApp = ImmersionKitWebView()
    mw.immersionKitApp.show()
    mw.immersionKitApp.setFocus()
    mw.immersionKitApp.activateWindow()

action = QAction("Immersion Kit Web", mw)

# set it to call testFunction when it's clicked
action.triggered.connect(showApp)

mw.form.menuTools.addAction(action)