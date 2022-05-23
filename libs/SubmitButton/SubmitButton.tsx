import classes from "./SubmitButton.module.css";

interface props {
  readonly isLoading: boolean;
  readonly txt: string;
}

export default function SubmitButton({ isLoading, txt }: props) {
  return (
    <button className={classes.container} disabled={isLoading}>
      {txt}
      {isLoading && <div className={classes.loading}>...</div>}
    </button>
  );
}
