import type { Request } from "express";

export type TypedRequest<TBody = any, TParams = any, TQuery = any> = Request<
  TParams,
  any,
  TBody,
  TQuery
>;
