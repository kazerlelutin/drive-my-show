import Chronicle from "../../interfaces/chronicle.interface";
import classes from "./ChronicleCard.module.css";
import { ReactElement, useContext, useState, useEffect } from 'react';
import ChronicleEditor from "../ChronicleEditor/ChronicleEditor";
import ChronicleCardReadMode from "./ChronicleCardReadMode/ChronicleCardReadMode";
import { UiContext } from "../../store/ui.store";
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
  const 
    {socket} = useContext(UiContext),
    [editMode, setEditMode] = useState<Chronicle>();


    useEffect(()=>{
  
      /*TODO ABO;*/

    },[editMode])
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
