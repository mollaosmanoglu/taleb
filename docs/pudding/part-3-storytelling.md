 


How to Make Dope Shit

# Part 3: Storytelling

This is the third installment of a multi-part series designed to help you familiarize yourself with the tools used to make visual, data-driven essays.

![](assets/crushing-code-dog.gif)

By [**Ilia Blinderman**](https://twitter.com/iliablinderman)

## Introduction

In 2017, I began compiling a three-part guide, intended for beginners with next to no technical knowledge, on how to create the sorts of data-driven, visual stories that we publish at The Pudding. This was going to consist of introductions and surveys of [data analysis](https://pudding.cool/process/how-to-make-dope-shit-part-1/), [design](https://pudding.cool/process/how-to-make-dope-shit-part-2/), and writing, and while I thought that the first two sections would be all that our readers *really* wanted to see, we've consistently received word that there remains a substantial interest in the writing guide. I'd tried to compile this third section, which had maintained its "On Writing" heading in my mind, with little success, until I realized that the impasse lay in the fact that I was fixated on precisely that: writing. Compiling resources on how to write within the form of a visual essay while omitting the discussion of *storytelling*, in both visual and written terms, as well as the importance of story structure, is of next to no help. Thus, I decided to retroactively make good and compile a primer on storytelling with data.

## What is storytelling, and why is it complicated?

In the first two guides, I'd provided a sort of survey of the tools we use for the data analysis and design of our projects. The aim was to give someone with relatively little experience a sense of the most useful tools involved in visual essays, and point them towards accessible tutorials that would explain these tools without the technical [mumbo-jumbo](https://www.youtube.com/watch?v=_jl4iL6hCqs). My reasoning was simple: anxiety about insufficient technical skills, and the difficulties in finding beginner-appropriate resources , has always seemed to me to be the biggest hurdle to getting more people involved in writing code and working on digital art and analysis. Pointing readers towards learning content that required no prior knowledge — as opposed to the countless tutorials that presumed anyone reading already had a grasp of the ecosystem they're working in — would alleviate those worries, and help them get over that initial hump of frustration involved in learning to use unfamiliar tools.

Storytelling, however, is much more abstract — it's not merely a technical matter of creating an image of a map, or designing the right chart; rather, it refers to the broader universe of considerations that impact nearly every decision you make in the way you frame and present a project. The focus is much less on the technical "how," like in the first two installments of these guides, but on the "why" of designing the narrative. It certainly doesn't help that technical tools are inherently more concrete: they're ways of solving specific problems (e.g., "how do I show the locations where people are concentrated on a map?" or "how do get this visual element to move through this specific path?"), while storytelling is much more of a nebulous concept. Thus, in this guide, I'll be focusing on the relevant questions and considerations that we, at The Pudding, tend to consider when creating data-driven projects.

## 1. Who is your audience?

**Yourself: The passion project**

Before you begin, consider whom you aim to reach with your project. If you're building for yourself, passion projects tend to allow for the greatest degree of creativity and experimentation.

I'd initially worked on one of my first data-driven projects, an [exploration](http://iliablinderman.com/connections/) of Craigslist's Missed Connections, because I was curious about the topic — something about people yearning for intimate connection in the most public of settings resonated with me. Furthermore, I had lots of editorial opinions about how I wanted to present the story, and while I may have reconsidered some of my choices several years after having published it, I wanted to publish it myself because I didn't want to make the sort of piece an editor would usually want. I wanted to build a personal story in the way that I saw fit, and I'm content to own those choices. I can't imagine a single editor that would have been completely aligned with my initial vision.

 ![](assets/missed-connections.png) 

*[All The Lonely People](http://iliablinderman.com/connections/), Ilia Blinderman*

 

That I worked on this outside of any sort of journalistic relationship with a larger outlet meant that I also had the opportunity to learn about many tools at my leisure: front-end development (JavaScript, HTML, and CSS, as well as web technologies like Amazon's cloud computing servers), data analysis in R, geospatial analysis using QGIS, typography, etc. (you can scroll down to the bottom of the piece for an in-depth explanation of the tools I used).

Oftentimes, personal projects are more exciting than commissioned published work, in large part because the author puts so much of themselves into their creation. Take, for example, one of my favorite pieces from friend-of-the-show [Riley Hoonan](https://www.rileyhoonan.com/), chronicling the [Paris-Roubaix cycling race](http://hellofthenorth.info); one would struggle to read it and fail to experience at least some measure of awestruck excitement. Or take [Jackie Gu](https://jackielgu.github.io/)'s melancholy [please will anyone speak to me](https://jackielgu.github.io/projects/digital-portrait/index.html), wherein she meditates on the character of digital relationships. I first saw these projects years ago, but they remain top of mind whenever I think of personal, non-traditional visual work.

 ![](assets/preview.gif) 

*[please will anyone speak to me](https://jackielgu.github.io/please-talk-to-me/), Jackie Gu*

 

**Others: Work, work**

Building for others, meanwhile, can help if you benefit from working with constraints. Somewhat counterintuitively, constraints can often lead to even better work quality, since they force you to eliminate irrelevant aesthetic or technical choices that you may otherwise agonize over (e.g., obsessing over the visual attributes of the box shadow you're using on your buttons? Trying to reimplement mapping for the browser using a first-of-its kind approach? No time — default to whatever is least obtrusive and, in the words of my colleague Matt, [ship it](https://lifehacker.com/f-k-it-ship-it-5934647)).

From the standpoint of story structure, building for others also prevents your story from meandering too much, and helps you prioritize working on the key takeaways. In this scenario, you've got a limited amount of time to do good work, and need to ensure that you use it as effectively as possible to create the best possible story; the bells and whistles are secondary. If you're a journalist, you may want to create a magnum opus that encompasses myriad data sources, coupled with video interviews and shoe-leather reporting about the opioid epidemic in America, but if you're working on a deadline and your editor needs you to crunch some numbers about the geographic concentrations of overdoses in your state, you'll have to prioritize those components and publish the story on deadline.

Adopting a "[minimum viable product](https://en.wikipedia.org/wiki/Minimum_viable_product) first, everything else later" conception of storytelling with data is doubly useful: honing the core skills used in your work will allow you to fulfill the basic requirements of each project faster with every piece that you complete. This will afford you more time to iterate on the story if it doesn't quite come together on first attempt (check out the bottom of our [guide to design](https://pudding.cool/process/how-to-make-dope-shit-part-2/) for some examples of iterating on visual work), and will provide you greater room to experiment; it's this time that you can then use towards truly novel and innovative storytelling, be it in the form of analyses or visual representation of data.

There is one final benefit to working on a story aimed for someone else's eyes: writing and structuring information with others in mind forces you to create work that is clearer and more accessible than if you were taking notes for yourself. If you're creating work meant for consumption by multiple stakeholders — let's abandon the journalistic landscape for a moment and set this in the business world, with marketing managers, product managers, data scientists, and engineers — you owe your audience the courtesy of communicating your message in a way that each can understand sufficiently for their particular use cases. Any instances of mysterious black-box analyses do your readers a disservice, and while you may be unable to communicate all the nuances involved in your number-crunching, your audience should feel like you've given them sufficient context to understand your reasoning and conclusions after consuming your work. Journalists, writing for a lay audience, are often better than others at this exercise, as adduced by occasional mentions of "...President of the United States, Donald Trump..." in newspaper articles: most people know that he happens to be president at the time of writing, but mentioning his title is, nevertheless, good practice. Adopting this level of redundancy in other contexts is, on balance, beneficial to the readers.

**Takeaway:**

* Passion projects/work done for yourself allow for more room to be highly original and can allow you to take much greater risks.
* Projects for others have constraints, and these can help you create clearer, more focused work.

## 2. Is your focus broad, or narrow?

**Broad**

The next question worth considering is what you're looking for in the data throughout the course of your analysis. At first glance this may seem self-evident — in what world would you put together a data-driven story without having a central thesis? And yet, this isn't quite as uncommon as it would seem: consider someone who comes across a data set, analyzes it in countless ways, and is left with endless charts, snippets of analysis, semi-intriguing conclusions, all tacked into a single document.

These sorts of explorations are essential to getting a good sense of data, but should be thought of as no more than that: exploratory forays into a complicated topic, which help you situate yourself within the data set and give you a sense of some of the trends and relationships contained therein. The output of this exercise is not a story, but data and insights that you can then incorporate into the story you'll create.

I'll admit, I'll occasionally encounter (or compile) a set of data that are inherently interesting to me, like our 2018 project that highlighted [30 years' worth of data from Dear Abby advice columns](https://pudding.cool/2018/11/dearabby/), or our [2019 analysis of 100 years' worth of American news](https://pudding.cool/2018/12/brief-history/). I was less interested in any highly specific question than in what I could learn from each of these corpuses. There's something deeply compelling about the prospect of looking at the worries of countless Americans reaching out to a single person for advice; likewise, I think that the thought of spotlighting the focus of the largest newspaper in the nation across the span of a century is thoroughly intriguing, particularly when it comes to comparing the historical record to our era. In such cases — and these, I think, tend to be more rare — I'm less interested in a particular question, and derive a lot of satisfaction from the exploratory process I outlined earlier. The exploration itself, however, is never the final project: it's useful only insofar as it helps identify the most interesting insights in the data, which I then proceed to examine further, and craft a story around it.

 ![](assets/dear-abby.png) 

*[30 Years of American Anxieties](https://pudding.cool/2018/11/dearabby/), The Pudding*

 

The danger in this sort of approach is the almost inevitable moment where you've boiled the ocean, and, after many days of analysis, realize that there's nothing particularly interseting in the data. If there are no insights that capture your curiosity, you can rest assured that it will be a struggle to capture that of your reader.

**Narrow**

Instead, the tried and true method we usually [favour](https://pudding.cool/process/pivot-continue-down/) is to begin the work with a central question, and then harness various data sets to answer it. Take, for instance, Amber's [recent investigation](https://pudding.cool/2020/02/rain/) into whether or not Seattle really is as rainy a city as it's purported to be: it's much easier to conceive of a way to answer this question using data, even though you may not quite be sure of which specific data sets to use, than to figure out which question to ask by examining seasonal weather data for America's cities (another example of this is our team-wide [Biggest Pop Star](https://pudding.cool/2019/03/pop-music/) project). Having a question that excites you, or that elicits spirited debate among your friends and colleagues, is often a good signal that your idea is worth investing some work in — one that is almost always less risky than sinking many hours of your time into a data set that may not yield anything remotely curious.

 ![](assets/rain.png) 

*[Where Will You Need Your Umbrella?](https://pudding.cool/2020/02/rain/), The Pudding*

 

Moreover, it's easy enough to garner your audience's interest by framing your story as a data-driven reply to a question, and roll out this solution by answering portions of this question, one point at a time. In my [analysis](https://pudding.cool/2017/07/jobs/) of the political impact of automation, I first showed the occupations that were most likely to be affected, followed by the geographic impacts of job loss, and finally explained how this form of economic shock may lead to swing states drifting to the right. Creating a coherent story structure for a data set-driven approach, meanwhile, would have been significantly more difficult.

**Takeaway:**

* If your data set is inherently interesting, feel free to explore and take a more free-form approach to your story, letting the most intriguing insights rise to the top during your analysis.
* Oftentimes, it's easier to tackle an interesting question than to explore a data set in hopes of finding a key insight.

## 3. How complex is the idea you're most excited by after your analysis?

**Simple**

Once you've analyzed your data and have found the conclusions you're most interested in, it's helpful to consider the complexity of the main takeaway as a way to help you structure your story.

Let's say that the world has returned to a more sensible place, and you're at a long-overdue evening of drinks with friends. For weeks, you've been busy working on your data-driven project. When your friend asks you what you've been up to, there are generally two types of responses: In the first, you clearly and succinctly explain what you've done and what you've found. In the second, you take a beat, and issue a "well, it's kind of complicated, but" disclaimer before you begin.

In the former case, the insight that you've found is fairly accessible. Think, for example, of Matt's [investigation](https://pudding.cool/projects/vocabulary/) of which rappers have the richest vocabularies: its description provides a reader all they need to know to pique their curiosity. The piece begins by providing precisely that: a chart at the very start of the story that gives the audience an immediate sense of who the most lexically-diverse rapper is, as well as where others lie in relation. Another example of this sort of easy-to-digest project is Russell's [Winning the Internet](https://pudding.cool/projects/newsletter/) newsletter, which aggregates the most popular content from other newsletters.

 ![](assets/rappers.png) 

*[The Largest Vocabulary in Hip Hop](https://pudding.cool/projects/vocabulary/), The Pudding*

 

If the central idea that you're investigating is relatively straightforward, you can often begin your project with a "sledgehammer" stat: your central, most interesting finding. Presenting your most exciting insight to a reader quickly may seem like it obviates the need to rest of the piece, but in fact, tends to make tangential and related points more intriguing to your audience. Several years ago, Matt explored [which artists define the punk music genre](https://pudding.cool/2017/03/punk/), and found that Blink-182 topped the list; after presenting this finding to the readers at the opening of the story, he delved into punk's subgenres, as well as the effects of one's age on which bands one considers to be punk. It's unlikely that these subsequent questions, as interesting as they are, would've been capable of capturing a reader's attention quite as well if they would've been served as lead-ins to the larger focus of the piece; nevertheless, each was rendered much more compelling by drawing attention to the topic of punk music in an accessible and surprising way through the opening point.

 ![](assets/punk.png) 

*[Crowdsourcing The Definition of Punk](https://pudding.cool/2017/03/punk/), The Pudding*

 

**Complex**

If, however, the key insights you've unearthed through your data analyses are somewhat more difficult to communicate, and require some contextualization, there's another approach that often helps readers get acquainted with the necessary background.

I was a religious reader of The New Yorker for some 15 years, and at that time, few publications rivaled its consistent ability to deliver a steady drumbeat of thoroughly-reported stories that drew one in, regardless of subject matter. Among my favorites of long form journalism remain Atul Gawande's [The Itch](https://www.newyorker.com/magazine/2008/06/30/the-itch), Nick Paumgarten's [There And Back Again](https://www.newyorker.com/magazine/2007/04/16/there-and-back-again), or Rachel Aviv's [God Knows Where I Am](https://www.newyorker.com/magazine/2011/05/30/god-knows-where-i-am). I would wager that most people would balk at the prospect of consuming tens of thousands of words to learn about about itching, or commuting patterns, or mental health in America, but these articles provide not just a primer in these issues, but an engrossing read.

Read any of these pieces and you'll find that they begin with a character. While they contain statistics and analyses, the single easiest way to draw a reader in is to produce a human experience to relate to. Statistics, when presented with little context, tend to have only a fraction the power that an individual has, so the use of a character's experiences as the engine used to move the reader through a story is paramount in long form writing, particularly when expounding on a complex and wide-ranging issue like mental health.

In visual storytelling, we tend to omit a focus on individual experience, but we nevertheless need a way to subtly provide sufficient context, while drawing reader interest to the work. The simplest way to translate character-driven prose narratives to the requirements of a visual story is to begin the story with a single data point. In our project about retraining workers from jobs that are likely to disappear due to automation, [Jordan Dworkin](https://www.jordandworkin.com/) and I began the [story](https://pudding.cool/2018/08/retraining/) by discussing truck drivers, and which careers were most suitable to them, considering the skills they already possessed. Rather than discussing the idea of retraining in a more abstract sense, giving readers a specific data point to follow made it much easier to understand the larger point that we sought to make.

This approach doesn't require that you follow that individual data point throughout the course of the story — it merely serves as a convenient way to draw your audience in to begin dealing with a complex topic (this is similar to the inverted pyramid model of journalism, which Jan mentions in Module 6 of the Knight Foundation's [Data Journalism and Visualization with Free Tools](https://journalismcourses.org/course/data-journalism-and-visualization-with-free-tools/) online course). Russell, in a similar way, began his exploration of [cultural figures' Wikipedia popularity following their deaths](https://pudding.cool/2018/08/wiki-death/) by first looking at Beyoncé's popularity, and then using it to set the context of just how much interest in celebrities grows following their passing.

 ![](assets/wiki-death.png) 

*[Life After Death on Wikipedia](https://pudding.cool/2018/08/wiki-death/), The Pudding*

 

**Takeaway:**

* If your key insights are simple, you can state them at the opening of your piece and add relevant points afterwards.
* If your takeaways require contextualization, use individual data points to draw your reader in and explain the complexity on a small scale before tackling the larger conclusion.

## 4. Progressing through your argument

Once you've identified the data-driven insights that you'd like your project to communicate, you'll begin to think of how to split your message between charts and text. As a rule of thumb, we shy away from overly text-heavy approaches, and the key insights in our essays tend to be supported by charts. While we don't use codified templates for thinking of how we structure our stories, here are a few approaches that we use, as well as their specific benefits (notably absent from this list is video; we've used it in [a](https://pudding.cool/2019/11/big-hair/) [number](https://pudding.cool/2019/12/real-mvp) [of](https://pudding.cool/projects/votes-for-women/) stories, but it's not our bread and butter).

**a. One point, one chart, stacked**

Oftentimes, stories have multiple takeaways that are best represented using multiple types of charts, using a single chart for each section of your story. An example of this would be Russell and Amber's [dive into the things that dating app users love and hate](https://pudding.cool/2017/12/hater/). Each of the sections — things we all love and hate; things we hate as we get older; most-hated and most-loved things, by US city; and most contentious topics — has its own chart, and the reader scrolls down the stack of charts, from one section to the other.

 ![](assets/hater.png) 

*[10 Things Everyone Hates About You](https://pudding.cool/2017/12/hater/), The Pudding*

 

**Benefits:**

* These charts are relatively easy to code, and while they contain some interaction in this story, static charts both work well (e.g., Matt's [dive into Outkast's music](https://pudding.cool/2017/03/outkast/)), and are easier to create using whichever tools you're most comfortable with (e.g., PowerPoint, Excel, Keynote, Flourish, Plotly, ggplot, D3, etc.)
* This structure is relatively intuitive. Each of your key takeaways has an accompanying chart, with some editorializing in the text to help readers focus on the appropriate insight.

**b. Scrollytelling**

[Much](https://pudding.cool/2018/06/gayborhoods/) [of](https://pudding.cool/2020/05/travel-local/) [the](https://pudding.cool/2019/04/eu-regions/) [work](https://pudding.cool/2018/12/3d-cities-story/) on The Pudding relies on letting the reader scroll through a page, and triggering changes to the visual elements once they reach a certain point. Hell, Russell's even created [multiple](https://russellsamora.github.io/enter-view/) [libraries](https://pudding.cool/process/introducing-scrollama) to make it simpler, and has [written](https://pudding.cool/process/responsive-scrollytelling) [extensively](https://pudding.cool/process/scrollytelling-sticky/) [about](https://pudding.cool/process/how-to-implement-scrollytelling/) working with this approach. Scrollytelling works particularly well when users scroll through a single chart, triggering certain animations or changes within as they progress down the site.

 ![](assets/film-digital.gif) 

*[Film or Digital](https://pudding.cool/2018/08/filmordigital/), The Pudding*

 

**Benefits:**

* The reader's experience is highly fluid and enjoyable.
* The promise of discovering a new animation at each step helps users progress through your project without your needing to be highly prescriptive about what they see at each moment, and ensures they can navigate the length of your story with ease.

While there are clear benefits, I should note that implementing scrollytelling is not without its drawbacks: you'll need to account for both mobile and desktop screen heights (Russell's got a great guide [here](https://pudding.cool/process/responsive-scrollytelling), as well as a discussion of when scrollytelling is useful), be highly explicit about the state of your visuals at each step in your code (users often scroll through multiple sections quickly, so you'll need to ensure that all necessary animations trigger at the beginning of each step, rather than relying on these having taken place where they were initially meant to), be difficult for the browser to render due to the many transitions, and be prepared for the process to take longer than you're used to, since iterating on this story format invariably means editing code in many different sections.

**c. Tapping/stepping**

Since scrollytelling can be somewhat more time-consuming, we've also [embraced](https://pudding.cool/2019/05/science_etc_1/) [using](https://pudding.cool/2019/08/register) a step-by-step approach on somewhat smaller stories.

 ![](assets/falsetto.png) 

*[Are Men Singing Higher in Pop Music](https://pudding.cool/2019/08/register/), The Pudding*

 

You don't even necessarily need to do this through a web page — we've published multiple stories on [Instagram](https://www.instagram.com/the.pudding/) alone, using still images and its in-built carousel mode.

 ![](assets/milk.png) 

*[Why It's Worth Crying Over Spilled Milk](https://www.instagram.com/p/B5IdkN4hjS6/), The Pudding*

 

**Benefits:**

* relatively simple to create, either through code or a platform like Instagram.
* allows you to take the reader through a highly structured set of arguments.
* ensures brevity in your writing (you can only fit so much on a mobile screen) for each of your points, and helps organize your thoughts into bite-sized chunks when storyboarding the project.

Although the reader experience on desktop is somewhat less enjoyable than it is on mobile (clicking to advance through a story is slightly more annoying than tapping, at least for myself), this is a great way to move readers through a structured narrative without spending too much time on developing a project.

## 5. How did you arrive at your conclusion?

While it's important for your readers to understand the rough method you used to arrive at your conclusions as they're reading your work, it's often helpful to provide an additional, more detailed look at your process and reasoning. Readers are often sufficiently savvy to consider our work critically, and those that may have reservations about our findings will have more faith in our analyses if they have a clear sense of where we sourced our data and how we crunched the numbers. Most of our projects contain a Method section following the conclusion to deal with these questions, where we link to data sources (when available) and explain the calculations we performed in order to arrive at our conclusions.

Perhaps the most impressive version of this I've seen is The Markup's explanation of their [Google The Giant project](https://themarkup.org/google-the-giant/2020/07/28/how-we-analyzed-google-search-results-web-assay-parsing-tool), which goes into great depths to provide a highly transparent play-by-play of their investigations.

 ![](assets/markup.png) 

*[How We Analyzed Google's Search Results](https://themarkup.org/google-the-giant/2020/07/28/how-we-analyzed-google-search-results-web-assay-parsing-tool/), The Markup*

 

## Conclusion

In this final guide to creating visual essays, I've done my best to highlight the many considerations that play a part in the way that we structure our projects. Considering questions of audience, aims, the complexity of your conclusions, the best ways to visually structure your story, and clarity surrounding your analyses will help you present your work in the most straight-forward and compelling manner. And if you're struggling, get in touch — we love to sound off on projects, and are happy to weigh in on ideas (you can email us at [sup@pudding.cool](mailto:sup@pudding.cool), send a message over [Twitter](https://twitter.com/puddingviz?lang=en), or if you're a [Patreon supporter](https://www.patreon.com/thepudding), chat to us real-time via slack).

I hope the things you've picked up in this guide help, whether in your job as a data analyst/scientist, journalist, or simply help bring an idea you had to life.

 
