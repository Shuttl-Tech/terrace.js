# Shuttl - Frontend Starter
Re-making the supply panel frontend, properly.

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
> Note: `NODE_ENV=src` is in effect. Use that to specify import paths in any files.

### File layout plan [.js]
```
Library imports
Util imports
Icon imports
Component imports
import './styles.css';
constant declarations

Component declaration *
Export declaration (* if not exported at component declaration)
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
4. Parametrized URLs/routes can be processed with `parametrizeRoute` in `src/utils/transition.js`.
3. All outgoing payloads are sent through the `normalizer` defined in `src/adapters/application.js`.
4. Add incoming payloads are received through the `serializer` defined in `src/adapters/application.js`.
5. If custom handling for a resource is required, add a resource type to the `schema` defined in `src/adapters/application.js`.
6. Read http://jsonapi.org/ for an idea about how to construct and establish resources and relationships.
7. Authentication is cookie based.

### Routes
1. All routes (with parameters, or otherwise) are defined in `src/routes.js`.
2. We use `react-router` `v4`. The usage is as indicated by the documentation.
3. Any usages of link tags to parametrized routes **must be** processed through the `parametrizeRoute` function in `src/utils/transition.js` (docs at source).

---

### Developer Notes
1. Flow is added, but integration is very thin.
2. Project Directory Structure is opinionated.
3. Internationalization is enabled, and optional.
4. Initial testing setup has been prepared, and some unit and integration tests added.
5. File generators are yet to be added.
