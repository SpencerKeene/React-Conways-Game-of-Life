<a name="top"/>

# Conways-Game-of-Life
A simulation of John Conway's Game of Life using Vanilla JavaScript.

## Table of Contents
- [What is John Conway's Game of Life?](#What-is-John-Conways-Game-of-Life?)
  - [What are the rules?](#What-are-the-rules?)
  - [Interesting patterns](#Interesting-patterns-)

<a name="What-is-John-Conways-Game-of-Life?"/>

-----
## What is John Conway's Game of Life?
The **Game of Life**, created by the mathematician **John Conway**, is a form of _cellular automaton_. In simpler terms, it is a _grid_ consisting of _cells_ that can either be _on_ or _off_. Each cell's state is determined by its _neighbours_. The grid moves on to the next _generation_ by recalculating the state of every cell. This is usually calculated to its entirety before changing the state of any cell

In the Game of Life, the state of a cell is known as _alive_ or _dead_, rather than on or off, and each cell has a total of eight neighbours, those neighbours are its surrounding cells. Normally, the Game of Life is played on an infinite grid, but in my simulation it is played on a finite grid. The option for the grid to loop around to its opposite side is also being explored.

<a name="What-are-the-rules?"/>

### What are the rules?
As previously stated, each cell has one of two state, alive or dead. Each cell also interacts with its eight neighbours, the cells surrounding it (see figure 1).

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/CA-Moore.svg/200px-CA-Moore.svg.png" alt="Cell neighbours" width="100"/>

>Figure 1: Cell Neighbours (Cellular automaton, Wikipedia.org 2021)

The state of a cell in the next generation is determined by the state of the cell's neighbours in the current generation. Only live neighbours are counted, not dead ones. The rules for a cell's state go as follows:

1. A live cell with exactly two or three neighbours stays alive.
2. A live cell with fewer than two neighbours or greater than three neighbours dies
3. A dead cell with exactly three neighbours comes to life
4. A dead cell with fewer or greater than three neighbours stays dead

<a name="Interesting-patterns-"/>

### Interesting patterns
Based on these rules, there are many interesting patterns in the Game of Life. These patterns are categorized into three major types:

1. **Still life:** These patterns stay perfectly still, appearing exactly the same between generations. (see figure 2)
2. **Oscillator:** These patterns oscillate, or move back and forth, between several different pictures. They appear to be in a loop through multiple generations. (see figure 3)
3. **Spaceships:** These patterns are similar to oscillators except instead of staying in the same place, they move throughout the grid. (see figure 4)

![Beehive](https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Game_of_life_beehive.svg/98px-Game_of_life_beehive.svg.png)

>Figure 2: Beehive (Conway's Game of Life, Wikipedia.org 2021)

![Blinker](https://upload.wikimedia.org/wikipedia/commons/9/95/Game_of_life_blinker.gif)

>Figure 3: Blinker (Conway's Game of Life, Wikipedia.org 2021)

![Glider](https://upload.wikimedia.org/wikipedia/commons/f/f2/Game_of_life_animated_glider.gif)

>Figure 4: Glider (Conway's Game of Life, Wikipedia.org 2021)

These patterns once created on a board will last forever unless interfered with. However, there are some variations of these patterns that when coliding with another specific pattern, will consume the other pattern and return to its initial state. These patterns are called **Eaters**. (see figure 5)

![Eater 5 eating a glider](https://www.conwaylife.com/w/images/7/79/Eater5_small.gif)

>Figure 5: Eater 5 eating a Glider (Eater, ConwayLife.com 2021)

Some patterns can also create other patterns. These patterns are typically called **Guns**. (see figure 6)

![Gosper's Glider Gun](https://upload.wikimedia.org/wikipedia/commons/e/e5/Gospers_glider_gun.gif)

>Figure 6: Gosper's Glider Gun (Conway's Game of Life, Wikipedia.org 2021)

With an infinite grid, there are infinite possibilities. Many people have been able to come up with some outstanding creations. One of the best so far is [the Game of Life within the Game of Life](https://youtu.be/xP5-iIeKXE8) (Phillip Bradbury, Life in Life, YouTube.com 2021).

<div align="right">
  <a href="#top">Back to top</a>
</div>

<a name="About-the-project-"/>
