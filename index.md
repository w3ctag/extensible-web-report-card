---
layout: default
title: The Extensible Web Report Card
bodyClass: spec
---

## Criteria

- How well does a particular specification or technology implement the extensibility approach outlined in the [Extensible Web Manifesto](http://extensiblewebmanifesto.org)?
- Has the spec exposed a low-level capability?
- Does the spec have a good layering story?

## Overall Discussion

The process of archaeology to extension. Working top-down vs. bottom-up (both have advantages and disadvantages).

Some web specs intentionally delegate behavior to the OS (scroll, look of form controls, etc.) and this is a good thing. However, it may have the effect of making it hard to define extensibility points. When we don't define them, people end up rebuilding the stack, often in a way that works poorly outside of the OS they were copying.

When you make a new spec that is related (either higher or lower level) to an existing feature, you should explicitly think and describe in the spec how they are connected to each other.

This is a living report card and will continue to change as new information becomes available and as web technologies evolve and become more extensible.

NB: Just because something is not on this list doesn't necessarily mean it's “bad” or “good” with respect to extensibility. It just means we haven't considered that particular specification in our discussions.  If you have a suggestion about how a new or existing spec should be graded as far as extensibility goes (or a suggested correction), please feel free to [open an issue](https://github.com/w3ctag/extensible-web-report-card/issues) or send us a pull request.

<section class="grade">

## Plays Well With Others

### Service Worker

[Service Workers](https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md) crack open an aspect of browser behavior which was previously not under the control of developers. SWs provide control over the network layer for an origin's request. From an extensibility perspective, they are a viable way to explain how AppCache works and succeed in providing primitives (`fetch()`, events like `onfetch`, and Caches) instead of an omnibus, welded-shut feature.

Areas for improvement include streaming, resource prioritization, interaction with web sockets and other non-HTTP protocols (e.g. WebRTC), and interaction with first-document loading.

### asm.js

Fast code is enabling. There are things you simply cannot do without good performance (games, codecs).

When JS was slow, it was hard to build even basic abstractions. The next frontier was low-level memory management via ArrayBuffer. The final frontier was across-the-board native performance via asm.js.

Areas for improvement include a lack of vectorized instructions, FFI with JS, and threading primitives.

### [Custom elements](http://w3c.github.io/webcomponents/spec/custom/)

Custom elements is a great example of unearthing fundamental bedrock that was left unexplained for a long time. They give some idea of how the HTML parser generates a DOM tree of JavaScript objects from a stream of text, as well as insight into element lifecycles.

Areas for improvement include adding more lifecycle hooks (e.g. [for cloning](https://www.w3.org/Bugs/Public/show_bug.cgi?id=24570)), integration with ES6 classes, and some subtle issues regarding the "upgrading" of unknown elements at initial parse time to custom elements after registration. Also see the "miscellaneous native element capabilities" section below.

### `<template>`

Template finally exposes HTML fragment parsing (i.e. the ability to parse without being confined to a specific context, which is important for elements like `<thead>` etc.). It also gives the ability to parse without executing, separating those two primitives into properly layered capabilities.

### Mutation observers

Mutation obsevers are a start at explaining how browsers react to DOM changes: for example, performing a layout/paint or other update when their HTML attributes change.

An area for improvement, especially with regard to developer-facing ergonomics, is the lack of unification with `Object.observe()`. Since some relevant information about elements is only exposed through JavaScript properties instead of HTML attributes, `Object.observe` would need to be used instead of mutation observers for those (at least, once we spec how `Object.observe` interacts with DOM properties). This situation can be frustrating for developers since they have to watch two sources of data.

### URL Parsing API

URL parsing is a relatively small capability that all browsers have code for, but until recently was not exposed to developers. In the bad old days, you had to create `<a>` and `<base>` tags, set their `href`, and then seeing what happens after they go back through the browser's code and do their thing. Now, there is an actual API that exposes relative and absolute [URL parsing](https://url.spec.whatwg.org/#api)! It's the little things in life.

### Explaining the DOM via JavaScript

These days, pretty much all DOM APIs can be faithfully explained using JavaScript constructs. Getters and setters provide the basics; proxies can be used for exotic cases; and weak maps provide an explanation for private state. The shift in thinking from "host object" with strange capabilities in ES5, to "exotic object" with an overriden meta-object protocol in ES6, provides a good conceptual framework for this going forward, e.g. API authors should prefer ordinary objects to exotic ones. The only remaining unexplained thing is  `document.all`'s falsey-object behavior -- which needs to die in a fire, i.e. we are comfortable leaving it unexplained.

An area for improvement is [a better story for private state](https://esdiscuss.org/topic/proposal-abstract-references); weak maps are semantically complete but syntactically awkward and hard to optimize for this use case.

### [Web Crypto](https://dvcs.w3.org/hg/webcrypto-api/raw-file/tip/spec/Overview.html)

Web Crypto provides access to some of the latent cryptographic primitives that have existed in the web platform for a very long time. This is a hugely heartening development.

Areas for improvement include [access to secure elements (e.g. smart cards)](http://opoto.github.io/secure-element/), explanation of the processing model for crypto operations inside the platform (e.g. a conceptual or practical "secure worker"), and access to more aspects of the TLS stack that is latent in browsers.

### [Web Animations](http://w3c.github.io/web-animations/)

Web Animations expose low-level capabilities and describes how existing animations work in a terms of low-level API.

### [Fetch](https://fetch.spec.whatwg.org/)

Fetch is a good example of platform archaeology. The concept of "fetching," i.e. doing HTTP requests and retrieving corresponding responses, was previously done in a fairly ad-hoc way, with per-use-case customizations growing up in various different contexts. (`<img>`s work one way when same-origin, another cross-origin; `XMLHttpRequest` respects CORS; `<iframe>`s respect certain headers; etc...) The Fetch Standard provides a common conceptual framework every part of the platform can build on, with customization points as necessary to suit the many different use cases in a unified and coherent manner. It then exposes that framework to web developers with the [Fetch API](https://fetch.spec.whatwg.org/#fetch-api).

Areas for improvement include [integration with streams](https://github.com/yutakahirano/fetch-with-streams/), as well as smoothing out any rough edges that are discovered as implementations continue.

</section>

<section class="grade">

Is Disruptive In Class
----------------------------

### registerProtocolHandler

A good device capability to expose, but not enough implementations!

### Performance Metrics

We have some loading time APIs ([resource timing](https://w3c.github.io/resource-timing/), [navigation timing](http://w3c.github.io/navigation-timing/), [Server Timing](http://w3c.github.io/server-timing/)), as well as the [frame timing API](http://w3c.github.io/frame-timing/) for smoothness measurements.

### [Shadow DOM](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)

Doesn't actually explain the platform's shadow DOM due to lack of encapsulation and inability to negotiate layout between the component and its surroundings -- similar issue to `<iframe seamless>` and cross-origin content.

Conflates selector matching, CSS inheritance, and event retargeting isolation boundaries into a single primitive

Need e.g. custom pseudo-elements as a way of exposing standardized styling hooks, both for developer-created controls and for standard controls like `<details>` or `<input type="date">`.

### Audio

The [Web Audio API](http://webaudio.github.io/web-audio-api/) exists is awesome compared to just having [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio). Exciting new work is enabling users of this API to even [run their own code on the audio thread](https://plus.google.com/+ChrisWilson/posts/QapzKucPp6Y) and explain the built-in Audio Node types as [self-hostable scripts](http://webaudio.github.io/web-audio-api/#dfn-audioworker).

Areas for improvement across the platform remain large: the layering story about how Web Audio explains other APIs remains problematic. How does Web Audio relate to `<audio>` and `<video>` and [WebRTC](http://www.webrtc.org/)? How, for instance, would a developer build a custom element that re-implements `<audio>` using the primitive APIs? It seems that encoding/decoding APIs are missing, buffering and audio file loading are magical, and no API relates an underlying Web Audio context to an `<audio>`/`<video>`. E.g., it isn't possible to plug into only the portions of `<audio>` that you'd like to override and use the latent Web Audio system to build new behavior.

Further concerns include the relationship between Web Audio graphs and the default output context for a page?

### [Object.observe](http://www.html5rocks.com/en/tutorials/es7/observe/)

Good primitive, helps explain things. Lack of implementations is holding it back.

### [Intention Events](http://w3c.github.io/editing-explainer/responsive-input-explainer.html)

Ability to understand a platform-specific, high-level intention like "paste", vs. having to reverse-engineer from the specific keyboard events that occurred. This can be especially problematic because the intent can be triggered in different ways in different platforms (or via screen readers etc.). An easy example is how on Windows undo is Ctrl+Z; on Mac it is Cmd+Z; on iOS it is shaking your device up and down.

There is also a problem of not knowing exactly how an element was focused (keyboard focus should show a visual indicator, but mouse should not, and the details may be different per platform).

### [Push API](http://w3c.github.io/push-api/)

Promising work but only partially standardized. A new working group [has formed](https://datatracker.ietf.org/doc/charter-ietf-webpush/) in IETF to [work one of the protocols (app server to push server)](https://martinthomson.github.io/drafts/draft-thomson-webpush-http2.html).

Areas for improvement include standardization of a protocol between the push servers and devices. The W3C API makes use of Promises and Service Worker which is good.

Related issue: [https://github.com/w3ctag/spec-reviews/issues/6](https://github.com/w3ctag/spec-reviews/issues/6)

</section>

<section class="grade">

Runs with Scissors
-------------------------

### Forms

Forms have a lot of problems. E.g. FormData lacks serialization; we have no filepicker API to get the binary blobs from the user's filesystem ourselves; custom elements cannot participate in form submission or get into `form.elements`; validation rules (and UI) are fixed and non-extensible. There are many CSS pseudoselectors having to do with forms that custom elements cannot make match themselves, e.g. `:readonly`, `:valid`/`:invalid`, ...

### Codecs

Images, audio, video -- all are locked away, both decoding and encoding. Need off-main-thread APIs; e.g. explained via workers. Similarly timing about when/where to do image decodes is not exposed making it difficult to efficiently polyfill `<img>`.

### CSS, Layout, and Rendering

In general quite poor. Painting algorithm is composed of 12 secret steps that you can't participate in even though we have a bitmap drawing system in the platform (`<canvas>`). Line breaking is not exposed. Font data is not exposed. RTL decisions are not exposed. Very little control over text quality. No ability to override FOUC/FOUF policies. No extensibility in selectors or media queries. No direct script access to the layer tree. No direct script access to the quad box trees that are generated for 3d transforms. No ability to create a new layout mode.

CSS OM is...low-level in all the wrong ways.

There are glimmers of hope: the Web Animations spec attempts to explain and unify the platform's various animations (e.g. CSS animations, CSS transitions, and SVG), although exactly how this works is [still being specced](https://www.w3.org/Bugs/Public/show_bug.cgi?id=26839). The CSSWG has recently agreed to try speccing the box tree, which is foundational to how layout works. And the ["CSS Extensions"](http://tabatkins.github.io/specs/css-aliases/) editor's draft gives us a path toward custom selectors, combinators, at-rules, and functions---in short, making CSS extensions prolyfillable.

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

Some of these concerns are explored in more detail in the ["Gap Analysis: Accessibility"](https://github.com/domenic/html-as-custom-elements/blob/master/docs/accessibility.md) document from the HTML as Custom Elements project.

### Sensors

We kind of have geolocation and some acces to cameras/mic's, getting ambient light, but not much else. We're slowly getting out of the trap of designing APIs around the assumption of a single sensor of each type. [https://github.com/rwaldron/sensors/](https://github.com/rwaldron/sensors/)

One interesting example of extensible web principles in play is how device orientation is in some ways a higher-level API on top of a magnetometer (and other stuff). For example, Google Cardboard would ideally like to use the magnetometer API directly, so that low-cost magnets can act as a UI for interfacing with your cardboard VR headset. Instead they have to reverse-engineer the magnetometer's behavior from how the device appears to reorient (according to the device orientation API) when a magnet passes by it.

Issue related to orientation API: [https://github.com/w3ctag/spec-reviews/issues/7](https://github.com/w3ctag/spec-reviews/issues/7)

Hopeful: [https://github.com/dglazkov/tubes/blob/master/API.md](https://github.com/dglazkov/tubes/blob/master/API.md)

### Preload Scanner/Resource Priorities

Not pluggable, not controllable, no ability to re-order, no ability to set policy a different way to engine built-ins, no ability to understand easily what's "above the fold".

### Miscellaneous Native Element Capabilities

There are a variety of things that native elements can do that custom elements cannot, due to non-extensible mechanisms in the HTML Standard. We have mentioned some of the more important of these above, e.g. accessibility hooks or form submission. But there are many smaller things too. For example only certain elements can become disabled (which impacts user-facing behavior, the matching of the `:disabled` CSS pseudoselector, and more). Only certain elements can become "active" (CSS `:active`, and user-exposed), and there is no general way of knowing when this happens. Native elements have more control over how they are focusable.

### The Event Loop

HTML defines concepts of microtasks, tasks, and the enqueuing thereof. However, there is no way for developers to inspect these queues, hook into them, or even just use them directly without hacks like `Promise.resolve().then(doMyMicrotask)` (and [worse](https://github.com/YuzuJS/setImmediate#the-tricks)). Ideally developers would be able to monitor all entries into the event loop, to better implement things like [zones](https://github.com/btford/zone.js/) without having to monkey-patch every async API on the platform.

### `<img>`

The magic of `<img>` is largely unexplained.  As an early, high level element, we've not gone back and done the work to explain how it is fetched, loaded, decoded, or how it paints and no extensibility points.  At some level it is a "canvas" with a specific algorithm for determining what it draws, yet it has no exposed relationship with canvas or explanation in terms of the canvas API.

Missing APIs include:

 - programmatic access to encoder and decoder apis
 - control and integration with `Request` generation and dispatch
 - access to the drawing surface area (is it a `<canvas>`? Something else?)
 - access to the internals information on which responsive image decisions are made

### [Media Capture](http://dev.w3.org/2009/dap/camera/)

The Media Capture spec allows you to capture content by way of various media capture mechanisms (camera or microphone, for example) according to a MIME type as a form (file) input.  It doesn't describe itself in terms of the obvious lower level API getUserMedia(), so its magic remains unexplained.

</section>
