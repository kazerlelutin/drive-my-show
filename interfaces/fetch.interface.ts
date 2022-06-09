import Error from "./error.interface";
import Show from "./show.interface";

export interface Fetch {
  readonly loading: boolean;
  readonly error: Error;
  readonly data: Show;
  readonly refetch: Function
}