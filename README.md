# react-use-polyfill

See [experimental_use(promise) by acdlite · Pull Request #25084 · facebook/react](https://github.com/facebook/react/pull/25084)

## Installation

```
npm i react-use-polyfill
```

## Usage

``` typescript
import { use } from "react-use-polyfill";

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
```

## Demo

[react-use-polyfill-example - CodeSandbox](https://codesandbox.io/s/react-use-polyfill-example-ib7x74)

## License

MIT
