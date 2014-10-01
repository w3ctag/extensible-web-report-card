---
layout: default
title: The Extensible Web Report Card
bodyClass: spec
---

Criteria
----------

- How well does a particular specification or technology implement the extensibility approach outlined in the Extensible Web Manifesto?
- Has the spec exposed a low-level capabiloty?
- Does the spec have a good layering story?

Overall Discussion
-------------------------

The process of archealogy to extension. Working top-down vs. bottom-up (both have advantages and disadvantages).

Some web specs intentionally delegate behavior to the OS (scroll, look of form controls, etc.) and this is a good thing. However, it may have the effect of
making it hard to define extensibility points. When we don't define them, people end up rebuilding the stack, often in a way that works poorly outside of
the OS they were copying.

When you make a new spec that is related (either higher or lower level) to an existing feature, you should explicitly think and describe in the spec how they are connected to each other.

Plays Well With Others
-------------------------------

### Service worker!

### asm.js

Fast code is enabling. There are things you simply cannot do without good performance (games, codecs).

When JS was slow, it was hard to build even basic abstractions. The next frontier was low-level memory management via ArrayBuffer. The final frontier was across-the-board native performance via asm.js.

### Custom elements

Explains how the parser generates a DOM tree of JavaScript objects from a stream of HTML text.

Related issue: https://github.com/w3ctag/spec-reviews/issues/16

### `<template>`

Exposes HTML fragment parsing and ability to parse without executing.

### Mutation observers

Explains browser behavior WRT reacting to DOM changes; e.g. for layout/paint invalidation.

Not unified with Object.observe(). The attribute/property split makes it so we can't have nice things.

### URL Parsing API

Before, this was locked up in the process of creating `<a>` and `<base>` tags, setting their `href`, and then seeing what happens after they go back to the browser's code and do their thing. Now, there is an actual API that exposes relative and absolute [URL parsing](https://url.spec.whatwg.org/#api).

### Explaining the DOM via JavaScript

Proxies, weak maps, getters and setters. Pretty much everything except `document.all`'s falsey-object behavior -- which needs to die in a fire. The shift from "host object" in ES5 to "exotic object" in ES6

### WebCrypto

[need some text]

Related issue: https://github.com/w3ctag/spec-reviews/issues/3

Is Disruptive In Class
----------------------------

### registerProtocolHandler

A good device capability to expose, but not enough implementations!

### Performance Metrics

We have some loading time APIs (resource timing, navigation timing), but e.g. no FPS measurement API. (Link to talks.)

### Shadow DOM

Doesn't actually explain the platform's shadow DOM due to lack of encapsulation and inability to negotiate layout between the component and its surroundings -- similar issue to `<iframe seamless>` and cross-origin content.

Conflates selector matching, CSS inheritance, and event retargeting isolation boundaries into a single primitive

Need e.g. custom pseudo-elements as a way of exposing standardized styling hooks, both for developer-created controls and for standard controls like `<details>` or `<input type="date">`.

### Audio

The fact web audio exists is awesome compared to just having `<audio>`. But layering story is not yet good, both within web audio and how it relates to `<audio>`.

E.g., how does Web Audio related to the default output context for a page? How does it relate to `<audio>` and `<video>`? Can we implement `PannerNode` as code on top of some kind of scriptable audio node?

Related issue: https://github.com/w3ctag/spec-reviews/issues/5

### Object.observe

Good primitive, helps explain things. Lack of implementations is holding it back.

### Intention Events

Ability to understand a platform-specific, high-level intention like "paste", vs. having to reverse-engineer from the specific keyboard events that occurred. This can be especially problematic because the intent can be triggered in different ways in different platforms (or via screen readers etc.). An easy example is how on Windows undo is Ctrl+Z; on Mac it is Cmd+Z; on iOS it is shaking your device up and down.

There is also a problem of not knowing exactly how an element was focused (keyboard focus should show a visual indicator, but mouse should not, and the details may be different per platform).

### Push API

Promising work but only half standardized and not fully implemented anywhere yet. New working group forming in IETF to work on the protocol part.

Related issue: https://github.com/w3ctag/spec-reviews/issues/6

Runs with Scissors
-------------------------

### Forms

Forms have a lot of problems. E.g. FormData lacks serialization; we have no filepicker API to get the binary blobs from the user's filesystem ourselves; custom elements cannot participate in form submission or get into `form.elements`; validation rules (and UI) are fixed and non-extensible. There are many CSS pseudoselectors having to do with forms that custom elements cannot make match themselves, e.g. `:readonly`, `:valid`/`:invalid`, ...

### Codecs

Images, audio, video -- all are locked away, both decoding and encoding. Need off-main-thread APIs; e.g. explained via workers. Similarly timing about when/where to do image decodes is not exposed making it difficult to efficiently polyfill `<img>`.

### CSS, Layout, and Rendering

In general quite poor. Painting algorithm is composed of 12 secret steps that you can't participate in even though we have a bitmap drawing system in the platform (`<canvas>`). Line breaking is not exposed. Font data is not exposed. RTL decisions are not exposed. Very little control over text quality. No ability to override FOUC/FOUF policies. No extensibility in selectors or media queries. No direct script access to the layer tree. No direct script access to the quad box trees that are generated for 3d transforms. No ability to create a new layout mode.

CSS OM is...low-level in all the wrong ways.

There are glimmers of hope: the Web Animations spec attempts to explain and unify the platform's various animations (e.g. CSS animations, CSS transitions, and SVG), although exactly how this works is still being specced (TODO: link to the open bugs). The CSSWG has recently agreed to try speccing the box tree, which is foundational to how layout works. And the ["CSS Extensions"](http://tabatkins.github.io/specs/css-aliases/) editor's draft gives us a path toward custom selectors, combinators, at-rules, and functions---in short, making CSS extensions prolyfillable.

### Editing (`contenteditable`)

`contenteditable` is the epitome of a non-extensible high-level API that tries to do too much, and forces developers to reinvent most of it when it fails for their particular use case. Posts like ["Why ContentEditable is Terrible, Or: How the Medium Editor Works"](https://medium.com/medium-eng/why-contenteditable-is-terrible-122d8a40e480) explain this in depth. There are efforts to reform `contenteditable` back down to its component pieces, such as intention events, cursor support, and more. But they are very nascent.

### CSP

Useful, provides control over behavior previously reserved to the UA (good!) but needs an API

### AppCache

Getting help. Has been sent to summer school.

### Scrolling

Scroll is fundamentally a native capability that works differently across platforms. Attempts to polyfill with JS require per-platform detection and implementation (not feasible in practice).

Hooks into the lifecycle help users perform actions together with scrolling, but they are currently too limited for some use-cases, such as pull-to-refresh and DOM replacement (like `NSTableView`).

Glimmers of hope: Chrome's beforescroll proposal; iOS 8's better stuff; proposals to make scrolling an "animation timeline"

### ARIA & a11y

Accessibility engine is not exposed very well. E.g. `<figcaption>` is exposed to accessibility technologies as captions, but ARIA has no `role="caption"`. There is no way to tell assistive technology certain things ("you are on a manipulable range slider"), or take intents from an assistive technology ("move this slider left") and make them work for your own custom controls.

ARIA is a closed vocabulary (ala HTML without Custom Elements).

Zoom levels -- difficult to to detect if the OS has been put into a mode that enables lower-fidelity pointer interactions. Browsers generally zoom and text gets larger, which is good, but this is detected by side effect in JS.

High-contrast mode -- also detectable by side-effect but not available through an API. Many many hacks required for information that UA's are fully aware of. Should likely be exposed through both API and media query.

### Sensors

We kind of have geolocation and some acces to cameras/mic's, getting ambient light, but not much else. We're slowly getting out of the trap of designing APIs around the assumption of a single sensor of each type. https://github.com/rwaldron/sensors/

One interesting example of extensible web principles in play is how device orientation is in some ways a higher-level API on top of a magnetometer (and other stuff). For example, Google Cardboard would ideally like to use the magnetometer API directly, so that low-cost magnets can act as a UI for interfacing with your cardboard VR headset. Instead they have to reverse-engineer the magnetometer's behavior from how the device appears to reorient (according to the device orientation API) when a magnet passes by it.

Issue related to orientation API: https://github.com/w3ctag/spec-reviews/issues/7

Hopeful: https://github.com/dglazkov/tubes/blob/master/API.md

### Preload Scanner/Resource Priorities

Not pluggable, not controllable, no ability to re-order, no ability to set policy a different way to engine built-ins, no ability to understand easily what's "above the fold".

### Miscellaneous Native Element Capabilities

There are a variety of things that native elements can do that custom elements cannot, due to non-extensible mechanisms in the HTML Standard. We have mentioned some of the more important of these above, e.g. accessibility hooks or form submission. But there are many smaller things too. For example only certain elements can become disabled (which impacts user-facing behavior, the matching of the `:disabled` CSS pseudoselector, and more). Only certain elements can become "active" (CSS `:active`, and user-exposed), and there is no general way of knowing when this happens. Native elements have more control over how they are focusable.

### The Event Loop

HTML defines concepts of microtasks, tasks, and the enqueuing thereof. However, there is no way for developers to inspect these queues, hook into them, or even just use them directly without hacks like `Promise.resolve().then(doMyMicrotask)` (and [worse](https://github.com/YuzuJS/setImmediate#the-tricks)). Ideally developers would be able to monitor all entries into the event loop, to better implement things like [zones](https://github.com/btford/zone.js/) without having to monkey-patch every async API on the platform.
