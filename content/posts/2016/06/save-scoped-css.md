+++
aliases = ["/posts/save-scoped-css.html"]
date = "2016-06-09T00:00:00-05:00"
title = "Save Scoped CSS"

+++
_**Update June 23, 2016:** The editor's draft has been updated again. It looks like `@scope` is gone for good, so this post is now a moot point. The way forward now lies in the Shadow DOM._

---

About <a href="/posts/into-the-future-of-css.html#scoped-css">a year ago</a>, I wrote about a promising feature of CSS, scoping. I love the idea of this feature, and I think it could be one of the most important changes in the near future of CSS. You know all those complaints about “in CSS everything is global"? This feature is the answer.

I became excited recently when I noticed some movement in the W3C concerning this spec. So I took a look at what was going on. I found some good news, and I found some bad news.

## The good news

The <a href="https://drafts.csswg.org/css-scoping/">editor's draft of the specification</a> has recently been updated. The changes, I think, significantly improve the viability of the feature. They more closely resemble the hypothetical changes I wished for last year. Most importantly, scoped styles would no longer need to be defined inline in the HTML document; you can define scoped styles in an external stylesheet.

The proposed syntax looks like this, using a new `@scope` at-rule:

```css
@scope .foo-module {
  p {
    color: blue;
  }
}

@scope .bar-module {
  p {
    color: red;
  }
}
```

Each scope is defined with a selector (`.foo-module`, `.bar-module`). This establishes a new scope for matched elements and their descendants. Inside the braces that follow, you can specify any styles you wish. These styles are then applied only to the elements belonging to that scope.

According to the rules of <a href="https://www.w3.org/TR/css-cascade-3/#cascade-scope">the cascade</a>, rules applied to an inner scope will override those applied to an outer scope, <em>regardless of their selector specificity</em>. This is precisely the behavior CSS-in-JS and/or CSS Modules users want! And yes, this definition is in the current Candidate Recommendation of the spec.

This means, given the example above, a `foo-module` inside a `bar-module` will have blue text; and a `bar-module` inside a `foo-module` will have red text. This could solve so many developer frustrations.

## The bad news

I got excited when I saw these changes, so I started reading more on what prompted them. I discovered that it is a sort of last-ditch effort to salvage the spec. The problem? Browser vendors have shown no interest in implementing it. Firefox has long-since implemented the earlier version of the spec, but that's it.

If we developers want this feature, we need to let the browser vendors know. Otherwise, it's DOA.

So tell them, please. Follow these links, and up-vote or leave comments in support of scoped styles:

* <a href="https://groups.google.com/a/chromium.org/forum/#!searchin/blink-dev/scoped/blink-dev/R1x18ZLS5qQ/Bjuh_cENhlQJ">Chrome</a>
* <a href="https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/14895573--scope">Edge</a>
* I couldn't find a channel for Safari. If you know where it is, please let me know and I'll add it here.

Let's not allow this to die.
