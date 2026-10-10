---
title: "I Wore Three Recovery Trackers for 90 Nights"
description: "Oura, Garmin and WHOOP on the same body, same nights, for 90 nights. They disagreed by 48% on the number, agreed on the pattern, and one produced readings that could not be real."
pubDate: 2026-10-10
pillar: "N=1"
published: false
disclaimer: true
---

Most wearable comparisons are written by someone who used one device for a fortnight, then the
next device for a fortnight, and reported how they felt about each.

That design cannot answer the question anyone actually has, because the person changed in
between. Different training, different sleep, different stress. You end up comparing two
versions of yourself and attributing the difference to hardware.

I wore three at once. Same body, same nights, same sleep, for 90 nights, with all the data
flowing into a database I control so I could query it properly.

Here is what came out, and it changed how I build recovery scoring.

## The setup

| Device | Worn | Nights with HRV data |
|---|---|---|
| Oura Ring | Finger | 68 |
| Garmin | Wrist | 86 |
| WHOOP | Opposite wrist | 63 |

Night counts differ because the devices report at different rates and have different ideas
about what constitutes enough data to publish a reading. That gap is itself a finding, and I
will come back to it.

All three claim to measure overnight heart rate variability. All three use it as a major input
to a daily recovery or readiness score.

## Result 1: they do not agree on the number

Across the full window:

| Device | Average HRV | Observed range |
|---|---|---|
| Garmin | 22.1 ms | 12 to 35 |
| Oura | 16.3 ms | 8 to 22 |
| WHOOP | 24.1 ms | 10 to 167 |

Same person. Same nights. Same physiology. The spread between the lowest and highest average is
roughly **48%**.

This is not a scandal, and it is worth being clear about why. These devices sample at different
sites with different sensors, over different windows, and may compute different statistics.
There is no universal ground truth for "your HRV" that one of them is getting right and the
others are getting wrong. The number is partly a property of the instrument.

But it has a direct practical consequence, which is the reason this matters: **an HRV number is
only comparable to other numbers from the same device.** Comparing your Oura reading to a
friend's WHOOP reading is meaningless. So is comparing either to a generic chart.

## Result 2: two of them agree on the pattern

This is the genuinely encouraging finding, and it is more important than the disagreement above.

Garmin and Oura both showed a coefficient of variation of about **17%** night to night, which is
ordinary, expected physiological variation. More tellingly, across the 65 nights where both
produced a reading, they tracked each other at a stable ratio of roughly **0.77**.

In plain terms: Oura consistently reads about three quarters of what Garmin reads, on me, and
that relationship holds steady over months.

**They disagree on the number and agree on the pattern.** That is exactly what you want to see,
and it is the evidence that both are measuring something real. If my HRV went up, both saw it go
up. The offset between them is a calibration difference, not noise.

It also settles a question I had about my own low readings. My HRV genuinely is low in absolute
terms, and two independent instruments agreeing on the shape of the signal means it is well
measured rather than a broken sensor or a units bug.

## Result 3: one device produced implausible readings

The third device showed a coefficient of variation of **110%**.

For comparison, the other two sat at about 17%. A CV above 100% means the night-to-night spread
is larger than the average itself, which is not a plausible description of a human autonomic
nervous system over three months.

Digging into the individual nights, roughly **6% of readings were not credible**. Against a
median of about 16 ms for that device, there were nights reported at 70, 116, 124 and 167. One
of the extreme readings arrived alongside a resting heart rate of 80, which is not a
combination that describes a well recovered night, or really any night.

I want to put a careful frame around this, because it would be easy to turn a single data point
into a product review and it does not deserve to be one:

- This is **n=1**. One unit, one wrist, one person, one firmware version, one 90-night window.
- Strap fit, wrist position and sleep posture all affect optical sensing, and I did not control
  for them rigorously.
- A device that publishes more readings, including marginal ones, will look noisier than one
  that silently withholds a reading when confidence is low. That is a defensible design choice,
  not necessarily a defect.
- I have not tested whether this reproduces on another unit, and I am not claiming it does.

What I will say is narrower and I think unarguable: **on my wrist, over these 90 nights, about
one night in sixteen from that device could not be used as-is**, and any system consuming it
needed to handle that.

## What this changed in how I build

Three concrete changes, and all three are the kind of thing you would never discover without
simultaneous data.

**1. Baselines are now per device.**

This was the real bug, and it was mine. I had been building a single HRV baseline by blending
whatever readings arrived, regardless of source. Because the devices sit at different
calibration points, that blended baseline sat somewhere in the middle of all of them.

The effect was absurd once I saw it. Over one 30-night stretch, the device that happened to
report first alternated almost evenly between two of them. Against a blended baseline of around
21, a reading from the higher-reading device looked like +17% (a great recovery day) and a
reading from the lower-reading device looked like -19% (a bad one).

That is roughly **60 points of swing on the HRV component, and about 15 points of overall
readiness, caused by nothing except which device synced that night.** The physiology was
identical. Every baseline is now calculated separately per source.

**2. Outliers are rejected against the median, not the mean.**

Any reading beyond three times that device's own median is discarded.

The choice of median over mean is load-bearing. A mean is pulled upward by the very extreme
values you are trying to screen out, so with enough outliers the filter quietly stops catching
them. The median barely moves. If you are building anything that screens for anomalies, this is
the trap.

**3. Source priority is explicit, not accidental.**

When multiple devices report for the same night, the system now picks deliberately by a defined
priority order rather than by whichever row the database returned last. Previously that was
effectively arbitrary, which meant two parts of my own system could disagree about today's
value.

## What you should take from this

If you wear one device, the practical advice is short:

- **Your absolute HRV number is only meaningful against your own history on that same device.**
- **Pick one device as your source of truth.** Wear others for whatever else they are good at,
  but do not average their recovery scores together. You will manufacture noise.
- **Be suspicious of any single reading that is wildly out of line with your own recent range.**
  One strange night is far more likely to be a measurement artifact than a physiological event.
- **Consistency beats accuracy.** A device that reads slightly off but reads off the same way
  every night is more useful than one that is occasionally perfect.

And the broader point, which applies well beyond wearables: when two instruments disagree, the
disagreement is information. Running them simultaneously for 90 nights cost me nothing but the
discomfort of sleeping in three devices, and it found a scoring bug in my own software that
months of using them one at a time never would have.

---

*I built AI Health Coach, the app referenced in this article. All data above is my own. Nothing
here is medical advice, and none of it is a controlled evaluation of any manufacturer's product.*
