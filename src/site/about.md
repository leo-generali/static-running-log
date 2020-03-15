---
layout: layouts/base
pageTitle: About this <span class='text-strava'>Running Log</span>
pageMeta:
  title: About
---
## My Personal Running Log

This website is a custom built running log using my running data sourced from Strava. Over the course of my running career I've bounced around from log to log without ever finding one that fit all of my needs. I was looking for something with more modern stylings that was easy to use.

Instead of waiting for the right log to come out, I decided to take matters into my own hands. I downloaded my data from Strava and got to work. 

This log is always going to be a work in progress. One of my least favorite things about relying on another piece of software to log my runs was waiting for new features to come out. Understandably, these things take a lot of time. Since I'm just builing this for my pleasure, I have the advantage of being able to iterate on this myself. If I want to calculate a new stat, I can add the feature myself!

## The Nerdy Bits

- This website is built with [Eleventy](https://www.11ty.dev/) and [TailwindCSS](https://tailwindcss.com/) to serve you with the best possible online running log experience.
- [{{ 'powered-by-strava' | svg({ class: 'w-48 fillCurrent' }) | safe }}](https://strava.com)
{.grid .grid-cols-2 .gap-12}

This website is [statically generated](https://en.wikipedia.org/wiki/Static_web_page). This means that all pages are created ahead of time. A big part of this project was a chnace for me to see how I could take static site generation. Running log data doesn't update too often (once or twice a day at most), which makes it the perfect candidate for static site generation.