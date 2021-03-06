+++
aliases = ["/posts/css-first.html"]
date = "2015-08-01T10:00:00-05:00"
title = "CSS First"

+++
In 2003, the *CSS Zen Garden* went live, and it spearheaded a revolution. At the time, many web designers were still using tables for layouts, and the battle for semantic markup was underway. The Zen Garden showed the world, in beautiful color, what CSS could do. By changing the CSS, you could make the website retro, postmodern, abstract, or elegant. You could move the sidebar to the left, the right, the top, or the bottom of the page. You could do anything with the font, the colors, the shapes and sizes of the elements on the screen. No changes to the HTML were necessary.

What we didn't realize at the time was how much of a disservice this was for the next generation of designers and developers.

Don't get me wrong, the CSS Zen Garden was an essential part of moving the web forward. Without it, we might have seen table-based designs for much longer than we did. It did a lot of good for us, but it left us with one bad habit: it taught us to write HTML (or take existing HTML), and then write CSS for it. But this is wrong. The HTML shouldn't come first; the CSS should.

## CSS: your first dependency

Many web developers still try to think about how to write their HTML so that it can be sensibly targeted by their CSS. Instead, we aught to be writing selectors that can be used easily by HTML. The HTML depends upon the CSS, not the other way around.

CSS is the first dependency of your website or web application. The HTML expects it to be there; the JavaScript expects it to be there. Certain things are supposed to happen when they add or remove classes. CSS should be modular enough that it can be reused on a number of different web pages, and ideally even across different applications if needed. If you are using a modern practice like <a href="https://smacss.com/">SMACSS</a> or BEM, this thinking is probably not new to you, but it's worth unpacking.

Let's look at a little CSS. The familiar <a href="http://www.stubbornella.org/content/2010/06/25/the-media-object-saves-hundreds-of-lines-of-code/">media object</a> will do:

```css
.media {
  margin: 10px 0;
}
.media::after {
  /* clearfix */
  display: block;
  content: " ";
  clear: both;
}

.media-object {
  float: left;
  margin-right: 10px;
}

.media-body {
  overflow: hidden;
}
```

This is designed for the <code>media</code> class to go on a container div, and the <code>media-object</code> and <code>media-body</code> to go on two child elements. Most likely these will be an <code>&lt;img&gt;</code> and a <code>&lt;div&gt;</code>, but you could probably change that up a bit. This can be placed inside other modules, and other modules can be placed inside of this module's media-body.

These class names and small bit of implied DOM structure dictate an API contract with the HTML and JavaScript. This way, it's reusable. You can put as many, or as few, of these on the page as you need, and the CSS never needs to change. Other modules might come with various states: classes like <code>is-open</code>, <code>is-active</code>. JavaScript can toggle them and allow the CSS to show, hide, highlight, or do whatever else it needs to do. It's all part of the API.

This is the secret to separating the concerns of CSS from those of HTML and JavaScript. The CSS specifies the rules, and it's up to the other two to follow them. It's a one-way contract.

We tried for years to do it the other way around, and that's what got us into trouble. When you approach web development HTML first, the HTML inevitably becomes coupled with the CSS. The CSS Zen Garden model works... until the HTML changes. And in in the real world, the HTML changes all the time. If the CSS is based on that HTML, the CSS will have to change with it.

Instead, by developing the CSS first, in a way that is modular, we can apply it again and again to changing HTML, without needing to make changes upstream. The HTML just has to follow the conventions laid out by the API.

To do this, we need to develop our CSS as if it is for a third party, similar to Bootstrap and other CSS frameworks. If your project (or your team) is moderate to large size, this will begin to necessitate two important features for our CSS: it should be well documented, and it should be versioned.

## Documentation-driven

Ugh. Documentation. The longest four-letter word in a developer's life.  Bear with me on this.

Since you are producing an API that other developers will consume, it needs to be documented. That means show each module in action so developers can skim through and find the pieces they need. Publish static HTML pages that organizes them in a reasonable way. Show the variants available. Add some bare-bones JavaScript to illustrate changing states and transition effects. Your CSS will eat its own dog food before you ever use it in your app.

At my job, we document our styles using <a href="http://jade-lang.com/">Jade</a>, and have some mixins that duplicate portions of markup: once to render on the page, and the second time to print the markup into a <code>&lt;code&gt;</code> tag for reading. But for smaller projects, this may not be necessary; browser dev tools make it easy enough for a developer look under the covers at any of your examples.

This documentation serves double-duty: it also becomes your unit tests. Every module you build, and the variations thereof, are rendered into a page. Package your documentation with your CSS. Write the documentation for a module as you write the CSS. See it in action during development.

If you need to verify multiple permutations of module states or test how various modules work together, add appendices to your documentation to do these things, where you won't bog down developers who are referring to the main docs. Our documentation at work has a series of fully-mocked up static pages (to ensure everything works together as expected) and several "test" pages where our grid system is put through paces and various table styles are mixed and matched in numerous ways to ensure they all work well together.

Unit tests in CSS are notoriously difficult to do. Some people use tools that take screenshots and compare for changes, but this is prone to all sorts of false positives. Some rely on linting, but that only gets you so far. If you write documentation as you develop, it serves the same purpose. Even better, eyes are on your tests, because developers and content editors will refer to it regularly.

## Versioned

Second, version your styles using <a href="http://semver.org/">semver</a>. Your HTML is opting-in to your CSS. You can't just change things out from underneath it. Deploy your styles to a url with the version in the path, so you always know what you're getting. Alternately, package your styles in a way that your project can import them at a certain version, whether an npm module or Ruby gem or similar.

Dead code elimination is a tough problem with CSS. If your CSS is versioned, you can deprecate and delete features with much lower risk.

Publish a changelog. This can make developers aware of new features, as well as give them a heads up when you deprecate something.

## Write the CSS in a clean-room

*CSS first* doesn't mean you write all of your CSS before you write any HTML or JavaScript. It applies at a finer-grained level. Each module is first built in the CSS before it can be used in the HTML. When you need styles in your app or website, your first stop should be the existing CSS documentation. Look for something that already meets your needs. Once you have built up a robust toolset of styles, you will often find you don't need something new after all.

Only when nothing there fits your situation should you start coding new CSS. Once it's written, and "tested" (i.e. added to the documentation), bump the version and cut a new release of the CSS.

This adds a small obstacle to adding new styles, which is intentional. It forces you to stop and think about your CSS outside the context of your particular problem, and encourages you to write a more general-use module. It also encourages developers to use existing styles as much as possible before rolling their own, which will result in a more cohesive look and feel throughout your site.

This is probably overkill for small projects. I certainly don't jump through all these hoops for this blog. But the more your project scales up, the more essential they will become, and the more your team will benefit from them.

The API of your CSS will be much more robust as a result of this work.  That API is important. The inner-workings of your CSS are easy to change. Your HTML is easy to change. But that API between them is the most important part. Making significant changes to that is costly, because everything on both sides needs to be updated accordingly. Design that API well. Design it from the viewpoint of the CSS, and then build your HTML to match.
