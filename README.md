# Rubber Banding Selection Lab (HCI)

## Description

This project demonstrates the concept of rubber band selection using HTML Canvas and JavaScript. Users can click and drag to draw a selection box and select moving objects (circles) on the screen.

The lab also incorporates Fitts’s Law by measuring selection time and accuracy.

---

## Features

- Rubber band selection using mouse drag
- Moving objects (circles) with continuous animation
- Real-time feedback (selection count, time, accuracy)
- Reset functionality for new interaction

---

## HCI Concepts

- Rubber Banding (dynamic selection box)
- Fitts’s Law (time vs accuracy in selection tasks)
- Motor execution and user interaction
- Visual feedback

---

## How It Works

- Circles are randomly generated with position and velocity
- They move continuously using an animation loop
- User clicks and drags to create a selection box
- Circles inside the box are selected
- Score, time, and accuracy are updated dynamically

---

## Controls

- Mouse Down → start selection
- Mouse Move → resize selection box
- Mouse Up → finalize selection
- Reset Button → restart interaction

---

## Technical Details

- Canvas API is used for drawing
- requestAnimationFrame is used for smooth animation
- Mouse events handle interaction
- DOM manipulation updates score display

---

## Files

- index.html → structure of the page
- script.js → logic and interaction
- style.css → styling

---

## Learning Outcomes

- Understanding of canvas-based rendering
- Implementation of selection techniques
- Real-time interaction handling
- Application of Fitts’s Law in UI design

---

## Summary

This lab demonstrates how rubber band selection works in interactive systems and how user performance can be measured using time and accuracy metrics.
