import Chronicle from "../../interfaces/chronicle.interface";
import classes from "./ChronicleCard.module.css";
import { ReactElement, useState } from 'react';
import ChronicleEditor from "../ChronicleEditor/ChronicleEditor";
import ChronicleCardReadMode from "./ChronicleCardReadMode/ChronicleCardReadMode";
interface props {
  readonly chronicle: Chronicle;
  readonly UpAndDownChronicles: ReactElement;
  readonly MediasForCard: ReactElement;
  readonly refetch: Function;
}
export default function ChronicleCard({
  chronicle,
  UpAndDownChronicles,
  MediasForCard,
  refetch,
}: props) {
  const [editMode, setEditMode] = useState<Chronicle>();
  return editMode ? (
    <div className={classes.editor}>
      <ChronicleEditor
        onClose={setEditMode}
        chronicle={chronicle}
        refetch={refetch}
      />
    </div>
  ) : (
    <ChronicleCardReadMode
      refetch={refetch}
      updateMode={setEditMode}
      chronicle={chronicle}
      UpAndDownChronicles={UpAndDownChronicles}
      MediasForCard={MediasForCard}
    />
  );
}
