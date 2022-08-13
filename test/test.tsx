import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { use } from '../src';

test('test', async () => {
  function Async(props: { promise: Promise<string> }) {
    const value = use(props.promise);

    return (
      <div>{value}</div>
    );
  }

  function App() {
    const promise = Promise.resolve("Resolved");

    return (
      <Suspense fallback={<div>Fallback</div>} >
        <Async promise={promise} />
      </Suspense>
    );
  }

  render(<App />);

  expect(screen.getByText("Fallback")).toMatchInlineSnapshot(`
<div>
  Fallback
</div>
`);

  expect(await screen.findByText("Resolved")).toMatchInlineSnapshot(`
<div>
  Resolved
</div>
`);
});
