import { Router } from 'express';

type Wrapper = (router: Router) => void;

const applyMiddleware = (middlewareWrappers: Wrapper[], router: Router) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(router);
  }
};

export default applyMiddleware;
