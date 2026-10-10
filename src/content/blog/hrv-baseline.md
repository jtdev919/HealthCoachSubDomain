---
title: "Why Your HRV Number Is Meaningless Without Your Baseline"
description: "My resting HRV is about 17ms. Every recovery app told me I was wrecked, including the one I built. Why the absolute number tells you almost nothing, and what to score instead."
pubDate: 2026-10-10
pillar: "Teach"
published: false
disclaimer: true
---

My resting heart rate variability is about 17 milliseconds.

If you have spent any time reading about HRV, you already know what most charts say about that
number. They say it is bad. Every recovery app I owned agreed, and told me so every morning,
for years.

They were all wrong, and so was mine, which is the part of this I want to talk about.

## What HRV actually measures

Your heart does not beat like a metronome. The gap between consecutive beats varies slightly,
and that variation is largely driven by the balance between your sympathetic nervous system
(the accelerator) and your parasympathetic nervous system (the brake).

More variation generally indicates the brake is working well: you are rested, recovered, and
able to respond to whatever happens next. Less variation generally indicates the accelerator is
stuck on, whether from training stress, illness, poor sleep, alcohol, or ordinary life stress.

That is a genuinely useful signal. It is also where the usefulness of the raw number stops.

## Why the absolute number tells you almost nothing

Resting HRV varies enormously between individuals, and for reasons that have nothing to do with
how recovered you are today:

- **Age.** It declines substantially across the lifespan.
- **Genetics.** Baseline autonomic tone is largely inherited, and the spread between healthy
  people is wide.
- **Measurement method.** RMSSD and SDNN are different calculations that produce different
  numbers from the same heartbeat data.
- **Measurement window.** A reading taken across a full night is not comparable to a two-minute
  morning spot check.
- **Device and placement.** A finger ring and a chest strap are not sampling the same way.

Stack those up and you get a range across healthy adults that spans something like an order of
magnitude. A person at 20ms and a person at 90ms can both be perfectly healthy and
well-recovered.

So when an app compares your number to a fixed table, it is not measuring your recovery. **It is
measuring who you are, and then reporting that back to you as if it were news.**

## How I confirmed 17 was my normal

I did not accept this gracefully. My first assumption was overtraining, which is the responsible
thing to assume and the easiest thing to test.

So I took two full weeks off. No lifting, no hard cardio, deliberate sleep.

Nothing moved. My HRV sat exactly where it always sits.

That is the evidence that 17 is my baseline rather than a deficit. A suppressed HRV caused by
accumulated training stress responds to two weeks of rest. Mine did not, because there was
nothing to recover from. This is simply where my autonomic nervous system idles.

I later ran a proper audit across 90 nights and three devices worn simultaneously, which
confirmed it from a different angle. Two of the three devices agreed with each other closely on
the pattern, each showing about 17% night-to-night variation, which is ordinary. The low value
was real, consistently measured, and not a unit error or a broken sensor.

## The part where I was the problem

Here is the uncomfortable bit.

My own app did exactly the thing I had been irritated at every other app for doing.

I had written a scoring table that mapped HRV onto a 0 to 100 recovery score using fixed
thresholds. At the bottom end, anything under 20ms scored 20 out of a possible 95. HRV is
weighted at a quarter of the composite recovery score.

Work through what that means. At 17ms, **on my best possible day, fully rested, perfect sleep, I
could score 20 on that component and I could never score higher.** The model had decided in
advance that I was not allowed to be well recovered. I had shipped the identical bug I had been
complaining about, and I did not notice until I put the number on a screen of its own where it
could be compared against something.

The backend service in the same codebase had always done it correctly: establish a baseline from
the user's own prior readings, then score the percentage deviation from it, treating anything
within about five percent as neutral. The two halves of my own product disagreed, and the half I
was looking at every morning was the wrong one.

## The rule that replaced it

**Score the delta, not the number.**

Concretely, that means:

1. Build a rolling baseline from the user's own recent readings.
2. Score today as a percentage deviation from that baseline.
3. Treat a small band around the baseline as neutral rather than as a result.
4. Require a minimum number of samples before a baseline means anything at all.

Under that rule, a 5% rise above your own normal is a good day whether your normal is 17 or 70.
This is also how the serious sports science literature treats HRV, and it is how the better
tools have always done it.

Two refinements that turned out to matter more than I expected:

**Keep baselines separate per device.** When I blended readings from multiple devices into one
baseline, the composite score swung wildly depending on *which device happened to sync that
night*. Across 30 nights the winning source alternated almost evenly between two devices, and
because they read my HRV differently, the same physiological state could score 90 on one night
and 30 the next. That is roughly 15 points of swing in overall readiness caused by nothing but
Bluetooth.

**Screen outliers against the median, not the mean.** One of my devices produced implausible
readings on about 6% of nights, occasionally ten times its own typical value. If you screen
those using a mean, you fail, because the mean has already been dragged upward by the exact
values you are trying to catch. The median is resistant to them.

## What to do with this

If you track HRV, three practical takeaways:

- **Ignore your absolute number.** Comparing it to a friend's, or to a chart, tells you about
  genetics and measurement methodology, not about recovery.
- **Pick one device and stick with it** for your baseline. Use any others for context only.
  Consistency of method matters more than which method.
- **Give it at least two weeks before you trust it.** A baseline built from three readings is
  not a baseline.

And a general one, which is really why I wrote this:

**If an app shows you a red score every single day for a month, consider that it may not be
telling you about your recovery.** It may just be telling you that you are not average. Those
are very different messages, and only one of them is worth acting on.

---

*I built AI Health Coach, the app referenced in this article. Nothing here is medical advice.
Persistently low HRV can have medical causes, so talk to your doctor rather than to an app.*
