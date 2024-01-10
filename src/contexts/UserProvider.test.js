import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState, useEffect } from "react";
import FlashProvider from "./FlashProvider";
import ApiProvider from "./ApiProvider";
import UserProvider, { useUser } from "./UserProvider";

const realFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch = realFetch;
  localStorage.clear();
})

test('logs user in', async () => {
  const urls = [];

  global.fetch.mockImplementationOnce(url => {
    urls.push(url);
    return {
      status: 200,
      ok: true,
      json: () => Promise.resolve({access_token: 123}),
    };
  })
  .mockImplementationOnce(url => {
    urls.push(url);
    return {
      status: 200,
      ok: true,
      json: () => Promise.resolve({username: 'susan'}),
    };
  });

  const Test = () => {
    const {login, user} = useUser();
    useEffect(() => {
      (async () => await login('username', 'password'))();
    }, []);
    return user ? <p>{user.username}</p> : null
  };

  render (
    <FlashProvider>
      <ApiProvider>
        <UserProvider>
          <Test />
        </UserProvider>
      </ApiProvider>
    </FlashProvider>
  )

  const element = await screen.findByText('susan');
  expect(element).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(2);
  expect(urls).toHaveLength(2);
  expect(urls[0]).toMatch(/^http.*\/api\/tokens$/);
  expect(urls[1]).toMatch(/^http.*\/api\/me$/);
});

test('logs in user with bad credentials', async() => {
  const urls = [];

  global.fetch.mockImplementationOnce(url => {
    urls.push(url);
    return {
      status: 401,
      ok: false,
      json: () => Promise.resolve({}),
    };
  });

  const Test = () => {
    const [result, setResult] = useState();
    const {login, user} = useUser();
    useEffect(() => {
      (async () => {
        setResult(await login('username', 'password'));
      })();
    }, []);
    return <>{result}</>
  };

  render (
    <FlashProvider>
      <ApiProvider>
        <UserProvider>
          <Test />
        </UserProvider>
      </ApiProvider>
    </FlashProvider>
  );

  const element = await screen.findByText('fail');
  expect(element).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(urls).toHaveLength(1);
  expect(urls[0]).toMatch(/^http.*\/api\/tokens$/);
})