---
title: "In Range Is Not the Same as Optimal"
description: "For two years every blood panel came back normal while I felt worse. What a clinical reference range is actually built to detect, and the three things it structurally cannot see."
pubDate: 2026-10-10
pillar: "Story"
published: false
disclaimer: true
---

For two years my bloodwork was perfect and I felt like garbage.

That sentence is the whole reason this app exists, so it is worth unpacking properly, because
the interesting part is not that I felt bad. Plenty of people feel bad. The interesting part is
that **every number used to assess me came back fine, repeatedly, for two years, and the system
had no mechanism to notice that something was still wrong.**

## The setup

I had been on testosterone replacement therapy for six years. I am not a casual tracker. I had a
Garmin on my wrist continuously, full blood panels every quarter, and every supplement logged
with dose and timing. By any reasonable standard I had more data about my own body than my
doctor had about me.

Somewhere around year four, things started sliding. Not dramatically. Energy first, then
stamina. Sessions I used to treat as a warm-up became the whole workout. The kind of decline
that is easy to explain away as age, or stress, or a bad few weeks, right up until you look back
and realize the bad few weeks have been going on for eighteen months.

Every clinic visit produced the same sentence:

> "Your bloodwork looks amazing."

And it did. I have the panels. Nothing was flagged.

## What a reference range actually is

Here is the thing I did not properly understand at the time, and I suspect most people do not
either.

A clinical reference range is usually built by measuring a large group of people, discarding the
extreme ends, and calling the middle 95% "normal." That is a useful tool. It is very good at the
job it was designed for, which is **catching disease**.

But notice what that construction means. The population it is drawn from is not a population of
thriving people. It is roughly everyone who turns up to a lab. The range describes what is
common, not what is good. Those are different questions, and only one of them is the question
I was actually asking.

So "in range" means: you are not obviously sick compared to everybody else who got tested.

It does not mean: your body is working well.

## The three blind spots

Once I started looking at my own data as a dataset rather than as a series of appointments,
three specific gaps became obvious.

**1. A range checks one dot. It cannot see a line.**

Every ferritin value I had was inside the reference range, so no individual result was ever
flagged. But laid end to end, across two years, same lab, same patient, those dots formed an
unmistakable downward slope. A threshold check evaluates each result in isolation and is
structurally incapable of noticing a trend. By the time a declining value crosses out of range,
you have usually been symptomatic for a long time.

**2. Nobody was looking at the metrics together.**

My bloodwork lived in a patient portal. My HRV and sleep lived in Garmin. My supplements lived
in a spreadsheet. How I actually felt lived in my head. Four datasets, four silos, zero
crossover. The questions that mattered to me were all cross-silo questions: did the thing I
changed in March show up in the panel in June, and did I feel any different in between?

**3. Nothing connected cause to effect across time.**

A panel is a snapshot taken on one morning. Almost everything that actually explains a snapshot
happened in the weeks before it. Without the surrounding context, each result arrives as an
orphan.

## What I eventually found

Within a few weeks of being able to see all of it on one timeline, two things surfaced that two
years of appointments had not.

The first was an iron problem driven by a routine, medically appropriate procedure that nobody
had connected to my symptoms. The mechanism was not subtle once you saw the two data series
next to each other. It simply required somebody to put them next to each other, and no part of
the existing system did that.

The second was a hormone imbalance traceable to a protocol change I had been told would not
matter. It mattered. Again: visible in the data, invisible in the process.

I want to be careful here, because it would be easy and cheap to turn this into a story about
bad doctors. It is not. Every clinician I saw was competent and acting reasonably on the
information in front of them. **The failure was in the tooling, not the people.** The tooling
showed one dot at a time, from one silo at a time, and that is exactly the shape of problem
software is good at and humans with fifteen minute appointments are not.

## What I changed

I am a software architect. When the available tools cannot answer your question, you eventually
stop complaining about the tools.

So I built something that holds all of it at once: wearables, labs, supplements, workouts, food,
and how I actually felt, on a single timeline. Then I pointed it at myself, which is a useful
discipline, because you cannot wave away an inconvenient result when you are both the developer
and the test subject.

Two design decisions came directly out of the above, and I would stand behind both regardless
of what you use to track your own health:

- **Show the trend, not the dot.** Every biomarker is plotted across all its test dates, and the
  direction of travel is treated as information in its own right.
- **Show optimal ranges next to clinical ones.** Not to replace your doctor's interpretation,
  but so that "technically not sick" and "where I would like to be" stop looking identical.

## The honest caveat

This is a sample size of one. My ferritin story is my ferritin story, and n=1 means I can tell
you what happened to me and I genuinely cannot tell you what will happen to you. I am not a
clinician, and nothing here is medical advice.

What I will claim is narrower, and I think it holds:

**If you only ever see one result at a time, you are missing most of the signal in your own
data.** You do not need my app to fix that. You need your results in one place, in date order,
with a line drawn through them. Do that in a spreadsheet if you like. Just do it, because the
slope is where the story was hiding for me, and it took two years to find.

---

*I built AI Health Coach, the app referenced in this article. Nothing here is medical advice.
Talk to your doctor before changing anything about your care.*
