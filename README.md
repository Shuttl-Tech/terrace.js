# Terrace.js
_We built the house, so you can party on the terrace._

A `create-react-app` based frontend starter project, using `react-scripts 2.0+`.

You can get started right-away with testing, files generation, http calls, state-management (with store immutability checks via a plugin), internationalization, etc. handled for you right from the start.

![cli-snap](https://i.snag.gy/M0zoSB.jpg)

## Project Init
```bash
yarn global add terrace.js
terrace create project-name [--without-githooks] [--without-eslint]
# ^ this takes care of project generation, packages installation, and directory change.
yarn start
```
⚠️ `Yarn` is an important pre-requisite.

#### Some global pre-requisites that may not be obvious
- Webpack 4 (for build)
- Watchman ([for testing](https://github.com/facebook/create-react-app/issues/3006))
- Yarn (no, you can't use npm commands as an alternative, not yet)

#### More project commands
```bash
# from anywhere inside your project directory
terrace --help
terrace [command] --help
```

Built on Environment:
```
MacOS 10.13.3 (17D47)
Node 8.11.2 (LTS)
NPM 5.6.0
Yarn 1.7.0
Git 2.18.0
```

## Development
### Init
```bash
yarn install
yarn start

# Required utilities:
brew install watchman # https://github.com/facebook/create-react-app/issues/3006
```
> Note: `NODE_PATH=src` is in effect. Use that to specify import paths in any JS files.

> Note: `SASS=src:node_modules` is in effect. Use that to specify import paths in any SCSS files.

> Note: In `WebStorm`, mark `./src` as Resources Root. _(Rt. click > Mark directory as > Resources root)_

> Note: A `pre-commit` hook (unless `--without-githooks` is specified) runs before every commit to ensure that any specified linters work as intended. Any hooks are defined in .githooks.  
> If githooks don't work, you can initialize them manually using the following commands (provided the project wasn't created with `--without-githooks`)
```bash
chmod +x .githooks/*
git config core.hooksPath .githooks
```

### File layout plan [.js]
```
Library imports
Util imports
Icon imports
Component imports
import './styles.css';
constant declarations

Component declaration and named export
Default component export

Component related functions
```

### Async actions handling (redux-saga)
_If you know how redux-saga is used, skim over this section._

1. Actions are defined in respective `src/views` files.
2. Tasks (the actual functions) are defined in respective `src/views` files.
3. Sagas (the things that trigger tasks) are defined in `src/sagas.js`.

Now, how it works:
1. `Actions` are `dispatch`ed from other places.
2. `Sagas` listen for `actions`, and fire `tasks`.
3. `Tasks` fire the API calls, and `dispatch` some `actions` through `redux-saga`.
4. Those `actions` let us pass data into the `redux` store.
5. Components `connect`ed to the `redux` store listen on updated to the store.
6. Any relevant UI changes are made.

### HTTP calls logic
1. HTTP actions are defined in `src/utils/http.js`.
2. We use `axios`.
3. All API calls are defined in `src/apis.js`.
4. Parametrized URLs/routes can be processed with `parametrizePath` in `src/utils/transition.js`.
3. All outgoing payloads are sent through the `normalizer` defined in `src/adapters/application.js`.
4. Add incoming payloads are received through the `serializer` defined in `src/adapters/application.js`.
5. If custom handling for a resource is required, add a resource type to the `schema` defined in `src/adapters/application.js`.
6. Read http://jsonapi.org/ for an idea about how to construct and establish resources and relationships.
7. Authentication is cookie based.

> Note: Use status code constants from package `http-status-codes` to handle request errors.

> Note: Add logic to `handleFailedResponses` from `utils/error-handlers` to handle weird API error cases. You would however, need to plug it into the HTTP call methods yourself. It's not being used yet.

### Routes
1. All routes (with parameters, or otherwise) are defined in `src/routes.js`.
2. We use `react-router` `v4`. The usage is as indicated by the documentation.
3. Any usages of link tags to parametrized routes **must be** processed through the `parametrizeRoute` function in `src/utils/transition.js` (docs at source).

### Request Caching
To locally store and fetch request payloads, use `{ cache, load }` from `utils/request-cache`.
There is a very thin wrapper on top of `sessionStorage` to make this happen.

_This needs improvements._

`import { cache, load } from 'utils/request-cache';`;

You can do stuff like:

```js
import { cache, load } from 'utils/request-cache';
import { get } from 'utils/http';
import API from 'apis';

async function getResource() {
	let response = load(API.DUMMY) || await get(API.DUMMY);
	cache(API.DUMMY, response);
}
```

### Requesting new resource types
Ideally, there should be a schema defined for each different type of request.

New schemas should be added to `const SCHEMA` in `adapters/application.js`.
Normalizers and Serializers for those should be added to `switch-case` entry in the same file, and functions for them defined somewhere in the format described in `serialize_GENERIC` and `normalize_GENERIC` in the same file.

They are automatically handled in the `http` util by `axios`.

> Note: Use `getRaw` from `utils/http` only for requests where you need low-level request API access. **Not for general purpose HTTP resource request.**

However, for them to be automatically handled in the first place, you need to specify the SCHEMA a request will follow, in the `get, post, ...` calls in this manner:

```js
import { SCHEMA } from 'adapters/application';
import { get } from 'utils/http';
import API from 'apis';

async function getResource() {
	let resource = await get(API.DUMMY, { /* options */ }, SCHEMA.GENERIC);
	// ...
}
```

---

### Developer Notes
1. Flow is added, but integration is very thin.
2. Project Directory Structure is opinionated.
3. Internationalization is enabled, and optional.
4. Initial testing setup has been prepared, and some unit and integration tests added.
5. File generators for components and views have been added.

### Todo
- [x] Make this an installable project from npm.
- [x] Make this project configurable during installation. (partly done)
- [x] Move generators to terrace cli.
- [ ] Improve flow integration.
- [ ] Make terrace projects upgradable using the terrace cli.
- [ ] Compatible with Windows.
- [ ] Test that it works on Linux Distros.
- [x] When a view is created in `--without-reducer` mode, ensure that reducer and actions imports in the view file are removed.
- [x] Add some template parsing logic to the generator system.
- [ ] Implement checking of whether the bin has been built or not by storing the last built hash in the `.terrace-cli` file.
