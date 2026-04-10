import pathlib
import js2py

source = pathlib.Path('script.js').read_text()
js2py.parse_js(source)
print('PARSE_OK')
