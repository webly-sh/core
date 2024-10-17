<p align="center">
  <a href="https://github.com/webly/core"><img height="200" style="height: 200px" src="https://raw.githubusercontent.com/webly-sh/core/refs/heads/main/logo.png" alt="logo"></a>
  <h1 align="center">Webly</h1>
</p>
<p align="center">
A simple website builder (I hope).
</p>
<hr/>

[![JSR](https://jsr.io/badges/@webly/core)](https://jsr.io/@webly/core)
[![JSR_SCORE](https://jsr.io/badges/@webly/core/score)](https://jsr.io/@webly/core/score)
[![GPL-3](https://img.shields.io/:license-gpl-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.en.html)
[![PRS](https://img.shields.io/badge/PRs-welcome-blue.svg)](http://makeapullrequest.com)

# Intro

Inspired by the recent deno launch video and #wordpressdrama, Webly is an experiment to see if something can be built that is extensible and easy to self-host.

The whole point would be to read from 3 key folders (pages, api, uploads) to serve a site that is easily customizable. 0 config setup, just run and get started through the admin UI.

Thanks to Deno, running it should be fairly straightforward. Customization should be even easier with being able to run straightup .ts files with a simple runtime. Plugins can be managed through JSR so that functionality can be extended.

The rough idea:
- JSX for pages (open to other formats)
- JSX page builder
- Tailwind or Raw CSS for styling
- SQLite for storage
- JSR for plugins
- folder structure for routing
- folder structure for api endpoints
- folder structure for uploaded files
- JWT for auth
- JSR for self-updates

# Up next

- [x] simple folder based router
- [x] basic jsx support
- [x] simple folder based api
- [x] db
- [ ] items
- [ ] page that renders items
- [ ] page that renders detail view of items
- [ ] users
- [ ] admin area to crud items
- [ ] plugins
- [ ] compile with dynamic imports
- [ ] jsx page builder
- [ ] client-side pages
- [ ] self-update

PS: I'm sorry I used ChatGPT to generate the logo. If someone is a designer and wants to rework the logo, I'm happy to change it and give attribution.