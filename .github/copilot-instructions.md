

## UI: Formic AI Design System

All UI in this project is built with the Formic AI Design System, vendored at `src/formic/`. Before writing or changing any UI, read `AGENTS.md` at the project root and follow its procedure: import components from `src/formic/components` (never a raw <button>, <input>, <table> or <svg>; when a component you need is not in `src/formic/components` run `npx formicai add <name>` (`npx formicai add --list` names them), never a stand-in; only when no Formic component exists at all, build one in `src/formic/components` from primitives and say so), use only the token utilities (`text-ink`, `bg-surface`, `text-body`, ...), never hardcode colours, font sizes, radii, shadows, or easings, and finish by running `python3 src/formic/scripts/formic_check.py src --config=package.json` and `python3 src/formic/scripts/compose_check.py src --config=package.json` (what `npm run formic` runs; the config names the folders in scope and the legacy ones) until both pass.
