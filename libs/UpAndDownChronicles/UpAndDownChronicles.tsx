import { useEffect } from "react";
import useLazyFetch from "../../hooks/useLazyFetch";
import classes from "./UpAndDownChronicles.module.css";

export default function UpAndDownChronicles({
  chronicle,
  onChange,
  lastPosition,
  token
}) {
  const { fetch,data } = useLazyFetch(
    "/changeChroniclePosition"
  );
  function handleClick(direction:'up'|'down') {
    fetch({ direction, lastPosition, chronicle,token });
  }

  useEffect(() => {
    if (data) onChange();
  }, [data]);

  return (
    <div className={classes.container}>
      {chronicle.position > 1 ? (
        <div
          className={classes.arrow}
          data-direction="up"
          onClick={() => handleClick("up")}
        />
      ) : (
        <div />
      )}
      {chronicle.position < lastPosition && (
        <div
          className={classes.arrow}
          data-direction="down"
          onClick={() => handleClick("down")}
        />
      )}
    </div>
  );
}
