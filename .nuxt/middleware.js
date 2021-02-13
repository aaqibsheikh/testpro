const middleware = {}

middleware['api/index'] = require('../middleware/api/index.js')
middleware['api/index'] = middleware['api/index'].default || middleware['api/index']

middleware['auth'] = require('../middleware/auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

export default middleware
