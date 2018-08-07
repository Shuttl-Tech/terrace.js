# Reducers
Reducers go in as `views/view-name/reducer-name.js`.

The `actions` and `tasks` also go in that directory.

They are imported into `reducers/index.js`.

If ever there needs to be a reducer for a generic view-agnostic purpose, that reducer and relevant actions will be declared in a new folder named `state-managers`.

To do this:
1. Create a folder in `src` named `state-managers`.
2. Create a subdirectory in `state-managers` by a name that describes your reducer, eg. For a reducer to handle some Google Maps UI state, try `map-ui-state`.
3. Add the relevant actions and to that folder. (Inside `map-ui-state` in the example.)
4. Import that reducer into `reducers/index.js`, and get started.
