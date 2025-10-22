export const RESULT_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
} as const;

export type SuccessResult<T> = T extends void
  ? { type: typeof RESULT_TYPE.SUCCESS; message?: string }
  : {
      type: typeof RESULT_TYPE.SUCCESS;
      value: T;
      message?: string;
    };

export type ErrorResult = {
  type: typeof RESULT_TYPE.ERROR;
  message: string;
};

export type Result<T> = SuccessResult<T> | ErrorResult;
