import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */

  describe("SUM", () => {
    test("Test #1: testing that numbers are valid", () => {
      expect(() => sum()).toThrowError("pass valid numbers");
    });
    test("Test #2: 2 + 'seven'", () => {
      expect(() => sum(2, "seven")).toThrowError("pass valid numbers");
    });
    test("Test #3: 1 + 3", () => {
      expect(sum(1, 3)).toEqual(4);
    });
    test("Test #4: '1' + 2", () => {
      expect(sum("1", 2)).toEqual(3);
    });
    test("Test #5: '10' + 3", () => {
      expect(sum("10", 3)).toEqual(13);
    });
  });

  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */
  // test('you can comment out this test', () => {
  //   expect(true).toBe(false)
  // })
})

  describe("HTML", () => {
    test("Test #1: renders the 'Home' link.", () => {
      render(<HelloWorld/>);
      expect(screen.getByText("Home")).toBeVisible();
    });
    test("Test #2: renders the 'About' link.", () => {
      render(<HelloWorld/>);
      expect(screen.getByText("About")).toBeVisible();
    });
    test("Test #3: renders the 'Blog' link.", () => {
      render(<HelloWorld/>);
      expect(screen.getByText("Blog")).toBeVisible();
    });
    test("Test #4: renders text 'The Truth'.", () => {
      render(<HelloWorld/>);
      expect(screen.getByText("The Truth")).toBeVisible();
    });
    test("Test #5: renders text 'JavaScript is pretty awesome'.", () => {
      render(<HelloWorld/>);
      expect(screen.getByText("JavaScript is pretty awesome")).toBeVisible();
    });
    test("Test #6: renders text 'javaScript is pretty'.", () => {
      render(<HelloWorld/>);
      expect(screen.queryByText("javaScript is pretty", {exact: false})).toBeVisible();
    });
  });

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
